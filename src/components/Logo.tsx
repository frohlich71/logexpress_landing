interface LogoProps {
  className?: string
  variant?: 'dark' | 'light'
}

/** Wordmark LOG (ink) + EXPRESS (amarelo) com ícone de entrega. */
export default function Logo({ className = '', variant = 'dark' }: LogoProps) {
  const logColor = variant === 'light' ? '#ffffff' : 'var(--fg)'
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-400 shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          {/* moto entregador simplificado */}
          <path
            d="M3 16.5h2.2M18.8 16.5H21"
            stroke="#0E0E10"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="6.4" cy="17.6" r="2.4" stroke="#0E0E10" strokeWidth="1.6" />
          <circle cx="17.6" cy="17.6" r="2.4" stroke="#0E0E10" strokeWidth="1.6" />
          <path
            d="M6.4 17.6 10 11h4l2.2 4.4"
            stroke="#0E0E10"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <rect x="9.4" y="5.4" width="5" height="5" rx="1" stroke="#0E0E10" strokeWidth="1.6" />
        </svg>
      </span>
      <span
        className="font-display text-xl font-bold tracking-tight"
        style={{ color: logColor }}
      >
        LOG<span className="text-accent">EXPRESS</span>
      </span>
    </span>
  )
}
