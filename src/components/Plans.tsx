import { Check, MessageCircle } from 'lucide-react'
import { plans, planNotes } from '../data/plans'
import { whatsappLink } from '../data/site'
import Reveal from './Reveal'

export default function Plans() {
  return (
    <section id="planos" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Planos e valores
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
            Quanto mais entregas, menor o custo por entrega
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            Valores fixos para regiões metropolitanas de SP. Escolha o pacote que
            acompanha o volume da sua operação.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p, i) => (
            <Reveal key={p.entregas} delay={i * 0.06}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-6 transition-all hover:-translate-y-1 ${
                  p.destaque
                    ? 'border-brand-400 bg-ink-950 text-white shadow-2xl'
                    : 'border-ink-100 bg-white hover:shadow-xl'
                }`}
              >
                {p.economia && (
                  <span
                    className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-bold ${
                      p.destaque
                        ? 'bg-brand-400 text-ink-950'
                        : 'bg-ink-950 text-white'
                    }`}
                  >
                    {p.economia}
                  </span>
                )}
                <p
                  className={`text-sm font-semibold ${p.destaque ? 'text-brand-300' : 'text-ink-500'}`}
                >
                  {p.entregas} entregas / mês
                </p>
                <div className="mt-3 flex items-end gap-1">
                  <span className={`text-sm ${p.destaque ? 'text-white/60' : 'text-ink-400'}`}>
                    R$
                  </span>
                  <span className="font-display text-4xl font-bold">{p.unitario}</span>
                  <span className={`mb-1 text-sm ${p.destaque ? 'text-white/60' : 'text-ink-400'}`}>
                    / entrega
                  </span>
                </div>
                <p className={`mt-1 text-sm ${p.destaque ? 'text-white/70' : 'text-ink-500'}`}>
                  Pacote mensal de R$ {p.total}
                </p>

                <ul className="mt-5 space-y-2 text-sm">
                  {['Preço fixo garantido', 'SP e Grande SP', 'Sem vínculo trabalhista'].map(
                    (f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check
                          className={`h-4 w-4 ${p.destaque ? 'text-brand-400' : 'text-brand-600'}`}
                        />
                        <span className={p.destaque ? 'text-white/80' : 'text-ink-600'}>
                          {f}
                        </span>
                      </li>
                    ),
                  )}
                </ul>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-colors ${
                    p.destaque
                      ? 'bg-brand-400 text-ink-950 hover:bg-brand-300'
                      : 'bg-ink-950 text-white hover:bg-ink-800'
                  }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  Contratar
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <ul className="mx-auto max-w-3xl space-y-1.5 rounded-2xl border border-ink-100 bg-ink-50/50 p-5 text-sm text-ink-500">
            {planNotes.map((n) => (
              <li key={n} className="flex gap-2">
                <span className="text-brand-500">•</span>
                {n}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
