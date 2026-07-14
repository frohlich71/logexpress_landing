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
import { munis, mapViewBox, zoneLabelPos } from '../data/rmspGeo'

const zoneById = Object.fromEntries(zones.map((z) => [z.id, z]))

interface MapShapesProps {
  active: ZoneId | null
  selected: ZoneId | null
  mono?: boolean
  onEnter?: (zone: ZoneId, nome: string) => void
  onLeave?: () => void
}

// Renderiza os 39 municípios reais da RMSP. Cada município é pintado pela cor
// da sua zona; ao passar o mouse, toda a zona é destacada/elevada em conjunto.
function MapShapes({ active, selected, mono, onEnter, onLeave }: MapShapesProps) {
  return (
    <>
      {munis.map((m) => {
        const isUp = !mono && (active === m.zone || selected === m.zone)
        const fill = mono ? '#1f2530' : `var(--color-zone-${m.zone})`
        return (
          <path
            key={m.id}
            d={m.d}
            fill={fill}
            stroke={mono ? '#1f2530' : 'rgba(255,255,255,0.7)'}
            strokeWidth={mono ? 1 : 1}
            strokeLinejoin="round"
            transform={isUp ? 'translate(0,-9)' : undefined}
            onMouseEnter={mono ? undefined : () => onEnter?.(m.zone, m.nome)}
            onMouseLeave={mono ? undefined : onLeave}
            style={{
              cursor: mono ? 'default' : 'pointer',
              transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), filter 0.25s',
              filter: isUp
                ? 'brightness(1.1) drop-shadow(0 10px 12px rgba(0,0,0,0.28))'
                : active || selected
                  ? 'brightness(0.8)'
                  : 'none',
              pointerEvents: mono ? 'none' : 'auto',
            }}
          />
        )
      })}
    </>
  )
}

const DEPTH_LAYERS = 7
const DEPTH_STEP = 3.2

