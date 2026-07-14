export type ZoneId =
  | 'capital'
  | 'norte'
  | 'oeste'
  | 'sudoeste'
  | 'sudeste'
  | 'leste'

export type Prazo = 'D+1' | 'D+2' | '5º–6º dia'

export interface CepRange {
  regiao: string
  cepInicial: string
  cepFinal: string
  prazo: Prazo
  zone: ZoneId
}

export interface Zone {
  id: ZoneId
  nome: string
  cor: string
  descricao: string
  prazoPrincipal: Prazo
}

/** Zonas usadas no mapa 3D — cores espelham o mapa da pág. 2/4 do PDF. */
export const zones: Zone[] = [
  {
    id: 'capital',
    nome: 'Capital de São Paulo',
    cor: 'var(--color-zone-capital)',
    descricao: 'Toda a cidade de São Paulo, do Centro à periferia.',
    prazoPrincipal: 'D+1',
  },
  {
    id: 'norte',
    nome: 'Zona Norte / Vetor Norte',
    cor: 'var(--color-zone-norte)',
    descricao: 'Guarulhos e municípios do norte da Grande SP.',
    prazoPrincipal: 'D+1',
  },
  {
    id: 'oeste',
    nome: 'Oeste — Osasco e região',
    cor: 'var(--color-zone-oeste)',
    descricao: 'Osasco, Barueri, Carapicuíba, Santana de Parnaíba.',
    prazoPrincipal: 'D+1',
  },
  {
    id: 'sudoeste',
    nome: 'Sudoeste — Cotia e Embu',
    cor: 'var(--color-zone-sudoeste)',
    descricao: 'Cotia, Embu, Taboão da Serra e Itapecerica da Serra.',
    prazoPrincipal: 'D+2',
  },
  {
    id: 'sudeste',
    nome: 'ABC — Grande ABC Paulista',
    cor: 'var(--color-zone-sudeste)',
    descricao: 'Santo André, São Bernardo, São Caetano, Diadema, Mauá.',
    prazoPrincipal: 'D+1',
  },
  {
    id: 'leste',
    nome: 'Leste — Suzano e região',
    cor: 'var(--color-zone-leste)',
    descricao: 'Poá, Ferraz de Vasconcelos, Itaquaquecetuba, Suzano.',
    prazoPrincipal: 'D+2',
  },
]

