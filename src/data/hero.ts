import { site } from './site'

export const hero = {
  eyebrow: site.microinfo,
  titulo: ['Ambientes pensados para você.', 'Projetados para permanecer.'],
  apoio: site.descricaoCurta,
  ctaPrimario: 'Solicitar projeto',
  ctaSecundario: 'Ver projetos',
  rolagem: 'Explorar',
  imagem: {
    src: '/foto-hero.jpg' as string | null,
    alt: 'Cozinha planejada sob medida com madeira natural e bancada em mármore',
  },
  video: {
    src: null as string | null,
    poster: null as string | null,
  },
}
