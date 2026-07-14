import { useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Search, MapPin, Clock, CheckCircle2, XCircle } from 'lucide-react'
import Reveal from './Reveal'
import {
  zones,
  cepRanges,
  lookupCep,
  type ZoneId,
  type CepRange,
} from '../data/ceps'

interface ShapeDef {
  id: ZoneId
  d: string
  cx: number
  cy: number
}

// Mapa low-poly estilizado da Região Metropolitana de SP.
// Layout espelha o mapa do PDF: norte (topo), oeste (esq.), capital (centro),
// leste (dir.), sudoeste (inf. esq.), sudeste/ABC (inf. centro-dir.).
const shapes: ShapeDef[] = [
  { id: 'norte', cx: 385, cy: 115, d: 'M 250 70 L 380 48 L 500 70 L 545 140 L 470 176 L 360 182 L 300 166 L 240 132 Z' },
  { id: 'oeste', cx: 232, cy: 262, d: 'M 132 202 L 300 178 L 332 232 L 300 302 L 210 342 L 140 300 Z' },
  { id: 'capital', cx: 418, cy: 292, d: 'M 332 200 L 432 190 L 522 240 L 516 332 L 442 392 L 352 382 L 306 300 Z' },
  { id: 'leste', cx: 628, cy: 256, d: 'M 548 140 L 692 150 L 742 250 L 702 360 L 602 382 L 542 320 L 526 230 Z' },
  { id: 'sudoeste', cx: 252, cy: 418, d: 'M 210 342 L 306 306 L 356 386 L 322 482 L 222 520 L 160 430 Z' },
  { id: 'sudeste', cx: 478, cy: 470, d: 'M 356 386 L 446 392 L 602 382 L 622 470 L 522 560 L 402 546 L 342 470 Z' },
]

const zoneById = Object.fromEntries(zones.map((z) => [z.id, z]))

interface MapShapesProps {
  active: ZoneId | null
  selected: ZoneId | null
  mono?: boolean
  onEnter?: (id: ZoneId) => void
  onLeave?: () => void
}

function MapShapes({ active, selected, mono, onEnter, onLeave }: MapShapesProps) {
  return (
    <>
      {shapes.map((s) => {
        const isUp = !mono && (active === s.id || selected === s.id)
        const fill = mono ? '#1f2530' : `var(--color-zone-${s.id})`
        return (
          <path
            key={s.id}
            d={s.d}
            fill={fill}
            stroke={mono ? 'transparent' : 'rgba(255,255,255,0.65)'}
            strokeWidth={mono ? 0 : 2}
            transform={isUp ? 'translate(0,-10)' : undefined}
            onMouseEnter={mono ? undefined : () => onEnter?.(s.id)}
            onMouseLeave={mono ? undefined : onLeave}
            style={{
              cursor: mono ? 'default' : 'pointer',
              transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), filter 0.25s',
              filter: isUp
                ? 'brightness(1.12) drop-shadow(0 10px 12px rgba(0,0,0,0.28))'
                : active || selected
                  ? 'brightness(0.82)'
                  : 'none',
              pointerEvents: mono ? 'none' : 'auto',
            }}
          />
        )
      })}
    </>
  )
}

const DEPTH_LAYERS = 9
const DEPTH_STEP = 3.4

