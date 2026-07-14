import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, ArrowRight, MapPin, Star } from 'lucide-react'
import { whatsappLink, site } from '../data/site'

const badges = [
  { titulo: `+${site.anosMercado} anos`, sub: 'de mercado' },
  { titulo: 'R$ 11,00', sub: 'preço único' },
  { titulo: 'Sem encargos', sub: 'zero vínculo' },
  { titulo: 'Até 24h', sub: 'na entrega' },
]

export default function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* fundo */}
      <div className="bg-grid absolute inset-0 -z-10 opacity-70" />
      <div className="absolute -top-40 right-0 -z-10 h-[36rem] w-[36rem] rounded-full bg-brand-200/50 blur-3xl" />
      <div className="absolute -bottom-40 -left-20 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand-100/60 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-white px-4 py-1.5 text-sm font-medium text-ink-600 shadow-sm"
          >
            <MapPin className="h-4 w-4 text-brand-500" />
            São Paulo &amp; toda a Grande SP
          </motion.span>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-ink-950 sm:text-5xl lg:text-6xl"
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
            className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600"
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
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-7 py-3.5 text-base font-semibold text-ink-900 transition-colors hover:border-ink-300 hover:bg-ink-50"
            >
              Ver planos
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex items-center gap-3 text-sm text-ink-500"
          >
            <div className="flex text-brand-500">
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
          <div className="rounded-3xl border border-ink-100 bg-white/90 p-6 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink-500">Preço por entrega</p>
              <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
                SP + Grande SP
              </span>
            </div>
            <div className="mt-2 flex items-end gap-2">
              <span className="font-display text-5xl font-bold text-ink-950">R$ 11</span>
              <span className="mb-1.5 text-lg font-semibold text-ink-400">,00</span>
            </div>
            <p className="mt-1 text-sm text-ink-500">Valor único, sem surpresas.</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {badges.map((b) => (
                <div
                  key={b.titulo}
                  className="rounded-2xl border border-ink-100 bg-ink-50/60 p-4"
                >
                  <p className="font-display text-lg font-bold text-ink-950">{b.titulo}</p>
                  <p className="text-xs font-medium text-ink-500">{b.sub}</p>
                </div>
              ))}
            </div>

            <a
              href="#cobertura"
              className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-ink-950 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-800"
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
            className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-ink-100 bg-white px-4 py-3 shadow-lg sm:block"
          >
            <p className="font-display text-sm font-bold text-ink-950">Entrega em D+1</p>
            <p className="text-xs text-ink-500">na maior parte da capital</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
