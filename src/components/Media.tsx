import type { CSSProperties, ElementType, ReactNode } from 'react'
import type { Imagem } from '../types'
import { PlaceholderArt } from './PlaceholderArt'
import './Media.css'

interface MediaProps {
  imagem: Imagem
  /** Proporção CSS, ex. '4 / 5', '16 / 9'. */
  ratio?: string
  className?: string
  sizes?: string
  priority?: boolean
  /** Elemento raiz. Use 'span' quando a mídia estiver dentro de um botão. */
  as?: ElementType
  /** Exibe a etiqueta do placeholder. Desligue em composições lado a lado. */
  tag?: boolean
  /** Conteúdo sobreposto (legenda, selo, gradiente). */
  children?: ReactNode
}

/**
 * Renderiza uma imagem real quando `src` existe; caso contrário, um
 * placeholder arquitetônico identificado. O layout e a moldura são os mesmos
 * nos dois casos, então substituir o arquivo não muda nada visualmente.
 */
export function Media({
  imagem,
  ratio = '4 / 5',
  className,
  sizes,
  priority = false,
  as: Tag = 'figure',
  tag = true,
  children,
}: MediaProps) {
  const { src, webp, alt, art, tone } = imagem

  return (
    <Tag
      className={['media', className].filter(Boolean).join(' ')}
      style={{ '--ratio': ratio } as CSSProperties}
    >
      {src ? (
        <picture className="media__picture">
          {webp && <source srcSet={webp} type="image/webp" />}
          <img
            className="media__img"
            src={src}
            alt={alt}
            sizes={sizes}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
          />
        </picture>
      ) : (
        <span className="media__ph" role="img" aria-label={`${alt} — imagem a substituir`}>
          <PlaceholderArt art={art} tone={tone} />
          {tag && (
            <span className="media__tag" aria-hidden="true">
              <span className="media__tag-mark">M O D</span>
              <span className="media__tag-text">imagem a substituir</span>
            </span>
          )}
        </span>
      )}
      {children}
    </Tag>
  )
}
