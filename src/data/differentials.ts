import type { Diferencial } from '../types'

/* Diferenciais afirmados pela própria empresa. Sem métricas inventadas. */

export const diferenciaisIntro = {
  titulo: ['Não entregamos apenas móveis.', 'Criamos ambientes.'],
  texto:
    'Da escolha do material ao último acabamento, o processo é conduzido por quem fabrica — o que garante controle e precisão em cada etapa.',
}

export const diferenciais: Diferencial[] = [
  {
    numero: '01',
    titulo: 'Fabricação própria',
    texto: 'Todo o processo produtivo é acompanhado internamente.',
  },
  {
    numero: '02',
    titulo: 'Projeto personalizado',
    texto: 'Cada projeto é desenvolvido considerando espaço, rotina e estilo.',
  },
  {
    numero: '03',
    titulo: 'Materiais selecionados',
    texto: 'MDF, MDP, madeira maciça e ferragens de alta resistência.',
  },
  {
    numero: '04',
    titulo: 'Instalação especializada',
    texto: 'Montagem precisa e atenção aos detalhes.',
  },
]
