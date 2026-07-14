import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={(e) => toggle({ x: e.clientX, y: e.clientY })}
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      title={isDark ? 'Tema claro' : 'Tema escuro'}
      className={`grid h-10 w-10 place-items-center rounded-full border border-line bg-card text-fg transition-colors hover:border-line-strong ${className}`}
    >
      {isDark ? (
        <Sun className="h-[18px] w-[18px] text-brand-400" />
      ) : (
        <Moon className="h-[18px] w-[18px]" />
      )}
    </button>
  )
}
