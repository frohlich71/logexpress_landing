// Gera src/data/rmspGeo.ts com os contornos geográficos reais dos 39 municípios
// da Região Metropolitana de São Paulo.
//
// Uso:  node scripts/gen-map.mjs
// Requer:  npm i -D d3-geo   (e acesso à internet, para a API do IBGE)
//
// Fluxo: lista os municípios da RMSP (IBGE localidades) -> baixa a malha de cada um
// (IBGE malhas v3, GeoJSON) -> corrige o sentido dos anéis (IBGE vem no sentido
// horário; d3-geo espera o contrário) -> projeta em Mercator para um viewBox SVG ->
// agrupa por zona de atendimento -> emite o arquivo TypeScript.

import { geoMercator, geoPath } from 'd3-geo'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const RMSP_ID = '04901' // código IBGE da Região Metropolitana de São Paulo
const QUALIDADE = 'intermediaria'
const OUT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../src/data/rmspGeo.ts'
)

// Município (código IBGE) -> zona de atendimento (ver src/data/ceps.ts).
const ZONE = {
  3550308: 'capital',
  // norte
  3518800: 'norte', 3503901: 'norte', 3546801: 'norte', 3528502: 'norte',
  3509007: 'norte', 3509205: 'norte', 3516408: 'norte', 3516309: 'norte',
  // oeste
  3534401: 'oeste', 3505708: 'oeste', 3510609: 'oeste', 3547304: 'oeste',
  3525003: 'oeste', 3522505: 'oeste', 3539103: 'oeste',
  // sudoeste
  3513009: 'sudoeste', 3556453: 'sudoeste', 3515004: 'sudoeste', 3515103: 'sudoeste',
  3522208: 'sudoeste', 3552809: 'sudoeste', 3526209: 'sudoeste', 3549953: 'sudoeste',
  // sudeste / ABC
  3547809: 'sudeste', 3548708: 'sudeste', 3548807: 'sudeste', 3513801: 'sudeste',
  3529401: 'sudeste', 3543303: 'sudeste', 3544103: 'sudeste',
  // leste
  3515707: 'leste', 3523107: 'leste', 3539806: 'leste', 3552502: 'leste',
  3530607: 'leste', 3506607: 'leste', 3545001: 'leste', 3518305: 'leste',
}

const W = 900
const PAD = 16

async function getJson(url) {
  const r = await fetch(url)
  if (!r.ok) throw new Error(`${r.status} ${url}`)
  return r.json()
}

async function main() {
  // 1. lista de municípios da RMSP
  const rms = await getJson(
    'https://servicodados.ibge.gov.br/api/v1/localidades/regioes-metropolitanas'
  )
  const region = rms.find((r) => r.id === RMSP_ID)
  const municipios =
    region.municipios ??
    region['sub-regioes-metropolitanas'].flatMap((s) => s.municipios)
  console.log('municípios:', municipios.length)

  // 2. baixa a malha de cada município
  const revRing = (ring) => ring.slice().reverse()
  const features = []
  for (let i = 0; i < municipios.length; i += 6) {
    const batch = municipios.slice(i, i + 6)
    const got = await Promise.all(
      batch.map(async (m) => {
        const url = `https://servicodados.ibge.gov.br/api/v3/malhas/municipios/${m.id}?formato=application/vnd.geo+json&qualidade=${QUALIDADE}`
        const g = await getJson(url)
        const f = g.features[0]
        // 3. corrige o sentido dos anéis
        const geo = f.geometry
        if (geo.type === 'Polygon') geo.coordinates = geo.coordinates.map(revRing)
        else if (geo.type === 'MultiPolygon')
          geo.coordinates = geo.coordinates.map((p) => p.map(revRing))
        f.properties = { id: m.id, nome: m.nome }
        return f
      })
    )
    features.push(...got)
    process.stdout.write(`.${features.length}`)
  }
  process.stdout.write('\n')
  const fc = { type: 'FeatureCollection', features }

  // 4. projeta em Mercator, alinhando o canto superior-esquerdo em (PAD, PAD)
  const projection = geoMercator().fitWidth(W - PAD * 2, fc)
  const p0 = geoPath(projection)
  const [[bx0, by0]] = p0.bounds(fc)
  const [tx, ty] = projection.translate()
  projection.translate([tx + (PAD - bx0), ty + (PAD - by0)])
  const geoPathFn = geoPath(projection)
  const [, [, y1]] = geoPathFn.bounds(fc)
  const viewBox = `0 0 ${W} ${Math.ceil(y1 + PAD)}`

  const munis = features.map((f) => {
    const id = f.properties.id
    const zone = ZONE[id]
    if (!zone) throw new Error('sem zona para ' + f.properties.nome + ' ' + id)
    const c = geoPathFn.centroid(f)
    return {
      id,
      nome: f.properties.nome,
      zone,
      d: geoPathFn(f).replace(/(\d+\.\d{2})\d+/g, '$1'),
      cx: +c[0].toFixed(1),
      cy: +c[1].toFixed(1),
      area: geoPathFn.area(f),
    }
  })

  // rótulo de cada zona = centroide do maior município (ponto mais legível)
  const labels = {}
  for (const m of munis) {
    if (!labels[m.zone] || m.area > labels[m.zone].area) {
      labels[m.zone] = { x: m.cx, y: m.cy, area: m.area }
    }
  }

  // 5. emite o TypeScript
  const ts =
    `// AUTO-GERADO por scripts/gen-map.mjs — não editar à mão.
// Contornos geográficos reais dos 39 municípios da Região Metropolitana de São Paulo.
// Fonte: malhas municipais do IBGE (API v3, qualidade ${QUALIDADE}), projeção Mercator.
// Cada município é agrupado por zona de atendimento (ver src/data/ceps.ts).
import type { ZoneId } from './ceps'

export interface Muni {
  id: number
  nome: string
  zone: ZoneId
  d: string
}

export const mapViewBox = ${JSON.stringify(viewBox)}

export const zoneLabelPos: Record<ZoneId, { x: number; y: number }> = {
${Object.entries(labels)
  .map(([z, v]) => `  ${z}: { x: ${v.x}, y: ${v.y} },`)
  .join('\n')}
}

export const munis: Muni[] = [
${munis
  .map(
    (m) =>
      `  { id: ${m.id}, nome: ${JSON.stringify(m.nome)}, zone: ${JSON.stringify(
        m.zone
      )}, d: ${JSON.stringify(m.d)} },`
  )
  .join('\n')}
]
`
  fs.writeFileSync(OUT, ts)
  console.log('escrito', OUT, (fs.statSync(OUT).size / 1024).toFixed(1) + 'KB')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
