interface LogoProps {
  className?: string
}

/** Brasão da família Guedes (vetor traçado, fundo transparente). */
export default function Logo({ className = '' }: LogoProps) {
  return (
    <img
      src="/logo_guedes_traced.svg"
      alt="Guedes"
      className={`h-12 w-auto shrink-0 select-none ${className}`}
      draggable={false}
    />
  )
}
