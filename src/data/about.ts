import { site } from './site'

export const sobre = {
  label: 'Sobre a M O D',
  titulo: 'Precisão começa antes da instalação.',
  texto:
    'Da primeira medida ao último acabamento, cada projeto passa por um processo cuidadoso para transformar espaços em ambientes que realmente fazem sentido para quem vive neles.',
  destaques: [
    'Fabricação própria',
    'Equipe especializada',
    'Projetos sob medida',
    'Rio de Janeiro e região',
  ],
  /* As duas fotos da seção vêm de public/midia/ e os próprios nomes indicam
     o espaço: `sobre-maior` vai na imagem grande, `sobre-menor` na menor. */
  imagem: {
    src: '/midia/sobre-maior.jpg' as string | null,
    alt: 'Cozinha planejada com armários claros, bancada em madeira e iluminação sob medida',
  },
  imagemSecundaria: {
    src: '/midia/sobre-menor.jpg' as string | null,
    alt: 'Detalhe da bancada, do backsplash em madeira e das ferragens',
  },
  rodape: `${site.atuacao} · ${site.instagram.handle}`,
}
