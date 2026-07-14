import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react'
import Logo from './Logo'
import { site, whatsappLink } from '../data/site'

const links = [
  { href: '#vantagens', label: 'Vantagens' },
  { href: '#cobertura', label: 'Cobertura' },
  { href: '#planos', label: 'Planos' },
  { href: '#parceiros', label: 'Parceiros' },
  { href: '#contato', label: 'Contato' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-card">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-subtle">
              Grupo Logística Express — moto-fretamento especializado em entregas de
              pequeno porte e resultados de exames para clínicas, laboratórios e farmácias
              de manipulação. Há mais de {site.anosMercado} anos no mercado.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-fg-subtle">
              <MapPin className="h-4 w-4 text-accent" />
              São Paulo (Capital) e toda a Grande SP
            </p>
          </div>

          <div>
            <p className="font-display text-sm font-bold text-fg">Navegação</p>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-fg-subtle transition-colors hover:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-bold text-fg">Contato</p>
            <ul className="mt-4 space-y-2.5 text-sm text-fg-subtle">
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-fg"
                >
                  <MessageCircle className="h-4 w-4 text-accent" />
                  {site.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={site.telefoneLink}
                  className="inline-flex items-center gap-2 transition-colors hover:text-fg"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  {site.telefone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-fg"
                >
                  <Mail className="h-4 w-4 text-accent" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-sm text-fg-faint sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.nome} — {site.slogan}. Todos os direitos
            reservados.
          </p>
          <p>Feito para entregar com pontualidade.</p>
        </div>
      </div>
    </footer>
  )
}
