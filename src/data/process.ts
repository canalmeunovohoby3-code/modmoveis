import type { EtapaProcesso } from '../types'

export const processoIntro = {
  titulo: 'Como cada ambiente nasce',
  texto:
    'Um processo em quatro etapas, do primeiro contato à instalação — sem etapas terceirizadas fora do controle da equipe.',
}

export const etapas: EtapaProcesso[] = [
  {
    numero: '01',
    titulo: 'Conhecer',
    texto: 'Briefing, medidas e referências.',
  },
  {
    numero: '02',
    titulo: 'Projetar',
    texto: 'Desenvolvimento do projeto e visualização em 3D.',
  },
  {
    numero: '03',
    titulo: 'Fabricar',
    texto: 'Produção própria com controle de qualidade.',
  },
  {
    numero: '04',
    titulo: 'Instalar',
    texto: 'Montagem e acabamento no ambiente.',
  },
]
