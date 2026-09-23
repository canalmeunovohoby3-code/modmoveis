import type { NavegacaoItem } from '../types'

/* ============================================================
   Dados institucionais — ponto único de edição.
   Tudo que é contato, endereço e promessa comercial vive aqui.
   ============================================================ */

export const site = {
  nome: 'M O D',
  nomeCompleto: 'M O D Móveis Planejados & Decoração',
  palavraChave: 'Móveis Planejados',
  assinatura: 'Móveis planejados & decoração',

  descricaoCurta:
    'Móveis planejados sob medida, fabricação própria e acabamento pensado em cada detalhe.',

  telefone: {
    display: '(21) 99253-9702',
    raw: '5521992539702',
  },

  whatsappMensagem:
    'Olá! Conheci a M O D Móveis Planejados e gostaria de solicitar um orçamento para um projeto.',

  instagram: {
    handle: '@amepmoveis_planejados',
    url: 'https://www.instagram.com/amepmoveis_planejados',
  },

  atuacao: 'Rio de Janeiro e região metropolitana',
  regioes: ['Rio de Janeiro', 'Niterói', 'Baixada Fluminense'],

  microinfo: ['Rio de Janeiro', 'Fabricação própria', 'Sob medida'],

  /* ----------------------------------------------------------
     Informações comerciais sujeitas a confirmação do cliente.
     Só são exibidas quando `confirmado` for true. Enquanto o
     cliente não confirmar por escrito, elas permanecem ocultas.
     ---------------------------------------------------------- */
  garantia: {
    confirmado: false,
    anos: 5,
    texto: 'Garantia de 5 anos contra defeitos de fabricação.',
  },

  prazo: {
    confirmado: false,
    texto: 'Prazo típico de 15 a 30 dias úteis após aprovação e sinal.',
  },

  dominio: 'https://www.modmoveisplanejados.com.br',
} as const

/** Monta um link de WhatsApp; sem argumento usa a mensagem padrão do site. */
export function whatsappLink(mensagem: string = site.whatsappMensagem): string {
  return `https://wa.me/${site.telefone.raw}?text=${encodeURIComponent(mensagem)}`
}

export const navegacao: NavegacaoItem[] = [
  { label: 'Início', href: '#topo' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
]

export const navegacaoIds = navegacao.map((item) => item.href.replace('#', ''))

/* Faixas do marquee institucional logo abaixo do hero. */
export const marqueeServicos = [
  'Cozinhas planejadas',
  'Closets',
  'Quartos',
  'Banheiros',
  'Home office',
  'Áreas externas',
  'Decks',
  'Móveis sob medida',
]

export const marqueeValores = [
  'Fabricação própria',
  'Projeto sob medida',
  'Projeto em 3D',
  'Instalação especializada',
  'Materiais selecionados',
  'Rio de Janeiro e região',
]

/* Lista curada exibida no rodapé. */
export const footerServicos = [
  'Cozinhas planejadas',
  'Closets',
  'Quartos',
  'Banheiros',
  'Móveis sob medida',
]
