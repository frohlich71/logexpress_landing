/**
 * Dados de contato da LogExpress.
 * >>> SUBSTITUA OS PLACEHOLDERS ABAIXO PELOS DADOS REAIS <<<
 */
export const site = {
  nome: 'LogExpress',
  slogan: 'Serviços de Entregas',
  anosMercado: 10,

  // Placeholders — trocar pelos dados reais
  telefone: '(11) 0000-0000',
  telefoneLink: 'tel:+551100000000',
  email: 'contato@logexpress.com.br',
  whatsapp: '55 11 90000-0000',
  // Número no formato internacional só com dígitos para o link do WhatsApp
  whatsappNumero: '5511900000000',
}

export const whatsappMensagem = encodeURIComponent(
  'Olá! Vim pelo site da LogExpress e gostaria de solicitar um orçamento de entregas.',
)

export const whatsappLink = `https://wa.me/${site.whatsappNumero}?text=${whatsappMensagem}`
