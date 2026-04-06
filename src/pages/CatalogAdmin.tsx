import { useState, useEffect } from 'react'
import { ShieldCheck, Plus, Trash2, Loader2, LogOut, Car, ChevronDown, ChevronRight } from 'lucide-react'
import { apiGetCustomCatalog, apiAddCustomVehicle, apiDeleteCustomVehicle } from '../services/api'
import type { CustomVehicle } from '../services/api'
import { EV_CATALOG } from '../data/evCatalog'

const SESSION_KEY = 'catalog_admin_pwd'

// ── Agrupar por marca → modelo → versiones ───────────────────────────────────
function groupVehicles(vehicles: CustomVehicle[]) {
  const map: Record<string, Record<string, CustomVehicle[]>> = {}
  for (const v of vehicles) {
    map[v.make] ??= {}
    map[v.make][v.model] ??= []
    map[v.make][v.model].push(v)
  }
  return map
}

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
      // Verificar contraseña intentando una llamada real
      await apiGetCustomCatalog() // público — solo para ver que el servidor responde
      // Probamos con una petición falsa de POST para validar la contraseña
      await fetch(`/mielectrico/api/catalog.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ admin_password: pwd, make: '', model: '', version: '' }),
      }).then(async r => {
        const data = await r.json()
        if (r.status === 403) throw new Error(data.error)
        // 400 = campos vacíos = contraseña OK
      })
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
                type="password"
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                placeholder="••••••••"
                autoFocus
                className="w-full rounded-xl border border-jaecoo-border bg-jaecoo-elevated px-4 py-3 text-sm
                  text-jaecoo-primary focus:outline-none focus:border-jaecoo-electric focus:ring-2
                  focus:ring-jaecoo-electric/20 transition-all placeholder:text-jaecoo-muted"
              />
            </div>
            {error && (
              <p className="text-sm text-jaecoo-danger bg-jaecoo-danger/10 border border-jaecoo-danger/30 rounded-xl px-4 py-3">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading || !pwd}
              className="w-full bg-jaecoo-electric hover:brightness-110 disabled:opacity-50 text-jaecoo-base
                font-bold rounded-xl py-3 text-sm transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// ── Panel principal ───────────────────────────────────────────────────────────
function AdminPanel({ adminPwd, onLogout }: { adminPwd: string; onLogout: () => void }) {
  const [vehicles, setVehicles] = useState<CustomVehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Formulario de añadir
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [version, setVersion] = useState('')
  const [adding, setAdding] = useState(false)
  const [addError, setAddError] = useState('')

  // Expandir grupos
  const [openMakes, setOpenMakes] = useState<Record<string, boolean>>({})

  const existingMakes = EV_CATALOG.map(m => m.make).sort()

  useEffect(() => {
    apiGetCustomCatalog()
      .then(setVehicles)
      .catch(() => setError('No se pudo cargar el catálogo'))
      .finally(() => setLoading(false))
  }, [])

  const grouped = groupVehicles(vehicles)

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddError('')
    setAdding(true)
    try {
      const created = await apiAddCustomVehicle(adminPwd, make.trim(), model.trim(), version.trim())
      setVehicles(v => [...v, created].sort((a, b) => a.make.localeCompare(b.make) || a.model.localeCompare(b.model)))
      setMake(''); setModel(''); setVersion('')
    } catch (err) {
      setAddError(err instanceof Error ? err.message : 'Error al añadir')
    } finally {
      setAdding(false)
    }
  }

  const handleDelete = async (v: CustomVehicle) => {
    if (!confirm(`¿Eliminar "${v.make} ${v.model} ${v.version}"?`)) return
    try {
      await apiDeleteCustomVehicle(adminPwd, v.id)
      setVehicles(prev => prev.filter(x => x.id !== v.id))
    } catch {
      alert('Error al eliminar')
    }
  }

  const inp = `w-full rounded-xl border border-jaecoo-border bg-jaecoo-elevated px-4 py-3 text-sm
    text-jaecoo-primary focus:outline-none focus:border-jaecoo-electric focus:ring-2
    focus:ring-jaecoo-electric/20 transition-all placeholder:text-jaecoo-muted`

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
              <p className="text-xs text-jaecoo-muted">{vehicles.length} vehículos añadidos</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-jaecoo-muted hover:text-jaecoo-secondary transition-colors px-3 py-2 rounded-xl hover:bg-jaecoo-elevated"
          >
            <LogOut size={15} /> Salir
          </button>
        </div>

        {/* Formulario añadir */}
        <div className="bg-jaecoo-card border border-jaecoo-border-strong rounded-2xl p-5 shadow-j-card">
          <h2 className="text-sm font-semibold text-jaecoo-primary mb-4 flex items-center gap-2">
            <Plus size={16} className="text-jaecoo-electric" /> Añadir vehículo
          </h2>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-medium text-jaecoo-muted mb-1.5">Marca</label>
                <input
                  list="makes-list"
                  value={make}
                  onChange={e => setMake(e.target.value)}
                  placeholder="p.ej. BYD"
                  required
                  className={inp}
                />
                <datalist id="makes-list">
                  {existingMakes.map(m => <option key={m} value={m} />)}
                </datalist>
              </div>
              <div>
                <label className="block text-xs font-medium text-jaecoo-muted mb-1.5">Modelo</label>
                <input
                  value={model}
                  onChange={e => setModel(e.target.value)}
                  placeholder="p.ej. Seal 7"
                  required
                  className={inp}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-jaecoo-muted mb-1.5">Versión</label>
                <input
                  value={version}
                  onChange={e => setVersion(e.target.value)}
                  placeholder="p.ej. EV Excellence"
                  required
                  className={inp}
                />
              </div>
            </div>

            {addError && (
              <p className="text-sm text-jaecoo-danger bg-jaecoo-danger/10 border border-jaecoo-danger/30 rounded-xl px-4 py-2.5">
                {addError}
              </p>
            )}

            <button
              type="submit"
              disabled={adding || !make || !model || !version}
              className="flex items-center gap-2 bg-jaecoo-electric hover:brightness-110 disabled:opacity-50
                text-jaecoo-base font-semibold text-sm rounded-xl px-5 py-2.5 transition-all"
            >
              {adding ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              Añadir
            </button>
          </form>
        </div>

        {/* Lista de vehículos */}
        <div className="bg-jaecoo-card border border-jaecoo-border-strong rounded-2xl shadow-j-card overflow-hidden">
          <div className="px-5 py-4 border-b border-jaecoo-border">
            <h2 className="text-sm font-semibold text-jaecoo-primary">Vehículos en el catálogo custom</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={24} className="animate-spin text-jaecoo-electric" />
            </div>
          ) : error ? (
            <p className="text-jaecoo-danger text-sm px-5 py-6">{error}</p>
          ) : vehicles.length === 0 ? (
            <p className="text-jaecoo-muted text-sm px-5 py-8 text-center">
              No hay vehículos personalizados. Añade el primero arriba.
            </p>
          ) : (
            <div className="divide-y divide-jaecoo-border">
              {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([mk, models]) => (
                <div key={mk}>
                  {/* Make header */}
                  <button
                    type="button"
                    onClick={() => setOpenMakes(o => ({ ...o, [mk]: !o[mk] }))}
                    className="w-full flex items-center justify-between px-5 py-3 hover:bg-jaecoo-elevated transition-colors text-left"
                  >
                    <span className="text-sm font-semibold text-jaecoo-primary flex items-center gap-2">
                      <Car size={14} className="text-jaecoo-electric" /> {mk}
                      <span className="text-xs font-normal text-jaecoo-muted">
                        ({Object.values(models).flat().length})
                      </span>
                    </span>
                    {openMakes[mk]
                      ? <ChevronDown size={15} className="text-jaecoo-muted" />
                      : <ChevronRight size={15} className="text-jaecoo-muted" />}
                  </button>

                  {/* Models + versions */}
                  {openMakes[mk] && (
                    <div className="bg-jaecoo-elevated/50">
                      {Object.entries(models).sort(([a], [b]) => a.localeCompare(b)).map(([mod, vers]) => (
                        <div key={mod} className="px-5 py-2 border-t border-jaecoo-border/50">
                          <p className="text-xs font-semibold text-jaecoo-secondary mb-1.5">{mod}</p>
                          <div className="space-y-1">
                            {vers.map(v => (
                              <div key={v.id} className="flex items-center justify-between group">
                                <span className="text-xs text-jaecoo-muted pl-2 border-l border-jaecoo-border">
                                  {v.version}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(v)}
                                  className="opacity-0 group-hover:opacity-100 text-jaecoo-danger hover:text-jaecoo-danger
                                    transition-all p-1 rounded-lg hover:bg-jaecoo-danger/10"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-jaecoo-muted">
          Los cambios son visibles para todos los usuarios en el formulario de registro.
        </p>
      </div>
    </div>
  )
}

// ── Página principal ─────────────────────────────────────────────────────────
export default function CatalogAdmin() {
  const [adminPwd, setAdminPwd] = useState<string | null>(
    () => sessionStorage.getItem(SESSION_KEY)
  )

  const handleAuth = (pwd: string) => setAdminPwd(pwd)

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAdminPwd(null)
  }

  if (!adminPwd) return <AdminLogin onAuth={handleAuth} />
  return <AdminPanel adminPwd={adminPwd} onLogout={handleLogout} />
}
