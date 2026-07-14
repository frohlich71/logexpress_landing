import { useEffect, useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { whatsappLink } from '../data/site'

const links = [
  { href: '#vantagens', label: 'Vantagens' },
  { href: '#cobertura', label: 'Cobertura' },
  { href: '#planos', label: 'Planos' },
  { href: '#parceiros', label: 'Parceiros' },
  { href: '#contato', label: 'Contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-line bg-bg/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" aria-label="LogExpress — início">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-fg-muted transition-colors hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-inverse px-5 py-2.5 text-sm font-semibold text-inverse-fg shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-inverse/90"
          >
            <MessageCircle className="h-4 w-4" />
            Solicitar orçamento
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="grid h-10 w-10 place-items-center rounded-lg text-fg"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-bg md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 text-sm font-medium text-fg-muted"
              >
                {l.label}
              </a>
            ))}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-inverse px-5 py-3 text-sm font-semibold text-inverse-fg"
            >
              <MessageCircle className="h-4 w-4" />
              Solicitar orçamento
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
