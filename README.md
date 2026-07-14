# LogExpress — Landing Page

Landing page da **LogExpress — Serviços de Entregas** (moto-fretamento para farmácias
de manipulação e laboratórios em São Paulo e Grande SP).

Feita com **Vite + React + TypeScript + Tailwind CSS v4 + framer-motion**.
Destaque para a seção de **cobertura**, com um mapa 3D interativo com o **formato
geográfico real** da Região Metropolitana de SP — os 39 municípios reais (malhas do
IBGE), agrupados/coloridos por zona de atendimento, com tilt em perspectiva, parallax,
hover por região (destaca a zona e mostra o município) e consulta de CEP.

## Rodando o projeto

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/ (typecheck + build de produção)
npm run preview  # serve o build de produção localmente
```

## Deploy

O resultado é 100% estático (pasta `dist/`). Pode ser publicado em Vercel, Netlify,
Cloudflare Pages, GitHub Pages, etc. Em Vercel/Netlify basta apontar para o repositório
— build command `npm run build`, output `dist`.

## Onde editar o conteúdo

Todo o conteúdo textual vive em `src/data/`:

| Arquivo                | O que contém                                              |
| ---------------------- | -------------------------------------------------------- |
| `src/data/site.ts`     | **Contato (telefone, e-mail, WhatsApp).** Ver abaixo.    |
| `src/data/plans.ts`    | Tabela de planos e observações de preço                  |
| `src/data/advantages.ts` | Os 6 diferenciais (Vantagens)                          |
| `src/data/ceps.ts`     | Zonas do mapa + faixas de CEP e prazos                   |
| `src/data/rmspGeo.ts`  | **Auto-gerado** — contornos reais dos 39 municípios (IBGE). Ver abaixo. |
| `src/data/partners.ts` | Nomes dos parceiros                                       |

### Mapa geográfico (`src/data/rmspGeo.ts`)

Esse arquivo é **gerado automaticamente** a partir das malhas municipais do IBGE
(API v3, qualidade intermediária) projetadas para SVG com `d3-geo` (Mercator). Não
edite à mão. Para trocar municípios de zona, ajuste o objeto `ZONE` no script de
geração `scripts/gen-map.mjs` e rode `node scripts/gen-map.mjs`. A cor de cada zona
vem de `src/index.css` (`--color-zone-*`); o nome/descrição/prazo, de `src/data/ceps.ts`.

### ⚠️ Preencher os dados de contato (placeholders)

Em `src/data/site.ts`, troque os placeholders pelos dados reais:

```ts
telefone: '(11) 0000-0000',
telefoneLink: 'tel:+551100000000',
email: 'contato@logexpress.com.br',
whatsapp: '55 11 90000-0000',
whatsappNumero: '5511900000000', // só dígitos, formato internacional
```

O QR code da seção de contato é gerado automaticamente a partir do link do WhatsApp.

### Logos dos parceiros

Hoje os parceiros aparecem como *chips* com o nome (em `src/components/Partners.tsx`).
Para usar as logos reais: coloque as imagens em `public/partners/` e ajuste o componente
`Partners.tsx` para renderizar `<img>` no lugar dos chips.

## Estrutura

```
src/
  components/     # uma seção por arquivo (Hero, Advantages, CoverageMap, Plans, ...)
  data/           # conteúdo/dados da landing
  index.css       # tema Tailwind v4 (paleta da marca, fontes, animações)
ref/              # material de origem (PDF institucional)
```

## Fonte do conteúdo

Todo o conteúdo foi transcrito do PDF institucional em `ref/Log Express Planos.pdf`,
com pequenas correções de texto (ex.: "Há mais de 10 anos") e reescrita das regras de
preço para maior clareza.
# logexpress_landing
