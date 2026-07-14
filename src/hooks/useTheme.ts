import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

function currentTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.getAttribute('data-theme') === 'light'
    ? 'light'
    : 'dark'
}

/**
 * Lê/alterna o tema. O tema é aplicado no <html data-theme> ainda no index.html
 * (antes da pintura), então aqui só espelhamos e persistimos. A troca usa a
 * View Transitions API para revelar o novo tema em um círculo a partir do clique.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  useEffect(() => {
    setTheme(currentTheme())
  }, [])

  const apply = useCallback((next: Theme) => {
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* ignore */
    }
    setTheme(next)
  }, [])

  const toggle = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'

      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const supportsVT = 'startViewTransition' in document

      if (!supportsVT || prefersReduced) {
        apply(next)
        return
      }

      const x = origin?.x ?? window.innerWidth / 2
      const y = origin?.y ?? window.innerHeight / 2
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      )

      const transition = document.startViewTransition(() => apply(next))

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 480,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
    },
    [apply],
  )

  return { theme, toggle }
}
