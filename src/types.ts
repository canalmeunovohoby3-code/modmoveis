/* Tipos compartilhados do site M O D. */

export type Art = 'slats' | 'modules' | 'shelves' | 'arch' | 'grid' | 'curve'

export type Tone = 1 | 2 | 3 | 4 | 5 | 6

export type Ratio = 'retrato' | 'vertical' | 'quadrado' | 'paisagem' | 'panorama' | 'largo'

/** Uma imagem da galeria de um projeto. `src` nulo = placeholder elegante.
 *
 *  Formatos: `src` aceita JPG, PNG, WEBP ou SVG. Quando houver versão WEBP,
 *  informe-a em `webp` — o navegador escolhe o melhor formato e o `src`
 *  permanece como fallback. */
export interface Imagem {
  src: string | null
  webp?: string | null
  alt: string
  art?: Art
  tone?: Tone
  legenda?: string
}

/** Um projeto da galeria. A galeria é única e sem subcategorias.
 *  O identificador visual é a numeração (Projeto 01, 02...), derivada da
 *  posição na lista — reordenar `projetos` renumera tudo automaticamente.
 *  `numero` permite fixar um número manualmente, se necessário. */
export interface Projeto {
  id: string
  numero?: string
  proporcao: Ratio
  capa: Imagem
}

/** Um vídeo real de trabalho da empresa. */
export interface VideoItem {
  id: string
  titulo: string
  descricao: string
  mp4?: string | null
  webm?: string | null
  poster?: string | null
  externo?: string | null
  duracao?: string
  art?: Art
  tone?: Tone
}

/** Depoimento. Conteúdo de demonstração, preparado para substituição. */
export interface Depoimento {
  id: string
  texto: string
  autor: string
  contexto?: string
}

export interface Diferencial {
  numero: string
  titulo: string
  texto: string
}

export interface EtapaProcesso {
  numero: string
  titulo: string
  texto: string
}

export interface Servico {
  titulo: string
  descricao: string
  imagem: Imagem
}

export interface NavegacaoItem {
  label: string
  href: string
}
