import type { CSSProperties } from 'react'
import './Marquee.css'

interface MarqueeProps {
  items: string[]
  /** Inverte a direção do movimento. */
  reverse?: boolean
  /** Duração do ciclo completo, em segundos. */
  duracao?: number
  separador?: string
  className?: string
}

/**
 * Faixa institucional com movimento contínuo.
 *
 * O loop é perfeito porque a lista é duplicada e a animação percorre
 * exatamente 50% da largura total, em `linear` e sem pausas — o ponto de
 * retorno coincide com o ponto de partida. Pausa no hover e desliga em
 * `prefers-reduced-motion`.
 */
export function Marquee({
  items,
  reverse = false,
  duracao = 54,
  separador = '✦',
  className,
}: MarqueeProps) {
  return (
    <div className={['mq', reverse && 'mq--reverse', className].filter(Boolean).join(' ')} aria-hidden="true">
      <div className="mq__track" style={{ '--dur': `${duracao}s` } as CSSProperties}>
        {[0, 1].map((copia) => (
          <div className="mq__group" key={copia}>
            {items.map((item, i) => (
              <span className="mq__item" key={`${copia}-${i}`}>
                <span className="mq__label">{item}</span>
                <span className="mq__sep">{separador}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