/** Faixas de CEP transcritas da tabela "CEPS ÁREA DE ATUAÇÃO" (pág. 4). */
export const cepRanges: CepRange[] = [
  { regiao: 'Centro', cepInicial: '01000-000', cepFinal: '01099-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Bom Retiro, Barra Funda', cepInicial: '01100-000', cepFinal: '01199-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Consolação, Bela Vista, Liberdade, Cambuci', cepInicial: '01200-000', cepFinal: '01599-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Zona Norte, Vl. Maria, Santana', cepInicial: '02000-000', cepFinal: '02199-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Tucuruvi, Vl. Medeiros, Jaçanã, Tremembé', cepInicial: '02200-000', cepFinal: '02399-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Mandaqui, Casa Verde', cepInicial: '02400-000', cepFinal: '02599-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Brasilândia, Limão', cepInicial: '02600-000', cepFinal: '02799-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Taipas, Freguesia do Ó', cepInicial: '02800-000', cepFinal: '02999-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Tatuapé, Mooca, Vl. Prudente', cepInicial: '03000-000', cepFinal: '03999-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Indianópolis, Paraíso, Vl. Clementino', cepInicial: '04000-000', cepFinal: '04099-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Vl. Mariana, Aclimação, Saúde, Cursino', cepInicial: '04100-000', cepFinal: '04199-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Ipiranga, Sacomã', cepInicial: '04200-000', cepFinal: '04299-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Jabaquara, Aeroporto', cepInicial: '04300-000', cepFinal: '04399-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Cidade Ademar', cepInicial: '04400-000', cepFinal: '04499-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Moema, Itaim Bibi, Vila Olímpia', cepInicial: '04500-000', cepFinal: '04599-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Campo Belo, Campo Grande', cepInicial: '04600-000', cepFinal: '04699-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Santo Amaro, Alto Boa Vista, Socorro', cepInicial: '04700-000', cepFinal: '04799-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Grajaú, Cidade Dutra, Parelheiros', cepInicial: '04800-000', cepFinal: '04865-000', prazo: 'D+1', zone: 'capital' },
  { regiao: 'São Luís, Jardim Ângela', cepInicial: '04900-000', cepFinal: '04965-000', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Lapa', cepInicial: '05000-000', cepFinal: '05099-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Pq. São Domingos, Pirituba, Jaraguá', cepInicial: '05100-000', cepFinal: '05199-000', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Perus', cepInicial: '05200-000', cepFinal: '05299-000', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Jaguaré, Cid. Universitária, Vl. Leopoldina', cepInicial: '05300-000', cepFinal: '05399-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Vila Madalena, Pinheiros', cepInicial: '05400-000', cepFinal: '05499-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Butantã, Jardim Previdência', cepInicial: '05500-000', cepFinal: '05599-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Morumbi, Vl. Andrade, Vl. Sônia', cepInicial: '05600-000', cepFinal: '05699-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Campo Limpo', cepInicial: '05700-000', cepFinal: '05799-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Capão Redondo, Jd. Ângela', cepInicial: '05800-000', cepFinal: '05999-999', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Osasco', cepInicial: '06000-000', cepFinal: '06299-999', prazo: 'D+1', zone: 'oeste' },
  { regiao: 'Carapicuíba, Barueri, Santana de Parnaíba', cepInicial: '06300-000', cepFinal: '06560-000', prazo: 'D+1', zone: 'oeste' },
  { regiao: 'Cotia', cepInicial: '06700-000', cepFinal: '06729-000', prazo: 'D+2', zone: 'sudoeste' },
  { regiao: 'Taboão da Serra', cepInicial: '06751-000', cepFinal: '06799-000', prazo: 'D+1', zone: 'sudoeste' },
  { regiao: 'Embu', cepInicial: '06800-000', cepFinal: '06847-000', prazo: 'D+2', zone: 'sudoeste' },
  { regiao: 'Itapecerica da Serra', cepInicial: '06850-000', cepFinal: '06899-000', prazo: 'D+2', zone: 'sudoeste' },
  { regiao: 'Guarulhos', cepInicial: '07000-000', cepFinal: '07299-000', prazo: 'D+1', zone: 'norte' },
  { regiao: 'Mairiporã', cepInicial: '07600-000', cepFinal: '07699-000', prazo: 'D+2', zone: 'norte' },
  { regiao: 'Franco da Rocha, Francisco Morato', cepInicial: '07800-000', cepFinal: '07836-000', prazo: 'D+2', zone: 'norte' },
  { regiao: 'Cid. Líder, Itaquera, São Miguel, Itaim', cepInicial: '08000-000', cepFinal: '08299-000', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Guaianases, Cidade Tiradentes', cepInicial: '08300-000', cepFinal: '08499-000', prazo: 'D+1', zone: 'capital' },
  { regiao: 'Poá, Ferraz de Vasconcelos, Itaquaquecetuba, Suzano', cepInicial: '08500-000', cepFinal: '08599-000', prazo: 'D+2', zone: 'leste' },
  { regiao: 'Santo André, Mauá, São Caetano, São Bernardo, Diadema', cepInicial: '09000-000', cepFinal: '09999-000', prazo: 'D+1', zone: 'sudeste' },
  { regiao: 'Riacho Grande, Rio Grande da Serra, Ribeirão Pires', cepInicial: '09830-140', cepFinal: '09899-000', prazo: '5º–6º dia', zone: 'sudeste' },
  { regiao: 'Ribeirão Pires', cepInicial: '09400-000', cepFinal: '09499-000', prazo: '5º–6º dia', zone: 'sudeste' },
]

/** Normaliza um CEP (só dígitos) e busca a faixa correspondente. */
export function lookupCep(input: string): CepRange | null {
  const digits = input.replace(/\D/g, '')
  if (digits.length < 5) return null
  const num = parseInt(digits.padEnd(8, '0'), 10)
  for (const r of cepRanges) {
    const ini = parseInt(r.cepInicial.replace(/\D/g, ''), 10)
    const fim = parseInt(r.cepFinal.replace(/\D/g, ''), 10)
    if (num >= ini && num <= fim) return r
  }
  return null
}
