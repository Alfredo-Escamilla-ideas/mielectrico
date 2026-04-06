import { useState, useEffect, useMemo } from 'react'
import {
  ShieldCheck, Plus, Trash2, Loader2, LogOut, Car,
  ChevronDown, Pencil, Check, X, Search, Tag, Layers,
} from 'lucide-react'
import {
  apiGetCustomCatalog, apiAddCustomVehicle,
  apiUpdateCustomVersion, apiRenameMake, apiRenameModel,
  apiDeleteCustomVersion, apiDeleteCustomModel, apiDeleteCustomMake,
} from '../services/api'
import type { CustomVehicle } from '../services/api'

const SESSION_KEY = 'catalog_admin_pwd'

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

// ── Shared styles ─────────────────────────────────────────────────────────────
const inp = `w-full rounded-xl border border-jaecoo-border bg-jaecoo-elevated px-4 py-3 text-sm
  text-jaecoo-primary focus:outline-none focus:border-jaecoo-electric focus:ring-2
  focus:ring-jaecoo-electric/20 transition-all placeholder:text-jaecoo-muted`

const inpSm = `rounded-lg border border-jaecoo-border bg-jaecoo-elevated px-3 py-1.5 text-sm
  text-jaecoo-primary focus:outline-none focus:border-jaecoo-electric focus:ring-1
  focus:ring-jaecoo-electric/20 transition-all placeholder:text-jaecoo-muted`

// ── Login ─────────────────────────────────────────────────────────────────────
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
          <h1 className="text-xl font-bold text-jaecoo-primary">Administración</h1>
          <p className="text-jaecoo-muted text-sm mt-1">Catálogo de vehículos</p>
        </div>
        <div className="bg-jaecoo-card border border-jaecoo-border-strong rounded-2xl shadow-j-elevated p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-jaecoo-muted uppercase tracking-wide mb-1.5">
                Contraseña
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

