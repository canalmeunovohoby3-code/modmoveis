import type { CSSProperties } from 'react'
import { hero } from '../data/hero'
import { whatsappLink } from '../data/site'
import { PlaceholderArt } from '../components/PlaceholderArt'
import './Hero.css'

const delay = (ms: number) => ({ '--d': `${ms}ms` } as CSSProperties)

const tituloCompleto = hero.titulo.join(' ')

export function Hero() {
  const temVideo = Boolean(hero.video.src)

  /* Cada letra recebe um índice global: a "soletração" percorre a frase
     inteira na ordem de leitura, atravessando as linhas. */
  let indice = 0
  const linhas = hero.titulo.map((linha, li) => (
    <span className="tr__line" key={li}>
      <span className="tr__inner" style={{ '--i': li } as CSSProperties}>
        {linha.split(' ').map((palavra, pi) => (
          <span className="hero__word" key={pi}>
            {Array.from(palavra).map((letra, ci) => {
              const posicao = indice
              indice += 1
              return (
                <span className="hero__letter" key={ci} style={{ '--li': posicao } as CSSProperties}>
                  {letra}
                </span>
              )
            })}
          </span>
        ))}
      </span>
    </span>
  ))

  return (
    <section className="hero is-dark" id="topo" aria-label="Apresentação M O D">
      <div className="hero__media" aria-hidden="true">
        {temVideo ? (
          <video
            className="hero__video"
            src={hero.video.src ?? undefined}
            poster={hero.video.poster ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : hero.imagem.src ? (
          <img className="hero__img" src={hero.imagem.src} alt="" />
        ) : (
          <div className="hero__ph">
            <PlaceholderArt art="slats" tone={5} />
          </div>
        )}
      </div>

      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__inner container container--wide">
        <p className="hero__eyebrow enter" data-fx="fade" style={delay(160)}>
          {hero.eyebrow.map((item, i) => (
            <span key={item}>
              {item}
              {i < hero.eyebrow.length - 1 && (
                <span className="hero__dot" aria-hidden="true">
                  ✦
                </span>
              )}
            </span>
          ))}
        </p>

        <div className="hero__body">
          <span className="hero__rule enter" data-fx="fade" style={delay(300)} aria-hidden="true" />

          <h1
            className="hero__title tr"
            aria-label={tituloCompleto}
            style={{ '--reveal-delay': '480ms' } as CSSProperties}
          >
            <span className="hero__letters" aria-hidden="true">
              {linhas}
            </span>
          </h1>

          <p className="hero__support enter" data-fx="up" style={delay(820)}>
            {hero.apoio}
          </p>

          <div className="hero__ctas enter" data-fx="up" style={delay(940)}>
            <a className="btn btn--lg" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <span>{hero.ctaPrimario}</span>
              <span className="btn__arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="15" height="15">
                  <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </span>
            </a>
            <a className="btn btn--lg btn--ghost" href="#projetos">
              <span>{hero.ctaSecundario}</span>
            </a>
          </div>
        </div>

        <div className="hero__foot enter" data-fx="fade" style={delay(1060)}>
          <a className="hero__scroll" href="#projetos">
            <span className="hero__scroll-line" aria-hidden="true" />
            {hero.rolagem}
          </a>
          <span className="hero__place">Rio de Janeiro · Região metropolitana</span>
        </div>
      </div>
    </section>
  )
}
