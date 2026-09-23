import type { Servico, VideoItem } from '../types'

/* Serviços declarados pela empresa. Sem promessas além do que é informado.
   O palco da seção usa `servicosVideo`; o campo `imagem` de cada serviço
   fica reservado para uso futuro (ex.: miniatura do serviço no mobile). */

export const servicosIntro = {
  label: 'Serviços sob medida',
  titulo: 'O que projetamos',
  texto:
    'Marcenaria sob medida para cada ambiente da casa — do closet à área externa, incluindo rebaixamento de teto e peças de decoração.',
}

/* ----------------------------------------------------------
   Vídeo da seção "Serviços sob medida" — arquivo real, em loop mudo.
   Para trocar: substitua o arquivo em public/midia/videos/ e ajuste
   `mp4` (e, se houver, `webm` e `poster`).
   ---------------------------------------------------------- */
export const servicosVideo: VideoItem = {
  id: 'servicos-sob-medida',
  titulo: 'Serviços sob medida',
  descricao: 'Detalhes de fabricação e acabamento, feitos internamente.',
  mp4: '/midia/videos/video1.mp4',
  webm: null,
  poster: null,
  externo: null,
  duracao: '0:29',
  art: 'slats',
  tone: 2,
}

export const servicos: Servico[] = [
  {
    titulo: 'Closets',
    descricao: 'Organização interna definida pelo uso, portas de correr ou de abrir.',
    imagem: { src: null, alt: 'Closet planejado sob medida', art: 'modules', tone: 1 },
  },
  {
    titulo: 'Armários de quarto',
    descricao: 'Do piso ao teto, integrados ao painel e à cabeceira.',
    imagem: { src: null, alt: 'Armários de quarto planejados', art: 'grid', tone: 2 },
  },
  {
    titulo: 'Cozinhas planejadas',
    descricao: 'Fluxo de trabalho, eletrodomésticos embutidos e acabamento resistente.',
    imagem: { src: null, alt: 'Cozinha planejada sob medida', art: 'slats', tone: 3 },
  },
  {
    titulo: 'Banheiros',
    descricao: 'Gabinetes suspensos, espelheiras e soluções para áreas úmidas.',
    imagem: { src: null, alt: 'Banheiro planejado', art: 'arch', tone: 4 },
  },
  {
    titulo: 'Escritórios',
    descricao: 'Bancadas, estantes e passagem de cabos pensadas para a rotina.',
    imagem: { src: null, alt: 'Escritório planejado', art: 'shelves', tone: 5 },
  },
  {
    titulo: 'Área de serviço',
    descricao: 'Aproveitamento de espaços estreitos com módulos sob medida.',
    imagem: { src: null, alt: 'Área de serviço planejada', art: 'grid', tone: 6 },
  },
  {
    titulo: 'Rebaixamento de teto',
    descricao: 'Forros e sancas que organizam a iluminação do ambiente.',
    imagem: { src: null, alt: 'Rebaixamento de teto planejado', art: 'curve', tone: 2 },
  },
  {
    titulo: 'Deck para piscina',
    descricao: 'Madeira tratada para áreas externas, com desenho contínuo.',
    imagem: { src: null, alt: 'Deck de madeira para piscina', art: 'slats', tone: 5 },
  },
  {
    titulo: 'Peças de decoração',
    descricao: 'Detalhes em madeira que completam o projeto do ambiente.',
    imagem: { src: null, alt: 'Peças de decoração em madeira', art: 'arch', tone: 1 },
  },
]