export default function CoverageMap() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<ZoneId | null>(null)
  const [selected, setSelected] = useState<ZoneId | null>(null)
  const [cep, setCep] = useState('')
  const [result, setResult] = useState<CepRange | null | 'notfound'>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const tiltRaw = useTransform(scrollYProgress, [0, 0.5, 1], [60, 51, 44])
  const floatRaw = useTransform(scrollYProgress, [0, 1], [30, -30])
  const tilt = reduce ? 52 : tiltRaw
  const float = reduce ? 0 : floatRaw

  const activeZone = active ? zoneById[active] : null

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const found = lookupCep(cep)
    if (found) {
      setResult(found)
      setSelected(found.zone)
    } else {
      setResult('notfound')
      setSelected(null)
    }
  }

  function formatCep(v: string) {
    const d = v.replace(/\D/g, '').slice(0, 8)
    if (d.length > 5) return `${d.slice(0, 5)}-${d.slice(5)}`
    return d
  }

  return (
    <section id="cobertura" ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-50/60 to-white" />
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Área de atuação
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
            Cobrimos toda a Capital e a Grande São Paulo
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            Passe o mouse pelas regiões ou consulte um CEP para ver o prazo de entrega.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Mapa 3D */}
          <div
            className="relative mx-auto flex h-[320px] w-full max-w-xl items-center justify-center sm:h-[480px]"
            style={{ perspective: '1200px' }}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect()
              setCursor({ x: e.clientX - r.left, y: e.clientY - r.top })
            }}
          >
            <motion.div
              className="relative"
              style={{
                transformStyle: 'preserve-3d',
                rotateX: tilt,
                rotateZ: -8,
                y: float,
              }}
            >
              {/* base / paredes extrudadas */}
              {Array.from({ length: DEPTH_LAYERS }).map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 820 620"
                  className="absolute inset-0 h-full w-full"
                  style={{
                    transform: `translateZ(${-(i + 1) * DEPTH_STEP}px)`,
                    filter: `brightness(${0.35 + (DEPTH_LAYERS - i) * 0.02})`,
                  }}
                >
                  <MapShapes active={null} selected={null} mono />
                </svg>
              ))}

              {/* sombra projetada no "chão" */}
              <svg
                viewBox="0 0 820 620"
                className="absolute inset-0 h-full w-full"
                style={{ transform: `translateZ(${-(DEPTH_LAYERS + 2) * DEPTH_STEP}px)` }}
              >
                <g style={{ filter: 'blur(10px)', opacity: 0.35 }}>
                  <MapShapes active={null} selected={null} mono />
                </g>
              </svg>

              {/* topo interativo */}
              <svg
                viewBox="0 0 820 620"
                className="relative h-auto w-[84vw] max-w-[540px]"
                style={{ overflow: 'visible' }}
              >
                <MapShapes
                  active={active}
                  selected={selected}
                  onEnter={setActive}
                  onLeave={() => setActive(null)}
                />
                {/* rótulos das zonas */}
                {shapes.map((s) => (
                  <text
                    key={s.id}
                    x={s.cx}
                    y={s.cy}
                    textAnchor="middle"
                    className="font-display pointer-events-none select-none"
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      fill: s.id === 'oeste' || s.id === 'capital' ? '#0e0e10' : '#ffffff',
                      opacity: 0.9,
                    }}
                  >
                    {zoneById[s.id].prazoPrincipal}
                  </text>
                ))}
              </svg>
            </motion.div>

            {/* tooltip seguindo o cursor */}
            {activeZone && (
              <div
                className="pointer-events-none absolute z-20 w-56 -translate-x-1/2 -translate-y-full rounded-2xl border border-ink-100 bg-white p-3 shadow-xl"
                style={{ left: cursor.x, top: cursor.y - 12 }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: activeZone.cor }}
                  />
                  <p className="font-display text-sm font-bold text-ink-950">
                    {activeZone.nome}
                  </p>
                </div>
                <p className="mt-1 text-xs text-ink-500">{activeZone.descricao}</p>
                <div className="mt-2 flex items-center gap-3 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1 text-brand-700">
                    <Clock className="h-3.5 w-3.5" />
                    {activeZone.prazoPrincipal}
                  </span>
                  <span className="text-ink-400">R$ 11,00 / entrega</span>
                </div>
              </div>
            )}
          </div>

          {/* Painel lateral: legenda + busca */}
          <div>
            <form onSubmit={onSubmit} className="rounded-3xl border border-ink-100 bg-white p-5 shadow-sm">
              <label className="text-sm font-semibold text-ink-700">Consultar CEP</label>
              <div className="mt-2 flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                  <input
                    value={cep}
                    onChange={(e) => setCep(formatCep(e.target.value))}
                    inputMode="numeric"
                    placeholder="00000-000"
                    className="w-full rounded-xl border border-ink-200 py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-ink-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-ink-800"
                >
                  <Search className="h-4 w-4" />
                  Ver
                </button>
              </div>

              {result === 'notfound' && (
                <div className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    CEP fora das faixas listadas. Fale com a gente pelo WhatsApp para
                    confirmar o atendimento.
                  </span>
                </div>
              )}
              {result && result !== 'notfound' && (
                <div className="mt-3 flex items-start gap-2 rounded-xl bg-brand-50 p-3 text-sm text-ink-800">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  <span>
                    <strong>{result.regiao}</strong> — prazo de entrega{' '}
                    <strong>{result.prazo}</strong>. Preço único de R$ 11,00 por entrega.
                  </span>
                </div>
              )}
            </form>

            {/* Legenda */}
            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {zones.map((z) => (
                <button
                  key={z.id}
                  onMouseEnter={() => setActive(z.id)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setSelected(selected === z.id ? null : z.id)}
                  className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors ${
                    selected === z.id || active === z.id
                      ? 'border-brand-300 bg-brand-50'
                      : 'border-ink-100 bg-white hover:border-ink-200'
                  }`}
                >
                  <span
                    className="h-8 w-8 shrink-0 rounded-lg"
                    style={{ background: z.cor }}
                  />
                  <span>
                    <span className="block text-sm font-semibold text-ink-900">{z.nome}</span>
                    <span className="block text-xs text-ink-500">{z.prazoPrincipal}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabela completa de CEPs */}
        <Reveal className="mt-16">
          <details className="group rounded-3xl border border-ink-100 bg-white">
            <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-left">
              <span className="font-display text-lg font-bold text-ink-950">
                Tabela completa de CEPs e prazos
              </span>
              <span className="text-sm font-medium text-brand-700 group-open:hidden">
                Ver todos
              </span>
              <span className="hidden text-sm font-medium text-brand-700 group-open:inline">
                Recolher
              </span>
            </summary>
            <div className="overflow-x-auto border-t border-ink-100">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-ink-50 text-xs uppercase tracking-wide text-ink-500">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Região</th>
                    <th className="px-6 py-3 font-semibold">CEP inicial</th>
                    <th className="px-6 py-3 font-semibold">CEP final</th>
                    <th className="px-6 py-3 font-semibold">Prazo</th>
                  </tr>
                </thead>
                <tbody>
                  {cepRanges.map((r, i) => (
                    <tr
                      key={`${r.cepInicial}-${i}`}
                      className="border-t border-ink-50 hover:bg-ink-50/50"
                    >
                      <td className="px-6 py-3 font-medium text-ink-800">{r.regiao}</td>
                      <td className="px-6 py-3 tabular-nums text-ink-600">{r.cepInicial}</td>
                      <td className="px-6 py-3 tabular-nums text-ink-600">{r.cepFinal}</td>
                      <td className="px-6 py-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-800">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ background: zoneById[r.zone].cor }}
                          />
                          {r.prazo}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </Reveal>
      </div>
    </section>
  )
}
