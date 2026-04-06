import { useState, useEffect, useMemo } from 'react'
import {
  ShieldCheck, Plus, Trash2, Loader2, LogOut, Car,
  ChevronDown, ChevronRight, Pencil, Check, X,
} from 'lucide-react'
import {
  apiGetCustomCatalog, apiAddCustomVehicle,
  apiUpdateCustomVersion, apiRenameMake, apiRenameModel,
  apiDeleteCustomVersion, apiDeleteCustomModel, apiDeleteCustomMake,
} from '../services/api'
import type { CustomVehicle } from '../services/api'
import CustomSelect from '../components/CustomSelect'
import type { SelectOption } from '../components/CustomSelect'

const SESSION_KEY = 'catalog_admin_pwd'
const NEW_MAKE_SENTINEL = '__nuevo__'

// ── Helpers ──────────────────────────────────────────────────────────────────

type Grouped = Record<string, Record<string, CustomVehicle[]>>

function groupVehicles(vehicles: CustomVehicle[]): Grouped {
  const map: Grouped = {}
  for (const v of vehicles) {
    map[v.make] ??= {}
    map[v.make][v.model] ??= []
    map[v.make][v.model].push(v)
  }
  return map
}

// ── Shared input style ────────────────────────────────────────────────────────
const inp = `w-full rounded-xl border border-jaecoo-border bg-jaecoo-elevated px-4 py-3 text-sm
  text-jaecoo-primary focus:outline-none focus:border-jaecoo-electric focus:ring-2
  focus:ring-jaecoo-electric/20 transition-all placeholder:text-jaecoo-muted`

const inpSm = `rounded-lg border border-jaecoo-border bg-jaecoo-elevated px-3 py-1.5 text-sm
  text-jaecoo-primary focus:outline-none focus:border-jaecoo-electric focus:ring-1
  focus:ring-jaecoo-electric/20 transition-all`

