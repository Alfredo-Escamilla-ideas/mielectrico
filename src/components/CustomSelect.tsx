import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
  separator?: boolean
}

export interface CustomSelectProps {
  value: string
  onChange: (v: string) => void
  options: string[] | SelectOption[]
  placeholder: string
  disabled?: boolean
}

function normalize(options: CustomSelectProps['options']): SelectOption[] {
  return (options as (string | SelectOption)[]).map(o =>
    typeof o === 'string' ? { value: o, label: o } : o
  )
}

export default function CustomSelect({
  value, onChange, options, placeholder, disabled = false,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const normalized = normalize(options)
  const selected = normalized.find(o => o.value === value)

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  const base = `w-full rounded-xl border px-4 py-3 text-sm text-left flex items-center
    justify-between transition-all duration-150`

  const triggerCls = disabled
    ? `${base} border-jaecoo-border bg-jaecoo-elevated text-jaecoo-muted opacity-40 cursor-not-allowed`
    : open
      ? `${base} border-jaecoo-electric ring-2 ring-jaecoo-electric/20 bg-jaecoo-elevated cursor-pointer`
      : `${base} border-jaecoo-border bg-jaecoo-elevated hover:border-jaecoo-border-strong cursor-pointer`

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(o => !o)}
        className={triggerCls}
      >
        <span className={value ? 'text-jaecoo-primary' : 'text-jaecoo-muted'}>
          {selected?.label || placeholder}
        </span>
        <ChevronDown
          size={15}
          className={`text-jaecoo-muted flex-shrink-0 ml-2 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-1.5 rounded-xl border border-jaecoo-border-strong
          bg-jaecoo-card shadow-j-elevated overflow-hidden max-h-52 overflow-y-auto animate-fade-in">
          {normalized.length === 0 ? (
            <p className="px-4 py-3 text-sm text-jaecoo-muted">Sin opciones</p>
          ) : (
            normalized.map((opt, i) => opt.separator ? (
              <div key={i} className="border-t border-jaecoo-border my-1" />
            ) : (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className={`w-full px-4 py-2.5 text-sm text-left transition-colors
                  ${value === opt.value
                    ? 'bg-jaecoo-electric/10 text-jaecoo-electric font-medium'
                    : 'text-jaecoo-secondary hover:bg-jaecoo-elevated hover:text-jaecoo-primary'}`}
              >
                {opt.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
