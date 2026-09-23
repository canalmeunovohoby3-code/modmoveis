import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { VideoItem } from '../types'
import { PlaceholderArt } from './PlaceholderArt'
import './VideoCard.css'

interface VideoCardProps {
  item: VideoItem
  /** Proporção do palco, ex. '4 / 3', '9 / 16'. */
  ratio?: string
  /** Etiqueta do canto. Padrão: "Vídeo" ou "Vídeo a inserir". */
  tag?: string
  /** Reprodução automática, muda e em ciclo quando o palco entra na tela. */
  auto?: boolean
  className?: string
}

/**
 * Card de vídeo em linguagem de galeria: moldura fina com filete interno,
 * thumbnail com máscara, botão de play discreto e zoom sutil no hover.
 *
 * Com `auto`, o arquivo toca sozinho — mudo e em loop — assim que o palco
 * aparece na tela (e pausa ao sair), com um botão para ligar o som. O
 * `preload` só é disparado nesse momento, para não pesar o carregamento.
 *
 * Sem arquivo, permanece como painel de espera identificado — nunca um
 * vídeo de banco de imagens apresentado como trabalho da empresa.
 */
export function VideoCard({ item, ratio = '4 / 3', tag, auto = false, className }: VideoCardProps) {
  const [tocando, setTocando] = useState(false)
  const [mudo, setMudo] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const temArquivo = Boolean(item.mp4 || item.webm)
  const interativo = temArquivo || Boolean(item.externo)
  const rotulo = tag ?? (interativo ? 'Vídeo' : 'Vídeo a inserir')
  const proporcao = { '--ratio': ratio } as CSSProperties
  const autoAtivo = auto && temArquivo

  useEffect(() => {
    if (!autoAtivo) return
    const video = videoRef.current
    if (!video) return

    if (!('IntersectionObserver' in window)) {
      void video.play().catch(() => {})
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [autoAtivo])

  /* ---------- Modo automático: vídeo real em loop mudo ---------- */
  if (autoAtivo) {
    return (
      <div className={['vcard', className].filter(Boolean).join(' ')}>
        <div className="vcard__inner">
          <div className="vcard__frame" style={proporcao}>
            <video
              ref={videoRef}
              className="vcard__media"
              muted={mudo}
              loop
              playsInline
              preload="metadata"
              poster={item.poster ?? undefined}
              aria-label={item.titulo}
            >
              {item.webm && <source src={item.webm} type="video/webm" />}
              {item.mp4 && <source src={item.mp4} type="video/mp4" />}
              Seu navegador não reproduz este vídeo.
            </video>

            <button
              className="vcard__som"
              type="button"
              onClick={() => {
                const video = videoRef.current
                const proximo = !mudo
                setMudo(proximo)
                if (video) video.muted = proximo
              }}
              aria-label={mudo ? 'Ativar som do vídeo' : 'Silenciar vídeo'}
            >
              {mudo ? 'Som' : 'Mudo'}
            </button>

            {tag && <span className="vcard__tag">{tag}</span>}
          </div>
        </div>
      </div>
    )
  }

  const fotograma = (
    <>
      {item.poster ? (
        <img className="vcard__img" src={item.poster} alt="" loading="lazy" decoding="async" />
      ) : (
        <PlaceholderArt art={item.art} tone={item.tone} />
      )}

      <span className="vcard__scrim" aria-hidden="true" />

      <span className="vcard__play" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
        </svg>
      </span>

      <span className="vcard__tag">{rotulo}</span>

      {item.duracao && item.duracao !== '—:—' && (
        <span className="vcard__time" aria-hidden="true">
          {item.duracao}
        </span>
      )}
    </>
  )

  return (
    <div className={['vcard', className].filter(Boolean).join(' ')}>
      <div className="vcard__inner">
        {tocando ? (
          <div className="vcard__frame" style={proporcao}>
            {item.externo ? (
              <iframe
                className="vcard__media"
                src={item.externo}
                title={item.titulo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                className="vcard__media"
                controls
                autoPlay
                playsInline
                poster={item.poster ?? undefined}
              >
                {item.webm && <source src={item.webm} type="video/webm" />}
                {item.mp4 && <source src={item.mp4} type="video/mp4" />}
                Seu navegador não reproduz este vídeo.
              </video>
            )}
          </div>
        ) : interativo ? (
          <button
            type="button"
            className="vcard__frame vcard__frame--btn"
            style={proporcao}
            onClick={() => setTocando(true)}
            aria-label={`Reproduzir vídeo: ${item.titulo}`}
          >
            {fotograma}
          </button>
        ) : (
          <div className="vcard__frame" style={proporcao}>
            {fotograma}
          </div>
        )}
      </div>
    </div>
  )
}