// ── Pantalla de login admin ───────────────────────────────────────────────────
function AdminLogin({ onAuth }: { onAuth: (pwd: string) => void }) {
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const r = await fetch(`/mielectrico/api/catalog.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ admin_password: pwd, make: '', model: '', version: '' }),
      })
      const data = await r.json()
      if (r.status === 403) throw new Error(data.error)
      // 400 = campos vacíos pero contraseña correcta
      sessionStorage.setItem(SESSION_KEY, pwd)
      onAuth(pwd)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-jaecoo-base flex items-center justify-center p-4">
      <div className="w-full max-w-xs">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-jaecoo-electric/10 border border-jaecoo-electric/30 rounded-2xl mb-4">
            <ShieldCheck size={28} className="text-jaecoo-electric" />
          </div>
          <h1 className="text-xl font-bold text-jaecoo-primary">Área de administración</h1>
          <p className="text-jaecoo-muted text-sm mt-1">Gestión del catálogo de vehículos</p>
        </div>
        <div className="bg-jaecoo-card border border-jaecoo-border-strong rounded-2xl shadow-j-elevated p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-jaecoo-muted uppercase tracking-wide mb-1.5">
                Contraseña admin
              </label>
              <input
                type="password" value={pwd} onChange={e => setPwd(e.target.value)}
                placeholder="••••••••" autoFocus className={inp}
              />
            </div>
            {error && (
              <p className="text-sm text-jaecoo-danger bg-jaecoo-danger/10 border border-jaecoo-danger/30 rounded-xl px-4 py-3">
                {error}
              </p>
            )}
            <button type="submit" disabled={loading || !pwd}
              className="w-full bg-jaecoo-electric hover:brightness-110 disabled:opacity-50 text-jaecoo-base
                font-bold rounded-xl py-3 text-sm transition-all flex items-center justify-center gap-2">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// ── Inline edit input ─────────────────────────────────────────────────────────
function InlineEdit({
  value, onSave, onCancel, saving,
}: { value: string; onSave: (v: string) => void; onCancel: () => void; saving: boolean }) {
  const [v, setV] = useState(value)
  return (
    <form onSubmit={e => { e.preventDefault(); onSave(v) }} className="flex items-center gap-1.5 flex-1 min-w-0">
      <input
        autoFocus value={v} onChange={e => setV(e.target.value)}
        className={`${inpSm} flex-1 min-w-0`}
      />
      <button type="submit" disabled={saving || !v.trim()}
        className="p-1.5 rounded-lg bg-jaecoo-electric/10 text-jaecoo-electric hover:bg-jaecoo-electric/20 transition-colors disabled:opacity-40">
        {saving ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
      </button>
      <button type="button" onClick={onCancel}
        className="p-1.5 rounded-lg hover:bg-jaecoo-elevated text-jaecoo-muted transition-colors">
        <X size={13} />
      </button>
    </form>
  )
}

// ── Panel principal ───────────────────────────────────────────────────────────
function AdminPanel({ adminPwd, onLogout }: { adminPwd: string; onLogout: () => void }) {
  const [vehicles, setVehicles] = useState<CustomVehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  // Expandir marcas/modelos
  const [openMakes, setOpenMakes]   = useState<Record<string, boolean>>({})
  const [openModels, setOpenModels] = useState<Record<string, boolean>>({})

  // Estado de edición inline: 'make:<make>' | 'model:<make>|<model>' | 'version:<id>'
  const [editing, setEditing]   = useState<string | null>(null)
  const [saving, setSaving]     = useState(false)

  // Inline "añadir versión" dentro de un modelo
  const [addingVersionTo, setAddingVersionTo] = useState<string | null>(null) // 'make|model'
  const [newVersionVal, setNewVersionVal]     = useState('')

  // Formulario de añadir vehículo completo
  const [fMake, setFMake]           = useState('')
  const [fNewMake, setFNewMake]     = useState('')
  const [fModel, setFModel]         = useState('')
  const [fNewModel, setFNewModel]   = useState('')
  const [fVersion, setFVersion]     = useState('')
  const [adding, setAdding]     = useState(false)
  const [addError, setAddError] = useState('')

  useEffect(() => {
    apiGetCustomCatalog()
      .then(data => {
        setVehicles(data)
        // Expandir todas las marcas y modelos automáticamente
        const makes: Record<string, boolean> = {}
        const models: Record<string, boolean> = {}
        const g = groupVehicles(data)
        for (const make of Object.keys(g)) {
          makes[make] = true
          for (const model of Object.keys(g[make])) {
            models[`${make}|${model}`] = true
          }
        }
        setOpenMakes(makes)
        setOpenModels(models)
      })
      .catch(() => setFetchError('No se pudo cargar el catálogo'))
      .finally(() => setLoading(false))
  }, [])

  const grouped = useMemo(() => groupVehicles(vehicles), [vehicles])

  // Marcas disponibles en el selector (todas desde la BD)
  const allMakes = useMemo(() => Object.keys(grouped).sort(), [grouped])

  // Modelos disponibles para la marca seleccionada
  const makeKey = fMake === NEW_MAKE_SENTINEL ? '' : fMake
  const allModels = useMemo(() => {
    return Object.keys(grouped[makeKey] ?? {}).sort()
  }, [fMake, grouped]) // eslint-disable-line

  const resolvedMake  = fMake  === NEW_MAKE_SENTINEL ? fNewMake.trim()  : fMake
  const resolvedModel = fModel === NEW_MAKE_SENTINEL ? fNewModel.trim() : fModel

  // ── Añadir vehículo completo ────────────────────────────────────────────────
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddError('')
    const make    = resolvedMake
    const model   = resolvedModel
    const version = fVersion.trim()
    if (!make || !model || !version) { setAddError('Todos los campos son obligatorios'); return }
    setAdding(true)
    try {
      const created = await apiAddCustomVehicle(adminPwd, make, model, version)
      setVehicles(v => [...v, created])
      setOpenMakes(o => ({ ...o, [make]: true }))
      setOpenModels(o => ({ ...o, [`${make}|${model}`]: true }))
      setFMake(''); setFNewMake(''); setFModel(''); setFNewModel(''); setFVersion('')
    } catch (err) {
      setAddError(err instanceof Error ? err.message : 'Error al añadir')
    } finally {
      setAdding(false)
    }
  }

  // ── Añadir versión inline ────────────────────────────────────────────────────
  const handleAddVersion = async (make: string, model: string) => {
    if (!newVersionVal.trim()) return
    try {
      const created = await apiAddCustomVehicle(adminPwd, make, model, newVersionVal.trim())
      setVehicles(v => [...v, created])
      setAddingVersionTo(null); setNewVersionVal('')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error')
    }
  }

  // ── Guardar edición inline ───────────────────────────────────────────────────
  const handleSave = async (key: string, newVal: string) => {
    if (!newVal.trim()) return
    setSaving(true)
    try {
      if (key.startsWith('make:')) {
        const oldMake = key.slice(5)
        await apiRenameMake(adminPwd, oldMake, newVal.trim())
        setVehicles(v => v.map(x => x.make === oldMake ? { ...x, make: newVal.trim() } : x))
      } else if (key.startsWith('model:')) {
        const [make, oldModel] = key.slice(6).split('|')
        await apiRenameModel(adminPwd, make, oldModel, newVal.trim())
        setVehicles(v => v.map(x => x.make === make && x.model === oldModel ? { ...x, model: newVal.trim() } : x))
      } else if (key.startsWith('version:')) {
        const id = parseInt(key.slice(8))
        const cur = vehicles.find(x => x.id === id)!
        await apiUpdateCustomVersion(adminPwd, id, cur.make, cur.model, newVal.trim())
        setVehicles(v => v.map(x => x.id === id ? { ...x, version: newVal.trim() } : x))
      }
      setEditing(null)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  // ── Borrar ───────────────────────────────────────────────────────────────────
  const handleDeleteVersion = async (v: CustomVehicle) => {
    if (!confirm(`¿Eliminar versión "${v.version}"?`)) return
    await apiDeleteCustomVersion(adminPwd, v.id)
    setVehicles(prev => prev.filter(x => x.id !== v.id))
  }

  const handleDeleteModel = async (make: string, model: string) => {
    const count = grouped[make]?.[model]?.length ?? 0
    if (!confirm(`¿Eliminar el modelo "${model}" y sus ${count} versión(es)?`)) return
    await apiDeleteCustomModel(adminPwd, make, model)
    setVehicles(prev => prev.filter(x => !(x.make === make && x.model === model)))
  }

  const handleDeleteMake = async (make: string) => {
    const count = Object.values(grouped[make] ?? {}).flat().length
    if (!confirm(`¿Eliminar la marca "${make}" y todas sus ${count} entradas?`)) return
    await apiDeleteCustomMake(adminPwd, make)
    setVehicles(prev => prev.filter(x => x.make !== make))
  }

  const toggleMake  = (make: string)  => setOpenMakes(o  => ({ ...o, [make]:  !o[make]  }))
  const toggleModel = (key: string)   => setOpenModels(o => ({ ...o, [key]:   !o[key]   }))

  return (
    <div className="min-h-screen bg-jaecoo-base p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-jaecoo-electric/10 border border-jaecoo-electric/30 rounded-xl flex items-center justify-center">
              <Car size={20} className="text-jaecoo-electric" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-jaecoo-primary">Catálogo personalizado</h1>
              <p className="text-xs text-jaecoo-muted">{vehicles.length} versiones · {Object.keys(grouped).length} marcas</p>
            </div>
          </div>
          <button onClick={onLogout}
            className="flex items-center gap-2 text-sm text-jaecoo-muted hover:text-jaecoo-secondary transition-colors px-3 py-2 rounded-xl hover:bg-jaecoo-elevated">
            <LogOut size={15} /> Salir
          </button>
        </div>

        {/* ── Formulario de añadir ── */}
        <div className="bg-jaecoo-card border border-jaecoo-border-strong rounded-2xl p-5 shadow-j-card">
          <h2 className="text-sm font-semibold text-jaecoo-primary mb-4 flex items-center gap-2">
            <Plus size={16} className="text-jaecoo-electric" /> Añadir vehículo
          </h2>
          <form onSubmit={handleAdd} className="space-y-3">

            {/* Marca */}
            <div>
              <label className="block text-xs font-medium text-jaecoo-muted mb-1.5">Marca</label>
              <CustomSelect
                value={fMake}
                onChange={v => { setFMake(v); setFModel(''); setFNewModel('') }}
                options={[
                  ...allMakes.map(m => ({ value: m, label: m })),
                  { value: '', label: '', separator: true } as SelectOption,
                  { value: NEW_MAKE_SENTINEL, label: '+ Nueva marca…' },
                ]}
                placeholder="Selecciona marca…"
              />
              {/* Texto especial para "nueva marca" */}
              {fMake === NEW_MAKE_SENTINEL && (
                <input
                  autoFocus
                  value={fNewMake}
                  onChange={e => setFNewMake(e.target.value)}
                  placeholder="Escribe el nombre de la nueva marca"
                  className={`${inp} mt-2`}
                />
              )}
            </div>

            {/* Modelo */}
            <div>
              <label className="block text-xs font-medium text-jaecoo-muted mb-1.5">Modelo</label>
              {fMake && fMake !== NEW_MAKE_SENTINEL && allModels.length > 0 ? (
                <CustomSelect
                  value={fModel}
                  onChange={setFModel}
                  options={[
                    ...allModels.map(m => ({ value: m, label: m })),
                    { value: '', label: '', separator: true } as SelectOption,
                    { value: NEW_MAKE_SENTINEL, label: '+ Nuevo modelo…' },
                  ]}
                  placeholder="Selecciona o añade modelo…"
                  disabled={!fMake}
                />
              ) : (
                <input
                  value={fModel}
                  onChange={e => setFModel(e.target.value)}
                  placeholder={fMake ? 'Nombre del modelo' : 'Primero selecciona marca'}
                  disabled={!fMake}
                  className={`${inp} disabled:opacity-40`}
                />
              )}
              {fModel === NEW_MAKE_SENTINEL && (
                <input
                  autoFocus
                  value={fNewModel}
                  onChange={e => setFNewModel(e.target.value)}
                  placeholder="Escribe el nombre del nuevo modelo"
                  className={`${inp} mt-2`}
                />
              )}
            </div>

            {/* Versión */}
            <div>
              <label className="block text-xs font-medium text-jaecoo-muted mb-1.5">Versión</label>
              <input
                value={fVersion}
                onChange={e => setFVersion(e.target.value)}
                placeholder={resolvedModel ? 'Nombre de la versión' : 'Primero selecciona modelo'}
                disabled={!resolvedModel}
                className={`${inp} disabled:opacity-40`}
              />
            </div>

            {addError && (
              <p className="text-sm text-jaecoo-danger bg-jaecoo-danger/10 border border-jaecoo-danger/30 rounded-xl px-4 py-2.5">
                {addError}
              </p>
            )}

            <button type="submit"
              disabled={adding || !resolvedMake || !resolvedModel || !fVersion}
              className="flex items-center gap-2 bg-jaecoo-electric hover:brightness-110 disabled:opacity-50
                text-jaecoo-base font-semibold text-sm rounded-xl px-5 py-2.5 transition-all">
              {adding ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              Añadir
            </button>
          </form>
        </div>

        {/* ── Árbol de gestión ── */}
        <div className="bg-jaecoo-card border border-jaecoo-border-strong rounded-2xl shadow-j-card overflow-hidden">
          <div className="px-5 py-4 border-b border-jaecoo-border flex items-center justify-between">
            <h2 className="text-sm font-semibold text-jaecoo-primary">Gestión del catálogo</h2>
            <span className="text-xs text-jaecoo-muted bg-jaecoo-elevated px-2 py-1 rounded-lg">
              {Object.keys(grouped).length} marcas
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={24} className="animate-spin text-jaecoo-electric" />
            </div>
          ) : fetchError ? (
            <p className="text-jaecoo-danger text-sm px-5 py-6">{fetchError}</p>
          ) : Object.keys(grouped).length === 0 ? (
            <p className="text-jaecoo-muted text-sm px-5 py-8 text-center">
              No hay vehículos personalizados. Añade el primero arriba.
            </p>
          ) : (
            <div className="divide-y divide-jaecoo-border">
              {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([make, models]) => (
                <div key={make}>
                  {/* ── Fila de marca ── */}
                  <div className="flex items-center gap-2 px-4 py-3 hover:bg-jaecoo-elevated/50 transition-colors group">
                    <button type="button" onClick={() => toggleMake(make)}
                      className="flex items-center gap-2 flex-1 min-w-0 text-left">
                      {openMakes[make]
                        ? <ChevronDown size={14} className="text-jaecoo-muted flex-shrink-0" />
                        : <ChevronRight size={14} className="text-jaecoo-muted flex-shrink-0" />}
                      {editing === `make:${make}` ? (
                        <InlineEdit
                          value={make}
                          onSave={v => handleSave(`make:${make}`, v)}
                          onCancel={() => setEditing(null)}
                          saving={saving}
                        />
                      ) : (
                        <span className="text-sm font-semibold text-jaecoo-primary flex items-center gap-2">
                          <Car size={13} className="text-jaecoo-electric flex-shrink-0" />
                          {make}
                          <span className="text-xs font-normal text-jaecoo-muted">
                            ({Object.values(models).flat().length})
                          </span>
                        </span>
                      )}
                    </button>
                    {editing !== `make:${make}` && (
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => { setEditing(`make:${make}`); setOpenMakes(o => ({...o, [make]: true})) }}
                          className="p-1.5 rounded-lg hover:bg-jaecoo-elevated text-jaecoo-muted hover:text-jaecoo-secondary transition-colors" title="Renombrar marca">
                          <Pencil size={13} />
                        </button>
                        <button type="button" onClick={() => handleDeleteMake(make)}
                          className="p-1.5 rounded-lg hover:bg-jaecoo-danger/10 text-jaecoo-muted hover:text-jaecoo-danger transition-colors" title="Eliminar marca">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* ── Modelos ── */}
                  {openMakes[make] && (
                    <div className="bg-jaecoo-elevated/30">
                      {Object.entries(models).sort(([a], [b]) => a.localeCompare(b)).map(([model, vers]) => {
                        const modelKey = `${make}|${model}`
                        return (
                          <div key={model} className="border-t border-jaecoo-border/40">
                            {/* Fila de modelo */}
                            <div className="flex items-center gap-2 pl-8 pr-4 py-2.5 hover:bg-jaecoo-elevated/50 transition-colors group">
                              <button type="button" onClick={() => toggleModel(modelKey)}
                                className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                {openModels[modelKey]
                                  ? <ChevronDown size={12} className="text-jaecoo-muted flex-shrink-0" />
                                  : <ChevronRight size={12} className="text-jaecoo-muted flex-shrink-0" />}
                                {editing === `model:${modelKey}` ? (
                                  <InlineEdit
                                    value={model}
                                    onSave={v => handleSave(`model:${modelKey}`, v)}
                                    onCancel={() => setEditing(null)}
                                    saving={saving}
                                  />
                                ) : (
                                  <span className="text-sm font-medium text-jaecoo-secondary">
                                    {model}
                                    <span className="text-xs font-normal text-jaecoo-muted ml-1.5">
                                      ({vers.length} versión{vers.length !== 1 ? 'es' : ''})
                                    </span>
                                  </span>
                                )}
                              </button>
                              {editing !== `model:${modelKey}` && (
                                <div className="flex items-center gap-1">
                                  <button type="button"
                                    onClick={() => { setEditing(`model:${modelKey}`); setOpenModels(o => ({...o, [modelKey]: true})) }}
                                    className="p-1 rounded-lg hover:bg-jaecoo-elevated text-jaecoo-muted hover:text-jaecoo-secondary transition-colors" title="Renombrar modelo">
                                    <Pencil size={12} />
                                  </button>
                                  <button type="button" onClick={() => handleDeleteModel(make, model)}
                                    className="p-1 rounded-lg hover:bg-jaecoo-danger/10 text-jaecoo-muted hover:text-jaecoo-danger transition-colors" title="Eliminar modelo">
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Versiones */}
                            {openModels[modelKey] && (
                              <div className="pl-14 pr-4 pb-2 space-y-1">
                                {vers.map(v => (
                                  <div key={v.id} className="flex items-center gap-2 group/ver py-0.5">
                                    <span className="w-1 h-1 rounded-full bg-jaecoo-border flex-shrink-0" />
                                    {editing === `version:${v.id}` ? (
                                      <InlineEdit
                                        value={v.version}
                                        onSave={val => handleSave(`version:${v.id}`, val)}
                                        onCancel={() => setEditing(null)}
                                        saving={saving}
                                      />
                                    ) : (
                                      <>
                                        <span className="text-xs text-jaecoo-muted flex-1">{v.version}</span>
                                        <div className="flex items-center gap-0.5">
                                          <button type="button" onClick={() => setEditing(`version:${v.id}`)}
                                            className="p-1 rounded hover:bg-jaecoo-elevated text-jaecoo-muted hover:text-jaecoo-secondary transition-colors" title="Editar versión">
                                            <Pencil size={11} />
                                          </button>
                                          <button type="button" onClick={() => handleDeleteVersion(v)}
                                            className="p-1 rounded hover:bg-jaecoo-danger/10 text-jaecoo-muted hover:text-jaecoo-danger transition-colors" title="Eliminar versión">
                                            <Trash2 size={11} />
                                          </button>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                ))}

                                {/* Añadir versión inline */}
                                {addingVersionTo === modelKey ? (
                                  <form onSubmit={e => { e.preventDefault(); handleAddVersion(make, model) }}
                                    className="flex items-center gap-1.5 mt-1">
                                    <input
                                      autoFocus value={newVersionVal}
                                      onChange={e => setNewVersionVal(e.target.value)}
                                      placeholder="Nueva versión…"
                                      className={`${inpSm} flex-1`}
                                    />
                                    <button type="submit" disabled={!newVersionVal.trim()}
                                      className="p-1.5 rounded-lg bg-jaecoo-electric/10 text-jaecoo-electric hover:bg-jaecoo-electric/20 disabled:opacity-40 transition-colors">
                                      <Check size={13} />
                                    </button>
                                    <button type="button" onClick={() => { setAddingVersionTo(null); setNewVersionVal('') }}
                                      className="p-1.5 rounded-lg hover:bg-jaecoo-elevated text-jaecoo-muted transition-colors">
                                      <X size={13} />
                                    </button>
                                  </form>
                                ) : (
                                  <button type="button"
                                    onClick={() => { setAddingVersionTo(modelKey); setNewVersionVal('') }}
                                    className="flex items-center gap-1 text-xs text-jaecoo-electric/70 hover:text-jaecoo-electric transition-colors mt-1">
                                    <Plus size={11} /> Añadir versión
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-jaecoo-muted pb-4">
          Los cambios son visibles para todos los usuarios en el formulario de registro.
        </p>
      </div>
    </div>
  )
}

// ── Página principal ──────────────────────────────────────────────────────────
export default function CatalogAdmin() {
  const [adminPwd, setAdminPwd] = useState<string | null>(
    () => sessionStorage.getItem(SESSION_KEY)
  )
  if (!adminPwd) return <AdminLogin onAuth={pwd => { sessionStorage.setItem(SESSION_KEY, pwd); setAdminPwd(pwd) }} />
  return <AdminPanel adminPwd={adminPwd} onLogout={() => { sessionStorage.removeItem(SESSION_KEY); setAdminPwd(null) }} />
}
