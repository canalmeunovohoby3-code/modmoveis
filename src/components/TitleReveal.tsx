import type { CSSProperties, ElementType, ReactNode } from 'react'

interface TitleRevealProps {
  /** Uma linha por item. Aceita markup (ex.: palavra em itálico de acento). */
  linhas: ReactNode[]
  as?: ElementType
  className?: string
  id?: string
  /** Atraso base em ms, somado ao escalonamento entre linhas. */
  delay?: number
}

/**
 * Título com revelação linha a linha: cada linha sobe dentro de uma máscara.
 * A classe `.tr` é ativada pelo observador global (useRevealOnScroll), como
 * o resto do sistema de movimento.
 */
export function TitleReveal({ linhas, as: Tag = 'div', className, id, delay = 0 }: TitleRevealProps) {
  return (
    <Tag
      id={id}
      className={['tr', className].filter(Boolean).join(' ')}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {linhas.map((linha, i) => (
        <span className="tr__line" key={i}>
          <span className="tr__inner" style={{ '--i': i } as CSSProperties}>
            {linha}
          </span>
        </span>
      ))}
    </Tag>
  )
}
