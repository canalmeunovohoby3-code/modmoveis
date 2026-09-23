import type { Projeto } from '../types'

/* ============================================================
   Galeria de projetos.

   Fotos reais fornecidas pela empresa, em public/midia/projetos/.
   A ordem abaixo é a ordem da galeria: a numeração (Projeto 01, 02...)
   é derivada da posição, e `proporcao` foi escolhida para cada foto
   conforme o enquadramento original, evitando cortes desnecessários.

   Para incluir um projeto novo:
   1. coloque a imagem em public/midia/projetos/
   2. acrescente um item aqui, com `proporcao` igual à da foto
      (vertical 3/4 · retrato 4/5 · quadrado 1/1 · paisagem 4/3 ·
       panorama 16/9 · largo 21/9)
   3. escreva um `alt` descrevendo o ambiente
   ============================================================ */

export const portfolioIntro = {
  titulo: 'Projetos',
  texto: 'Cada projeto nasce de uma ideia. Cada detalhe transforma o espaço.',
}

export const projetos: Projeto[] = [
  {
    id: 'p01',
    proporcao: 'panorama',
    capa: {
      src: '/midia/projetos/projeto10.jpg',
      alt: 'Cozinha planejada com ilha em pedra escura e armários com vidro',
    },
  },
  {
    id: 'p02',
    proporcao: 'vertical',
    capa: {
      src: '/midia/projetos/projeto1.jpg',
      alt: 'Cozinha compacta planejada com armários em madeira e azul',
    },
  },
  {
    id: 'p03',
    proporcao: 'paisagem',
    capa: {
      src: '/midia/projetos/projeto6.jpg',
      alt: 'Banheiro com bancada dupla e cuba de apoio',
    },
  },
  {
    id: 'p04',
    proporcao: 'quadrado',
    capa: {
      src: '/midia/projetos/projeto5.jpeg',
      alt: 'Closet com gaveteiro, painel e penteadeira iluminada',
    },
  },
  {
    id: 'p05',
    proporcao: 'paisagem',
    capa: {
      src: '/midia/projetos/projeto2.jpg',
      alt: 'Cozinha com armário curvo iluminado e adega',
    },
  },
  {
    id: 'p06',
    proporcao: 'vertical',
    capa: {
      src: '/midia/projetos/projeto9.jpg',
      alt: 'Cozinha em madeira com mesa de jantar integrada',
    },
  },
  {
    id: 'p07',
    proporcao: 'paisagem',
    capa: {
      src: '/midia/projetos/projeto8.jpg',
      alt: 'Home office com estante de parede inteira',
    },
  },
  {
    id: 'p08',
    proporcao: 'quadrado',
    capa: {
      src: '/midia/projetos/projeto4.jpg',
      alt: 'Gabinete de banheiro com cuba de apoio e espelho',
    },
  },
  {
    id: 'p09',
    proporcao: 'paisagem',
    capa: {
      src: '/midia/projetos/projeto7.jpg',
      alt: 'Cozinha com armários em madeira e tampo escuro',
    },
  },
]