export default function CoverageMap() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<ZoneId | null>(null)
  const [hoverMuni, setHoverMuni] = useState<string | null>(null)
  const [selected, setSelected] = useState<ZoneId | null>(null)
  const [cep, setCep] = useState('')
  const [result, setResult] = useState<CepRange | null | 'notfound'>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const tiltRaw = useTransform(scrollYProgress, [0, 0.5, 1], [44, 37, 31])
  const floatRaw = useTransform(scrollYProgress, [0, 1], [26, -26])
  const tilt = reduce ? 37 : tiltRaw
  const float = reduce ? 0 : floatRaw

  const activeZone = active ? zoneById[active] : null

  function enterZone(zone: ZoneId, nome: string) {
    setActive(zone)
    setHoverMuni(nome)
  }
  function leaveZone() {
    setActive(null)
    setHoverMuni(null)
  }

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
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-card-2/60 to-bg" />
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Área de atuação
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            Cobrimos toda a Capital e a Grande São Paulo
          </h2>
          <p className="mt-4 text-lg text-fg-muted">
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
                  viewBox={mapViewBox}
                  className="absolute inset-0 h-full w-full"
                  style={{
                    transform: `translateZ(${-(i + 1) * DEPTH_STEP}px)`,
                    filter: `brightness(${0.35 + (DEPTH_LAYERS - i) * 0.025})`,
                  }}
                >
                  <MapShapes active={null} selected={null} mono />
                </svg>
              ))}

              {/* sombra projetada no "chão" */}
              <svg
                viewBox={mapViewBox}
                className="absolute inset-0 h-full w-full"
                style={{ transform: `translateZ(${-(DEPTH_LAYERS + 2) * DEPTH_STEP}px)` }}
              >
                <g style={{ filter: 'blur(10px)', opacity: 0.35 }}>
                  <MapShapes active={null} selected={null} mono />
                </g>
              </svg>

              {/* topo interativo */}
              <svg
                viewBox={mapViewBox}
                className="relative h-auto w-[86vw] max-w-[560px]"
                style={{ overflow: 'visible' }}
              >
                <MapShapes
                  active={active}
                  selected={selected}
                  onEnter={enterZone}
                  onLeave={leaveZone}
                />
                {/* rótulos de prazo por zona */}
                {zones.map((z) => {
                  const pos = zoneLabelPos[z.id]
                  const up = active === z.id || selected === z.id
                  return (
                    <text
                      key={z.id}
                      x={pos.x}
                      y={pos.y + (up ? -9 : 0)}
                      textAnchor="middle"
                      className="font-display pointer-events-none select-none"
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        fill: z.id === 'oeste' || z.id === 'capital' ? '#0e0e10' : '#ffffff',
                        opacity: 0.92,
                        paintOrder: 'stroke',
                        stroke: 'rgba(0,0,0,0.18)',
                        strokeWidth: z.id === 'oeste' || z.id === 'capital' ? 0 : 0.6,
                        transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                      }}
                    >
                      {z.prazoPrincipal}
                    </text>
                  )
                })}
              </svg>
            </motion.div>

            {/* tooltip seguindo o cursor */}
            {activeZone && (
              <div
                className="pointer-events-none absolute z-20 w-56 -translate-x-1/2 -translate-y-full rounded-2xl border border-line bg-card p-3 shadow-xl"
                style={{ left: cursor.x, top: cursor.y - 12 }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: activeZone.cor }}
                  />
                  <p className="font-display text-sm font-bold text-fg">
                    {hoverMuni ?? activeZone.nome}
                  </p>
                </div>
                <p className="mt-1 text-xs text-fg-subtle">
                  {activeZone.nome} · {activeZone.descricao}
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1 text-accent">
                    <Clock className="h-3.5 w-3.5" />
                    {activeZone.prazoPrincipal}
                  </span>
                  <span className="text-fg-faint">R$ 11,00 / entrega</span>
                </div>
              </div>
            )}
          </div>

          {/* Painel lateral: legenda + busca */}
          <div>
            <form onSubmit={onSubmit} className="rounded-3xl border border-line bg-card p-5 shadow-sm">
              <label className="text-sm font-semibold text-fg-muted">Consultar CEP</label>
              <div className="mt-2 flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-faint" />
                  <input
                    value={cep}
                    onChange={(e) => setCep(formatCep(e.target.value))}
                    inputMode="numeric"
                    placeholder="00000-000"
                    className="w-full rounded-xl border border-line-strong bg-transparent py-2.5 pl-9 pr-3 text-sm text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-inverse px-4 text-sm font-semibold text-inverse-fg transition-colors hover:bg-inverse/90"
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
                      ? 'border-brand-400 bg-brand-400/10'
                      : 'border-line bg-card hover:border-line-strong'
                  }`}
                >
                  <span
                    className="h-8 w-8 shrink-0 rounded-lg"
                    style={{ background: z.cor }}
                  />
                  <span>
                    <span className="block text-sm font-semibold text-fg">{z.nome}</span>
                    <span className="block text-xs text-fg-subtle">{z.prazoPrincipal}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabela completa de CEPs */}
        <Reveal className="mt-16">
          <details className="group rounded-3xl border border-line bg-card">
            <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-left">
              <span className="font-display text-lg font-bold text-fg">
                Tabela completa de CEPs e prazos
              </span>
              <span className="text-sm font-medium text-accent group-open:hidden">
                Ver todos
              </span>
              <span className="hidden text-sm font-medium text-accent group-open:inline">
                Recolher
              </span>
            </summary>
            <div className="overflow-x-auto border-t border-line">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-card-2 text-xs uppercase tracking-wide text-fg-subtle">
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
                      className="border-t border-line hover:bg-card-2"
                    >
                      <td className="px-6 py-3 font-medium text-fg-muted">{r.regiao}</td>
                      <td className="px-6 py-3 tabular-nums text-fg-subtle">{r.cepInicial}</td>
                      <td className="px-6 py-3 tabular-nums text-fg-subtle">{r.cepFinal}</td>
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
