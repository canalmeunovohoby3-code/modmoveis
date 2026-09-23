import type { CSSProperties, ElementType, ReactNode } from 'react'

type Fx =
  /* base */
  | 'up'
  | 'fade'
  | 'scale'
  | 'left'
  | 'right'
  | 'mask'
  | 'curtain'
  /* assinaturas por seção */
  | 'mask-rise'
  | 'wipe'
  | 'focus'
  | 'fall'
  | 'rise'
  | 'settle'
  | 'zoom'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  /** Variante de entrada. Ver src/styles/motion.css */
  fx?: Fx
  /** Atraso em ms, para escalonar elementos irmãos. */
  delay?: number
  className?: string
  id?: string
  /** Estado ligado/desligado exposto como `data-ativo`, sem tocar na classe
   *  (a classe é do observador de reveal e não pode ser reescrita). */
  dataAtivo?: boolean
}

/**
 * Marca um bloco para entrar suavemente quando aparecer no viewport.
 * A classe `.reveal` é ativada pelo observador global em useRevealOnScroll().
 */
export function Reveal({
  children,
  as: Tag = 'div',
  fx = 'up',
  delay = 0,
  className,
  id,
  dataAtivo,
}: RevealProps) {
  return (
    <Tag
      id={id}
      data-ativo={dataAtivo === undefined ? undefined : dataAtivo ? 'true' : 'false'}
      className={['reveal', className].filter(Boolean).join(' ')}
      data-fx={fx}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
