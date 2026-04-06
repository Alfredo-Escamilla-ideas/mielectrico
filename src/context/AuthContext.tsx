import React, { createContext, useContext, useState } from 'react'
import { apiLogin, apiRegister } from '../services/api'

interface AuthState {
  token: string | null
  plate: string | null
  vehicleModel: string | null
  initialOdometer: number | null
  initialBatteryPct: number | null
  initialFuelLiters: number | null
  createdAt: string | null
}

interface AuthContextValue extends AuthState {
  isAuthenticated: boolean
  login: (plate: string, password: string) => Promise<void>
  register: (plate: string, password: string, model: string, initialOdometer: number, initialBatteryPct: number, initialFuelLiters: number) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function loadAuth(): AuthState {
  const raw = localStorage.getItem('consumo_initial_odometer')
  return {
    token:              localStorage.getItem('consumo_token'),
    plate:              localStorage.getItem('consumo_plate'),
    vehicleModel:       localStorage.getItem('consumo_model'),
    initialOdometer:    raw !== null ? parseInt(raw, 10) : null,
    initialBatteryPct:  parseInt(localStorage.getItem('consumo_battery_pct') ?? '', 10) || null,
    initialFuelLiters:  parseFloat(localStorage.getItem('consumo_fuel_liters') ?? '') || null,
    createdAt:          localStorage.getItem('consumo_created_at'),
  }
}

function saveAuth(state: AuthState) {
  if (state.token)        localStorage.setItem('consumo_token',           state.token)
  if (state.plate)        localStorage.setItem('consumo_plate',           state.plate)
  if (state.vehicleModel) localStorage.setItem('consumo_model',           state.vehicleModel)
  if (state.initialOdometer   !== null) localStorage.setItem('consumo_initial_odometer', String(state.initialOdometer))
  if (state.initialBatteryPct !== null) localStorage.setItem('consumo_battery_pct',      String(state.initialBatteryPct))
  if (state.initialFuelLiters !== null) localStorage.setItem('consumo_fuel_liters',      String(state.initialFuelLiters))
  if (state.createdAt)    localStorage.setItem('consumo_created_at',      state.createdAt)
}

function clearAuth() {
  ['consumo_token', 'consumo_plate', 'consumo_model',
   'consumo_initial_odometer', 'consumo_battery_pct', 'consumo_fuel_liters', 'consumo_created_at',
   'consumo_data', 'consumo_sha', 'consumo_github_token',
  ].forEach(k => localStorage.removeItem(k))
}

function stateFromResponse(res: ReturnType<typeof apiLogin> extends Promise<infer T> ? T : never): AuthState {
  return {
    token:              res.token,
    plate:              res.plate,
    vehicleModel:       res.vehicle_model,
    initialOdometer:    res.initial_odometer ?? null,
    initialBatteryPct:  res.initial_battery_pct ?? null,
    initialFuelLiters:  res.initial_fuel_liters ?? null,
    createdAt:          res.created_at ?? null,
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(loadAuth)

  const login = async (plate: string, password: string) => {
    const res = await apiLogin(plate, password)
    const state = stateFromResponse(res)
    saveAuth(state)
    setAuth(state)
  }

  const register = async (plate: string, password: string, model: string, initialOdometer: number, initialBatteryPct: number, initialFuelLiters: number) => {
    const res = await apiRegister(plate, password, model, initialOdometer, initialBatteryPct, initialFuelLiters)
    const state = stateFromResponse(res)
    saveAuth(state)
    setAuth(state)
  }

  const logout = () => {
    clearAuth()
    setAuth({ token: null, plate: null, vehicleModel: null, initialOdometer: null, initialBatteryPct: null, initialFuelLiters: null, createdAt: null })
  }

  return (
    <AuthContext.Provider value={{ ...auth, isAuthenticated: !!auth.token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
