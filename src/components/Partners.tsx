import { partners } from '../data/partners'
import Reveal from './Reveal'

function Chip({ name }: { name: string }) {
  return (
    <div className="mx-3 flex h-16 shrink-0 items-center justify-center rounded-2xl border border-ink-100 bg-white px-6 shadow-sm">
      <span className="font-display whitespace-nowrap text-lg font-semibold text-ink-700">
        {name}
      </span>
    </div>
  )
}

export default function Partners() {
  return (
    <section id="parceiros" className="border-y border-ink-100 bg-ink-50/40 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Nossos parceiros
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
            Farmácias e laboratórios que confiam na LogExpress
          </h2>
        </Reveal>
      </div>

      {/* Marquee em dois trilhos */}
      <div className="relative mt-12 flex flex-col gap-4 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-50/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-50/80 to-transparent" />

        <div className="flex w-max animate-marquee">
          {[...partners, ...partners].map((p, i) => (
            <Chip key={`a-${i}`} name={p} />
          ))}
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-ink-400">
        E muitas outras empresas em toda a Grande São Paulo.
      </p>
    </section>
  )
}
