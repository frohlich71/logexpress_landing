import { QRCodeSVG } from 'qrcode.react'
import { Phone, Mail, MessageCircle, ArrowUpRight } from 'lucide-react'
import { site, whatsappLink } from '../data/site'
import Reveal from './Reveal'

const canais = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    valor: site.whatsapp,
    href: whatsappLink,
    external: true,
  },
  {
    icon: Phone,
    label: 'Telefone',
    valor: site.telefone,
    href: site.telefoneLink,
    external: false,
  },
  {
    icon: Mail,
    label: 'E-mail',
    valor: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
]

export default function Contact() {
  return (
    <section id="contato" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-feature px-6 py-12 text-feature-fg sm:px-12 md:py-16">
            <div className="bg-grid absolute inset-0 opacity-[0.06]" />
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  Pronto para reduzir o custo das suas entregas?
                </h2>
                <p className="mt-4 max-w-lg text-lg text-white/70">
                  Fale com a LogExpress e receba um orçamento sob medida para o volume da
                  sua farmácia ou laboratório. Atendimento em toda a Grande SP.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {canais.map((c) => {
                    const Icon = c.icon
                    return (
                      <a
                        key={c.label}
                        href={c.href}
                        target={c.external ? '_blank' : undefined}
                        rel={c.external ? 'noreferrer' : undefined}
                        className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-brand-400/50 hover:bg-white/10"
                      >
                        <div className="flex items-center justify-between">
                          <Icon className="h-5 w-5 text-brand-400" />
                          <ArrowUpRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                        <p className="mt-3 text-xs font-medium uppercase tracking-wide text-white/50">
                          {c.label}
                        </p>
                        <p className="mt-0.5 text-sm font-semibold">{c.valor}</p>
                      </a>
                    )
                  })}
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-400 px-7 py-3.5 text-base font-semibold text-ink-950 shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5 hover:bg-brand-300"
                >
                  <MessageCircle className="h-5 w-5" />
                  Solicitar orçamento agora
                </a>
              </div>

              {/* QR code */}
              <div className="flex flex-col items-center">
                <div className="rounded-3xl bg-white p-5 shadow-2xl">
                  <QRCodeSVG
                    value={whatsappLink}
                    size={168}
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#0e0e10"
                  />
                </div>
                <p className="mt-4 text-center text-sm text-white/60">
                  Aponte a câmera e fale
                  <br />
                  com a gente no WhatsApp
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
