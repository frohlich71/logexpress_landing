import { advantages } from '../data/advantages'
import Reveal from './Reveal'

export default function Advantages() {
  return (
    <section id="vantagens" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Vantagens LogExpress
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            Logística que reduz custo e não deixa você na mão
          </h2>
          <p className="mt-4 text-lg text-fg-muted">
            Tudo o que a sua farmácia ou laboratório precisa para entregar com
            previsibilidade e sem dor de cabeça.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => {
            const Icon = a.icon
            return (
              <Reveal key={a.titulo} delay={i * 0.06}>
                <div className="group h-full rounded-3xl border border-line bg-card p-7 transition-all hover:-translate-y-1 hover:border-brand-400/40 hover:shadow-xl">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-400 group-hover:text-ink-950">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display mt-5 text-xl font-bold text-fg">
                    {a.titulo}
                  </h3>
                  <p className="mt-2 text-fg-muted">{a.descricao}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
