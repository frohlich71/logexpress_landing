import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, ArrowRight, MapPin, Star } from 'lucide-react'
import { whatsappLink, site } from '../data/site'

const badges = [
  { titulo: `+${site.anosMercado} anos`, sub: 'de mercado' },
  { titulo: 'R$ 12,00', sub: 'preço único' },
  { titulo: 'Sem encargos', sub: 'zero vínculo' },
  { titulo: 'Até 24h', sub: 'na entrega' },
]

export default function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* brilhos da marca */}
      <div className="absolute -top-40 right-10 -z-30 h-[36rem] w-[36rem] rounded-full bg-brand-400/15 blur-3xl" />
      <div className="absolute -bottom-40 -left-20 -z-30 h-[30rem] w-[30rem] rounded-full bg-brand-500/10 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative">
          {/* ilustração vetorial (SVG) no vão à direita do título */}
          <motion.img
            src="/hero-vector.svg"
            alt=""
            aria-hidden="true"
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute right-0 top-24 -z-10 w-24 select-none sm:w-28 lg:top-28 lg:w-32 xl:w-40"
          />
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-sm font-medium text-fg-muted shadow-sm"
          >
            <MapPin className="h-4 w-4 text-accent" />
            São Paulo &amp; toda a Grande SP
          </motion.span>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl"
          >
            Entregas ágeis para{' '}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">farmácias</span>
              <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-brand-300/70" />
            </span>{' '}
            e laboratórios
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted"
          >
            Moto-fretamento especializado em entregas de pequeno porte e resultados de
            exames. Baixo custo, pontualidade e pronto atendimento — há mais de{' '}
            {site.anosMercado} anos no mercado.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-400 px-7 py-3.5 text-base font-semibold text-ink-950 shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5 hover:bg-brand-300"
            >
              <MessageCircle className="h-5 w-5" />
              Solicitar orçamento
            </a>
            <a
              href="#planos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong bg-card px-7 py-3.5 text-base font-semibold text-fg transition-colors hover:border-line-strong hover:bg-card-2"
            >
              Ver planos
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex items-center gap-3 text-sm text-fg-subtle"
          >
            <div className="flex text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span>Referência entre farmácias de manipulação e laboratórios de SP</span>
          </motion.div>
        </div>

        {/* Card de destaque */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="rounded-3xl border border-line bg-card/90 p-6 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-fg-subtle">Preço por entrega</p>
              <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
                SP + Grande SP
              </span>
            </div>
            <div className="mt-2 flex items-end gap-2">
              <span className="font-display text-5xl font-bold text-fg">R$ 11</span>
              <span className="mb-1.5 text-lg font-semibold text-fg-faint">,00</span>
            </div>
            <p className="mt-1 text-sm text-fg-subtle">Valor único, sem surpresas.</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {badges.map((b) => (
                <div
                  key={b.titulo}
                  className="rounded-2xl border border-line bg-card-2 p-4"
                >
                  <p className="font-display text-lg font-bold text-fg">{b.titulo}</p>
                  <p className="text-xs font-medium text-fg-subtle">{b.sub}</p>
                </div>
              ))}
            </div>

            <a
              href="#cobertura"
              className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-inverse py-3 text-sm font-semibold text-inverse-fg transition-colors hover:bg-inverse/90"
            >
              <MapPin className="h-4 w-4 text-brand-400" />
              Ver área de cobertura
            </a>
          </div>

          {/* selo flutuante */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-line bg-card px-4 py-3 shadow-lg sm:block"
          >
            <p className="font-display text-sm font-bold text-fg">Entrega em D+1</p>
            <p className="text-xs text-fg-subtle">na maior parte da capital</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
