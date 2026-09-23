import type { Depoimento } from '../types'

/* ============================================================
   Depoimentos.

   ATENÇÃO: os textos abaixo são PLACEHOLDERS DE DEMONSTRAÇÃO.
   Não descrevem clientes reais e não mencionam empresas, marcas,
   cargos ou resultados comerciais.

   Para publicar: substitua `texto` e `autor` pelos depoimentos reais,
   com autorização de quem os deu. Adicione ou remova itens à vontade —
   o carrossel se ajusta à quantidade.
   ============================================================ */

export const depoimentosIntro = {
  label: 'Depoimentos',
  titulo: ['O que dizem sobre', 'o trabalho da M O D'],
  aviso: 'Conteúdo de demonstração, será substituído por depoimentos reais autorizados.',
}

export const depoimentos: Depoimento[] = [
  {
    id: 'dep-01',
    texto:
      'Foi exatamente o que imaginávamos. O projeto ficou elegante, funcional e cada detalhe foi pensado com muito cuidado.',
    autor: 'Mariana',
  },
  {
    id: 'dep-02',
    texto:
      'O resultado superou nossas expectativas. Desde o projeto até a instalação, tivemos atenção em cada etapa.',
    autor: 'Rafael',
  },
  {
    id: 'dep-03',
    texto:
      'A transformação do ambiente foi impressionante. O projeto ficou sofisticado e, ao mesmo tempo, muito funcional.',
    autor: 'Camila',
  },
]