// ── Inline edit ───────────────────────────────────────────────────────────────
function InlineEdit({
  value, onSave, onCancel, saving,
}: { value: string; onSave: (v: string) => void; onCancel: () => void; saving: boolean }) {
  const [v, setV] = useState(value)
  return (
    <form onSubmit={e => { e.preventDefault(); onSave(v) }} className="flex items-center gap-1.5 flex-1 min-w-0">
      <input autoFocus value={v} onChange={e => setV(e.target.value)} className={`${inpSm} flex-1 min-w-0`} />
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
  const [search, setSearch] = useState('')
  const [selectedMake, setSelectedMake] = useState<string | null>(null)
  const [openModels, setOpenModels] = useState<Record<string, boolean>>({})
  const [editing, setEditing] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [addingVersionTo, setAddingVersionTo] = useState<string | null>(null)
  const [newVersionVal, setNewVersionVal] = useState('')
  const [addingModel, setAddingModel] = useState(false)
  const [newModelVal, setNewModelVal] = useState('')
  const [newModelVersion, setNewModelVersion] = useState('')
  const [addModelError, setAddModelError] = useState('')
  const [savingModel, setSavingModel] = useState(false)
  const [addingMake, setAddingMake] = useState(false)
  const [newMakeVal, setNewMakeVal] = useState('')
  const [newMakeModel, setNewMakeModel] = useState('')
  const [newMakeVersion, setNewMakeVersion] = useState('')
  const [addMakeError, setAddMakeError] = useState('')
  const [savingMake, setSavingMake] = useState(false)

  useEffect(() => {
    apiGetCustomCatalog()
      .then(data => { setVehicles(data) })
      .catch(() => setFetchError('No se pudo cargar el catálogo'))
      .finally(() => setLoading(false))
  }, [])

  const grouped = useMemo(() => groupVehicles(vehicles), [vehicles])
  const sortedMakes = useMemo(() =>
    Object.keys(grouped).sort((a, b) => a.localeCompare(b)), [grouped])
  const filteredMakes = useMemo(() =>
    search.trim()
      ? sortedMakes.filter(m => m.toLowerCase().includes(search.toLowerCase()))
      : sortedMakes,
    [sortedMakes, search])

  const makeModels = selectedMake ? grouped[selectedMake] ?? {} : {}
  const totalVersions = vehicles.length
  const totalMakes = sortedMakes.length
  const totalModels = useMemo(() =>
    sortedMakes.reduce((acc, m) => acc + Object.keys(grouped[m] ?? {}).length, 0), [grouped, sortedMakes])

  // ── Guardar edición ──────────────────────────────────────────────────────────
  const handleSave = async (key: string, newVal: string) => {
    if (!newVal.trim()) return
    setSaving(true)
    try {
      if (key.startsWith('make:')) {
        const oldMake = key.slice(5)
        await apiRenameMake(adminPwd, oldMake, newVal.trim())
        setVehicles(v => v.map(x => x.make === oldMake ? { ...x, make: newVal.trim() } : x))
        setSelectedMake(newVal.trim())
      } else if (key.startsWith('model:')) {
        const [make, oldModel] = key.slice(6).split('|')
        await apiRenameModel(adminPwd, make, oldModel, newVal.trim())
        setVehicles(v => v.map(x => x.make === make && x.model === oldModel ? { ...x, model: newVal.trim() } : x))
        setOpenModels(o => {
          const next = { ...o }
          delete next[`${make}|${oldModel}`]
          next[`${make}|${newVal.trim()}`] = true
          return next
        })
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
    if (!confirm(`¿Eliminar "${v.version}"?`)) return
    await apiDeleteCustomVersion(adminPwd, v.id)
    setVehicles(prev => prev.filter(x => x.id !== v.id))
  }

  const handleDeleteModel = async (make: string, model: string) => {
    const count = grouped[make]?.[model]?.length ?? 0
    if (!confirm(`¿Eliminar "${model}" y sus ${count} versión(es)?`)) return
    await apiDeleteCustomModel(adminPwd, make, model)
    setVehicles(prev => prev.filter(x => !(x.make === make && x.model === model)))
  }

  const handleDeleteMake = async (make: string) => {
    const count = Object.values(grouped[make] ?? {}).flat().length
    if (!confirm(`¿Eliminar la marca "${make}" y todas sus ${count} entradas?`)) return
    await apiDeleteCustomMake(adminPwd, make)
    setVehicles(prev => prev.filter(x => x.make !== make))
    setSelectedMake(null)
  }

  // ── Añadir versión ───────────────────────────────────────────────────────────
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

  // ── Añadir modelo con primera versión ────────────────────────────────────────
  const handleAddModel = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddModelError('')
    if (!newModelVal.trim() || !newModelVersion.trim()) {
      setAddModelError('Nombre del modelo y versión son obligatorios')
      return
    }
    if (!selectedMake) return
    setSavingModel(true)
    try {
      const created = await apiAddCustomVehicle(adminPwd, selectedMake, newModelVal.trim(), newModelVersion.trim())
      setVehicles(v => [...v, created])
      setOpenModels(o => ({ ...o, [`${selectedMake}|${newModelVal.trim()}`]: true }))
      setNewModelVal(''); setNewModelVersion(''); setAddingModel(false)
    } catch (err) {
      setAddModelError(err instanceof Error ? err.message : 'Error')
    } finally {
      setSavingModel(false)
    }
  }

  // ── Añadir nueva marca ───────────────────────────────────────────────────────
  const handleAddMake = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddMakeError('')
    if (!newMakeVal.trim() || !newMakeModel.trim() || !newMakeVersion.trim()) {
      setAddMakeError('Todos los campos son obligatorios')
      return
    }
    setSavingMake(true)
    try {
      const created = await apiAddCustomVehicle(adminPwd, newMakeVal.trim(), newMakeModel.trim(), newMakeVersion.trim())
      setVehicles(v => [...v, created])
      setSelectedMake(newMakeVal.trim())
      setOpenModels(o => ({ ...o, [`${newMakeVal.trim()}|${newMakeModel.trim()}`]: true }))
      setNewMakeVal(''); setNewMakeModel(''); setNewMakeVersion(''); setAddingMake(false)
    } catch (err) {
      setAddMakeError(err instanceof Error ? err.message : 'Error')
    } finally {
      setSavingMake(false)
    }
  }

  const toggleModel = (key: string) => setOpenModels(o => ({ ...o, [key]: !o[key] }))

  return (
    <div className="min-h-screen bg-jaecoo-base flex flex-col">

      {/* ── Top navbar ── */}
      <header className="bg-jaecoo-card border-b border-jaecoo-border-strong px-4 md:px-6 py-3.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-jaecoo-electric/10 border border-jaecoo-electric/30 rounded-lg flex items-center justify-center">
            <Car size={16} className="text-jaecoo-electric" />
          </div>
          <div>
            <span className="text-sm font-bold text-jaecoo-primary">Catálogo</span>
            <span className="text-jaecoo-muted text-xs ml-2 hidden sm:inline">Administración de vehículos</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Stats */}
          <div className="hidden md:flex items-center gap-4 text-xs text-jaecoo-muted border-r border-jaecoo-border pr-4">
            <span className="flex items-center gap-1.5"><Car size={12} className="text-jaecoo-electric" />{totalMakes} marcas</span>
            <span className="flex items-center gap-1.5"><Layers size={12} className="text-jaecoo-electric" />{totalModels} modelos</span>
            <span className="flex items-center gap-1.5"><Tag size={12} className="text-jaecoo-electric" />{totalVersions} versiones</span>
          </div>
          <button onClick={onLogout}
            className="flex items-center gap-1.5 text-sm text-jaecoo-muted hover:text-jaecoo-secondary transition-colors px-2.5 py-1.5 rounded-lg hover:bg-jaecoo-elevated">
            <LogOut size={14} /> <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </header>

      {/* ── Contenido principal ── */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 size={28} className="animate-spin text-jaecoo-electric" />
        </div>
      ) : fetchError ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <p className="text-jaecoo-danger text-sm">{fetchError}</p>
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">

          {/* ── Sidebar de marcas ── */}
          <aside className="w-64 xl:w-72 flex-shrink-0 border-r border-jaecoo-border bg-jaecoo-card flex flex-col overflow-hidden">
            {/* Buscador + botón nueva marca */}
            <div className="p-3 border-b border-jaecoo-border space-y-2">
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-jaecoo-muted" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Buscar marca…"
                  className={`${inpSm} w-full pl-8`}
                />
              </div>
              <button type="button"
                onClick={() => { setAddingMake(v => !v); setAddMakeError('') }}
                className={`w-full flex items-center justify-center gap-1.5 text-xs font-medium rounded-lg px-3 py-2 transition-colors
                  ${addingMake
                    ? 'bg-jaecoo-electric/10 text-jaecoo-electric border border-jaecoo-electric/30'
                    : 'border border-dashed border-jaecoo-border hover:border-jaecoo-electric/40 text-jaecoo-muted hover:text-jaecoo-electric'}`}>
                <Plus size={12} /> Nueva marca
              </button>
              {/* Formulario nueva marca */}
              {addingMake && (
                <form onSubmit={handleAddMake} className="space-y-2 pt-1">
                  <input autoFocus value={newMakeVal} onChange={e => setNewMakeVal(e.target.value)}
                    placeholder="Nombre del fabricante" className={`${inpSm} w-full`} />
                  <input value={newMakeModel} onChange={e => setNewMakeModel(e.target.value)}
                    placeholder="Primer modelo" className={`${inpSm} w-full`} />
                  <input value={newMakeVersion} onChange={e => setNewMakeVersion(e.target.value)}
                    placeholder="Primera versión" className={`${inpSm} w-full`} />
                  {addMakeError && <p className="text-xs text-jaecoo-danger">{addMakeError}</p>}
                  <div className="flex gap-2">
                    <button type="submit" disabled={savingMake}
                      className="flex-1 flex items-center justify-center gap-1 bg-jaecoo-electric hover:brightness-110 disabled:opacity-50 text-jaecoo-base text-xs font-semibold rounded-lg py-2 transition-all">
                      {savingMake ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                      Crear
                    </button>
                    <button type="button"
                      onClick={() => { setAddingMake(false); setNewMakeVal(''); setNewMakeModel(''); setNewMakeVersion(''); setAddMakeError('') }}
                      className="p-2 rounded-lg hover:bg-jaecoo-elevated text-jaecoo-muted transition-colors">
                      <X size={13} />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Lista de marcas */}
            <nav className="flex-1 overflow-y-auto py-1">
              {filteredMakes.length === 0 ? (
                <p className="text-xs text-jaecoo-muted text-center py-6">Sin resultados</p>
              ) : filteredMakes.map(make => {
                const vCount = Object.values(grouped[make] ?? {}).flat().length
                const mCount = Object.keys(grouped[make] ?? {}).length
                const isActive = selectedMake === make
                return (
                  <button key={make} type="button"
                    onClick={() => { setSelectedMake(make); setEditing(null); setAddingModel(false) }}
                    className={`w-full text-left px-3 py-2.5 flex items-center gap-2.5 transition-colors
                      ${isActive
                        ? 'bg-jaecoo-electric/10 border-r-2 border-jaecoo-electric'
                        : 'hover:bg-jaecoo-elevated/60 border-r-2 border-transparent'}`}>
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold
                      ${isActive ? 'bg-jaecoo-electric text-jaecoo-base' : 'bg-jaecoo-elevated text-jaecoo-muted'}`}>
                      {make[0]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isActive ? 'text-jaecoo-electric' : 'text-jaecoo-secondary'}`}>
                        {make}
                      </p>
                      <p className="text-xs text-jaecoo-muted">{mCount} mod · {vCount} ver</p>
                    </div>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* ── Panel derecho ── */}
          <main className="flex-1 overflow-y-auto">
            {!selectedMake ? (
              /* Estado vacío */
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-16 h-16 bg-jaecoo-elevated rounded-2xl flex items-center justify-center mb-4">
                  <Car size={28} className="text-jaecoo-muted" />
                </div>
                <h2 className="text-base font-semibold text-jaecoo-secondary mb-1">Selecciona una marca</h2>
                <p className="text-sm text-jaecoo-muted max-w-xs">
                  Elige una marca del panel izquierdo para ver y gestionar sus modelos y versiones.
                </p>
              </div>
            ) : (
              <div className="p-4 md:p-6 space-y-4 max-w-3xl">

                {/* ── Header de marca ── */}
                <div className="bg-jaecoo-card border border-jaecoo-border-strong rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-jaecoo-electric/10 border border-jaecoo-electric/20 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-bold text-jaecoo-electric">
                    {selectedMake[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    {editing === `make:${selectedMake}` ? (
                      <InlineEdit
                        value={selectedMake}
                        onSave={v => handleSave(`make:${selectedMake}`, v)}
                        onCancel={() => setEditing(null)}
                        saving={saving}
                      />
                    ) : (
                      <>
                        <h2 className="text-lg font-bold text-jaecoo-primary">{selectedMake}</h2>
                        <p className="text-xs text-jaecoo-muted">
                          {Object.keys(makeModels).length} modelos · {Object.values(makeModels).flat().length} versiones
                        </p>
                      </>
                    )}
                  </div>
                  {editing !== `make:${selectedMake}` && (
                    <div className="flex items-center gap-2">
                      <button type="button"
                        onClick={() => setEditing(`make:${selectedMake}`)}
                        className="flex items-center gap-1.5 text-xs text-jaecoo-secondary border border-jaecoo-border hover:border-jaecoo-border-strong bg-jaecoo-elevated hover:bg-jaecoo-card px-3 py-1.5 rounded-lg transition-colors">
                        <Pencil size={12} /> Renombrar
                      </button>
                      <button type="button"
                        onClick={() => handleDeleteMake(selectedMake)}
                        className="flex items-center gap-1.5 text-xs text-jaecoo-danger border border-jaecoo-danger/30 hover:bg-jaecoo-danger/10 px-3 py-1.5 rounded-lg transition-colors">
                        <Trash2 size={12} /> Eliminar
                      </button>
                    </div>
                  )}
                </div>

                {/* ── Modelos ── */}
                <div className="space-y-2">
                  {Object.entries(makeModels).sort(([a], [b]) => a.localeCompare(b)).map(([model, vers]) => {
                    const modelKey = `${selectedMake}|${model}`
                    const isOpen = !!openModels[modelKey]
                    return (
                      <div key={model} className="bg-jaecoo-card border border-jaecoo-border-strong rounded-xl overflow-hidden">
                        {/* Cabecera del modelo */}
                        <div className="flex items-center gap-3 px-4 py-3">
                          <button type="button" onClick={() => toggleModel(modelKey)}
                            className="flex items-center gap-2 flex-1 min-w-0 text-left">
                            <ChevronDown size={14} className={`text-jaecoo-muted flex-shrink-0 transition-transform ${isOpen ? '' : '-rotate-90'}`} />
                            {editing === `model:${modelKey}` ? (
                              <InlineEdit
                                value={model}
                                onSave={v => handleSave(`model:${modelKey}`, v)}
                                onCancel={() => setEditing(null)}
                                saving={saving}
                              />
                            ) : (
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span className="text-sm font-semibold text-jaecoo-primary truncate">{model}</span>
                                <span className="text-xs text-jaecoo-muted bg-jaecoo-elevated px-2 py-0.5 rounded-full flex-shrink-0">
                                  {vers.length} versión{vers.length !== 1 ? 'es' : ''}
                                </span>
                              </div>
                            )}
                          </button>
                          {editing !== `model:${modelKey}` && (
                            <div className="flex items-center gap-1.5">
                              <button type="button"
                                onClick={() => { setEditing(`model:${modelKey}`); setOpenModels(o => ({ ...o, [modelKey]: true })) }}
                                className="p-1.5 rounded-lg border border-jaecoo-border hover:border-jaecoo-border-strong text-jaecoo-muted hover:text-jaecoo-secondary bg-jaecoo-elevated transition-colors" title="Renombrar">
                                <Pencil size={12} />
                              </button>
                              <button type="button"
                                onClick={() => handleDeleteModel(selectedMake, model)}
                                className="p-1.5 rounded-lg border border-jaecoo-danger/20 hover:bg-jaecoo-danger/10 text-jaecoo-muted hover:text-jaecoo-danger bg-jaecoo-elevated transition-colors" title="Eliminar">
                                <Trash2 size={12} />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Versiones */}
                        {isOpen && (
                          <div className="border-t border-jaecoo-border bg-jaecoo-elevated/40 px-4 py-3 space-y-1">
                            {vers.map(v => (
                              <div key={v.id} className="flex items-center gap-2 py-1 rounded-lg px-2 hover:bg-jaecoo-elevated transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-jaecoo-electric/50 flex-shrink-0" />
                                {editing === `version:${v.id}` ? (
                                  <InlineEdit
                                    value={v.version}
                                    onSave={val => handleSave(`version:${v.id}`, val)}
                                    onCancel={() => setEditing(null)}
                                    saving={saving}
                                  />
                                ) : (
                                  <>
                                    <span className="text-sm text-jaecoo-secondary flex-1">{v.version}</span>
                                    <div className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                                      <button type="button" onClick={() => setEditing(`version:${v.id}`)}
                                        className="p-1 rounded hover:bg-jaecoo-card text-jaecoo-muted hover:text-jaecoo-secondary transition-colors" title="Editar">
                                        <Pencil size={11} />
                                      </button>
                                      <button type="button" onClick={() => handleDeleteVersion(v)}
                                        className="p-1 rounded hover:bg-jaecoo-danger/10 text-jaecoo-muted hover:text-jaecoo-danger transition-colors" title="Eliminar">
                                        <Trash2 size={11} />
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}

                            {/* Añadir versión */}
                            {addingVersionTo === modelKey ? (
                              <form onSubmit={e => { e.preventDefault(); handleAddVersion(selectedMake, model) }}
                                className="flex items-center gap-1.5 pt-1">
                                <input autoFocus value={newVersionVal}
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
                                className="flex items-center gap-1.5 text-xs text-jaecoo-electric/70 hover:text-jaecoo-electric transition-colors pt-1 px-2">
                                <Plus size={11} /> Añadir versión
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* ── Añadir modelo ── */}
                {addingModel ? (
                  <form onSubmit={handleAddModel}
                    className="bg-jaecoo-card border border-jaecoo-electric/30 rounded-xl p-4 space-y-3">
                    <p className="text-sm font-semibold text-jaecoo-primary">Nuevo modelo en {selectedMake}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-jaecoo-muted mb-1">Nombre del modelo</label>
                        <input autoFocus value={newModelVal} onChange={e => setNewModelVal(e.target.value)}
                          placeholder="Ej: Atto 4" className={inpSm + ' w-full'} />
                      </div>
                      <div>
                        <label className="block text-xs text-jaecoo-muted mb-1">Primera versión</label>
                        <input value={newModelVersion} onChange={e => setNewModelVersion(e.target.value)}
                          placeholder="Ej: 45.1 kWh" className={inpSm + ' w-full'} />
                      </div>
                    </div>
                    {addModelError && (
                      <p className="text-xs text-jaecoo-danger">{addModelError}</p>
                    )}
                    <div className="flex items-center gap-2">
                      <button type="submit" disabled={savingModel}
                        className="flex items-center gap-1.5 bg-jaecoo-electric hover:brightness-110 disabled:opacity-50 text-jaecoo-base text-xs font-semibold rounded-lg px-4 py-2 transition-all">
                        {savingModel ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                        Guardar modelo
                      </button>
                      <button type="button" onClick={() => { setAddingModel(false); setNewModelVal(''); setNewModelVersion(''); setAddModelError('') }}
                        className="text-xs text-jaecoo-muted hover:text-jaecoo-secondary px-3 py-2 rounded-lg hover:bg-jaecoo-elevated transition-colors">
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <button type="button"
                    onClick={() => setAddingModel(true)}
                    className="w-full flex items-center justify-center gap-2 border border-dashed border-jaecoo-border hover:border-jaecoo-electric/50 text-jaecoo-muted hover:text-jaecoo-electric rounded-xl py-3 text-sm transition-colors">
                    <Plus size={15} /> Añadir modelo a {selectedMake}
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      )}
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
