export interface Plan {
  entregas: number
  unitario: string
  total: string
  destaque?: boolean
  economia?: string
}

/** Tabela "VALORES FIXOS PARA REGIÕES METROPOLITANAS DE SP" (pág. 3). */
export const plans: Plan[] = [
  { entregas: 220, unitario: '9,55', total: '2.100,00' },
  { entregas: 300, unitario: '9,01', total: '2.700,00', destaque: true, economia: 'Mais escolhido' },
  { entregas: 400, unitario: '8,51', total: '3.400,00' },
  { entregas: 500, unitario: '8,01', total: '4.000,00', economia: 'Menor custo por entrega' },
]

export const planNotes = [
  'Pedido mínimo de 5 entregas por rota.',
  'Preço único de R$ 11,00 por entrega em São Paulo e Grande SP (fora dos pacotes).',
  'Volumes fora dos pacotes da tabela na Grande SP: R$ 15,00 por entrega.',
  'Entregas urgentes / mesmo dia e itens especiais têm valores diferenciados.',
]
