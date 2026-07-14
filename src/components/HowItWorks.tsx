import { PackageCheck, Bike, MapPinned, BellRing } from 'lucide-react'
import Reveal from './Reveal'

const steps = [
  {
    icon: PackageCheck,
    titulo: 'Retirada agendada',
    descricao: 'Coletamos na sua farmácia a partir das 16h, no horário combinado.',
  },
  {
    icon: Bike,
    titulo: 'Transporte dedicado',
    descricao: 'Motoboys treinados levam seus pedidos com cuidado e agilidade.',
  },
  {
    icon: MapPinned,
    titulo: 'Entrega em até 24h',
    descricao: 'Do momento da retirada — D+1 na maior parte de São Paulo.',
  },
  {
    icon: BellRing,
    titulo: 'Você fica informado',
    descricao: 'Qualquer ocorrência é comunicada à sua empresa na hora.',
  },
]

export default function HowItWorks() {
  return (
    <section className="relative bg-ink-950 py-20 text-white md:py-28">
      <div className="bg-grid absolute inset-0 opacity-[0.06]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Como funciona
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Da coleta à entrega em 4 passos simples
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.titulo} delay={i * 0.08}>
                <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <span className="font-display absolute right-5 top-4 text-5xl font-bold text-white/5">
                    {i + 1}
                  </span>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-400 text-ink-950">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display mt-5 text-lg font-bold">{s.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {s.descricao}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
