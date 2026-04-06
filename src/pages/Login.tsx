import { useState, useEffect, useMemo } from 'react'
import { Zap, Loader2, Eye, EyeOff, ChevronRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { apiGetCustomCatalog } from '../services/api'
import type { CustomVehicle } from '../services/api'
import CustomSelect from '../components/CustomSelect'

// ── Login page ───────────────────────────────────────────────────────────────

export default function Login() {
  const { login, register } = useAuth()
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [plate, setPlate] = useState('')
  const [password, setPassword] = useState('')
  const [selectedMake, setSelectedMake] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedVersion, setSelectedVersion] = useState('')
  const [initialOdometer, setInitialOdometer] = useState('')
  const [initialBattery, setInitialBattery] = useState('100')
  const [initialFuel, setInitialFuel] = useState('60')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [allVehicles, setAllVehicles] = useState<CustomVehicle[]>([])

  useEffect(() => {
    if (tab === 'register') {
      apiGetCustomCatalog().then(setAllVehicles).catch(() => {})
    }
  }, [tab])

  const catalog = useMemo(() => {
    const map: Record<string, Record<string, string[]>> = {}
    for (const cv of allVehicles) {
      map[cv.make] ??= {}
      map[cv.make][cv.model] ??= []
      if (!map[cv.make][cv.model].includes(cv.version)) {
        map[cv.make][cv.model].push(cv.version)
      }
    }
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([make, models]) => ({
        make,
        models: Object.entries(models)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([name, versions]) => ({ name, versions: [...versions].sort() })),
      }))
  }, [allVehicles])

  const makeEntry    = catalog.find(m => m.make === selectedMake)
  const modelEntries = makeEntry?.models ?? []
  const modelEntry   = modelEntries.find(m => m.name === selectedModel)
  const versions     = modelEntry?.versions ?? []

  const handleMakeChange = (make: string) => {
    setSelectedMake(make)
    setSelectedModel('')
    setSelectedVersion('')
  }

  const handleModelChange = (model: string) => {
    setSelectedModel(model)
    setSelectedVersion('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!plate.trim() || !password.trim()) {
      setError('Introduce matrícula y contraseña')
      return
    }
    if (tab === 'register') {
      if (!selectedMake || !selectedModel) {
        setError('Selecciona la marca y el modelo del vehículo')
        return
      }
      if (versions.length > 0 && !selectedVersion) {
        setError('Selecciona la versión del vehículo')
        return
      }
    }
    setLoading(true)
    try {
      if (tab === 'login') {
        await login(plate, password)
      } else {
        const vehicleModel = [selectedMake, selectedModel, selectedVersion].filter(Boolean).join(' ')
        await register(
          plate,
          password,
          vehicleModel,
          parseInt(initialOdometer || '0', 10),
          parseInt(initialBattery || '100', 10),
          parseFloat(initialFuel || '60'),
        )
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const inp = `w-full rounded-lg border border-jaecoo-border bg-jaecoo-base/60 px-4 py-3 text-sm text-jaecoo-primary
    focus:outline-none focus:border-jaecoo-electric focus:ring-2 focus:ring-jaecoo-electric/20
    transition-all placeholder:text-jaecoo-muted`

  return (
    <div className="min-h-screen bg-jaecoo-base flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background: diagonal grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(34,211,238,0.05)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Background: glow orbs */}
      <div className="absolute pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-jaecoo-electric/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-jaecoo-electric/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-72 h-72 rounded-full bg-jaecoo-fuel/8 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm animate-fade-in">

        {/* Header branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-5 relative">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-3xl bg-jaecoo-electric/20 blur-md animate-pulse-glow" />
            <div className="relative w-full h-full bg-gradient-to-br from-jaecoo-electric/30 to-jaecoo-electric/10 border border-jaecoo-electric/40 rounded-3xl flex items-center justify-center shadow-j-electric">
              <Zap size={34} className="text-jaecoo-electric fill-jaecoo-electric/30" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-jaecoo-primary tracking-tight">Mi Eléctrico</h1>
          <p className="text-jaecoo-muted text-sm mt-1.5">
            Seguimiento de consumo · EV · PHEV · Híbrido
          </p>
        </div>

        {/* Card */}
        <div className="bg-jaecoo-card/80 backdrop-blur-sm border border-jaecoo-border-strong rounded-2xl shadow-j-elevated overflow-hidden">

          {/* Tabs */}
          <div className="flex bg-jaecoo-base/40 border-b border-jaecoo-border">
            {(['login', 'register'] as const).map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setError('') }}
                className={`flex-1 py-4 text-sm font-semibold transition-all relative
                  ${tab === t
                    ? 'text-jaecoo-electric'
                    : 'text-jaecoo-muted hover:text-jaecoo-secondary'}`}
              >
                {t === 'login' ? 'Iniciar sesión' : 'Registrarse'}
                {tab === t && (
                  <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-jaecoo-electric rounded-full" />
                )}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">

            {/* Plate */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-jaecoo-muted uppercase tracking-wider">
                Matrícula
              </label>
              <input
                type="text"
                placeholder="1234-BCD"
                value={plate}
                onChange={e => setPlate(e.target.value.toUpperCase().replace(/\s/g, ''))}
                maxLength={10}
                className={`${inp} font-mono font-bold tracking-widest uppercase text-base`}
                autoComplete="username"
                autoFocus
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-jaecoo-muted uppercase tracking-wider">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Mínimo 4 caracteres"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`${inp} pr-11`}
                  autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-jaecoo-muted hover:text-jaecoo-secondary transition-colors p-0.5"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Register-only fields */}
            {tab === 'register' && (
              <div className="space-y-4 pt-1">

                {/* Vehicle selector group */}
                <div className="rounded-xl border border-jaecoo-border bg-jaecoo-elevated/60 p-4 space-y-3">
                  <p className="text-xs font-semibold text-jaecoo-electric uppercase tracking-wider flex items-center gap-1.5">
                    <Zap size={11} className="fill-jaecoo-electric/40" />
                    Tu vehículo
                  </p>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-jaecoo-muted">Marca</label>
                    <CustomSelect
                      value={selectedMake}
                      onChange={handleMakeChange}
                      options={catalog.map(m => m.make)}
                      placeholder="Selecciona marca…"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-jaecoo-muted">Modelo</label>
                    <CustomSelect
                      value={selectedModel}
                      onChange={handleModelChange}
                      options={modelEntries.map(m => m.name)}
                      placeholder={selectedMake ? 'Selecciona modelo…' : 'Primero selecciona marca'}
                      disabled={!selectedMake}
                    />
                  </div>

                  {selectedModel && versions.length > 0 && (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-jaecoo-muted">Versión</label>
                      <CustomSelect
                        value={selectedVersion}
                        onChange={setSelectedVersion}
                        options={versions}
                        placeholder="Selecciona versión…"
                      />
                    </div>
                  )}
                </div>

                {/* Initial state group */}
                <div className="rounded-xl border border-jaecoo-border bg-jaecoo-elevated/60 p-4 space-y-3">
                  <p className="text-xs font-semibold text-jaecoo-muted uppercase tracking-wider">
                    Estado inicial
                  </p>
                  <p className="text-xs text-jaecoo-muted/70">
                    Para mayor precisión, regístrate con batería al 100% y depósito lleno.
                  </p>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-jaecoo-muted">Kilómetros actuales</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="Ej. 12500"
                      value={initialOdometer}
                      onChange={e => setInitialOdometer(e.target.value)}
                      className={inp}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-jaecoo-muted">Batería (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="100"
                        value={initialBattery}
                        onChange={e => setInitialBattery(e.target.value)}
                        className={inp}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-jaecoo-muted">Combustible (L)</label>
                      <input
                        type="number"
                        min="0"
                        max="200"
                        step="0.5"
                        placeholder="43"
                        value={initialFuel}
                        onChange={e => setInitialFuel(e.target.value)}
                        className={inp}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-jaecoo-danger/10 border border-jaecoo-danger/30 rounded-lg px-4 py-3 text-sm text-jaecoo-danger flex items-start gap-2">
                <span className="mt-0.5 shrink-0">⚠</span>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-jaecoo-electric hover:brightness-110 active:scale-[0.98] disabled:opacity-50
                text-jaecoo-base font-bold rounded-xl py-3.5 text-sm transition-all
                flex items-center justify-center gap-2 mt-2 shadow-j-electric"
            >
              {loading
                ? <Loader2 size={16} className="animate-spin" />
                : <ChevronRight size={16} />
              }
              {tab === 'login' ? 'Entrar' : 'Crear cuenta'}
            </button>

            {tab === 'register' && (
              <p className="text-xs text-jaecoo-muted/70 text-center pt-1">
                La matrícula es tu identificador único — cada vehículo tiene sus datos aislados.
              </p>
            )}
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-jaecoo-muted/50 mt-6">
          Mi Eléctrico · Seguimiento de vehículos electrificados
        </p>
      </div>
    </div>
  )
}
