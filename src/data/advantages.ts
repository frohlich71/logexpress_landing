import type { LucideIcon } from 'lucide-react'
import {
  PiggyBank,
  ShieldCheck,
  Tag,
  Clock,
  Timer,
  BellRing,
} from 'lucide-react'

export interface Advantage {
  icon: LucideIcon
  titulo: string
  descricao: string
}

/** Diferenciais "VANTAGENS LOG EXPRESS" (pág. 3). */
export const advantages: Advantage[] = [
  {
    icon: PiggyBank,
    titulo: 'Melhor custo-benefício',
    descricao:
      'Operação low cost: você reduz o gasto com logística sem abrir mão de qualidade e pontualidade.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Sem vínculo trabalhista',
    descricao:
      'Isenção total de vínculo empregatício e encargos para a sua empresa. Você paga só pela entrega.',
  },
  {
    icon: Tag,
    titulo: 'Preço único de R$ 11,00',
    descricao:
      'Valor fixo por entrega em São Paulo e Grande SP. Previsibilidade total no seu custo por pedido.',
  },
  {
    icon: Clock,
    titulo: 'Retiradas a partir das 16h',
    descricao:
      'Coletamos na sua farmácia no horário combinado, a partir das 16h, dentro do horário comercial.',
  },
  {
    icon: Timer,
    titulo: 'Entrega em até 24h',
    descricao:
      'A partir da retirada, entregamos em até 24 horas em horário comercial — a maioria das regiões em D+1.',
  },
  {
    icon: BellRing,
    titulo: 'Ocorrências em tempo real',
    descricao:
      'Qualquer intercorrência com a entrega, a sua empresa é informada imediatamente. Zero surpresa.',
  },
]
