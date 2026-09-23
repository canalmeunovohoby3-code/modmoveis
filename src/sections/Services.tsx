import type { CSSProperties } from 'react'
import { servicos, servicosIntro, servicosVideo } from '../data/services'
import { Reveal } from '../components/Reveal'
import { TitleReveal } from '../components/TitleReveal'
import { VideoCard } from '../components/VideoCard'
import './Services.css'

export function Services() {
  return (
    <section className="sv section" id="servicos" aria-labelledby="sv-titulo">
      <div className="container container--wide">
        <header className="sv__head">
          <Reveal className="section-head__top" fx="fade">
            <span className="label">{servicosIntro.label}</span>
            <span className="section-head__index">Sob medida</span>
          </Reveal>

          <TitleReveal
            as="h2"
            id="sv-titulo"
            className="sv__title"
            linhas={[servicosIntro.titulo]}
            delay={80}
          />

          <Reveal as="p" className="lead" delay={180}>
            {servicosIntro.texto}
          </Reveal>
        </header>

        <div className="sv__grid">
          {/* Palco de vídeo: gravação real da empresa, em loop mudo. */}
          <Reveal className="sv__stage" fx="settle">
            <VideoCard item={servicosVideo} ratio="9 / 16" tag="Serviços sob medida" auto />
            <p className="sv__stage-note">{servicosVideo.descricao}</p>
          </Reveal>

          <ol className="sv__list">
            {servicos.map((servico, i) => (
              <li
                key={servico.titulo}
                className="sv__item reveal"
                data-fx="focus"
                style={{ '--reveal-delay': `${Math.min(i, 5) * 70}ms` } as CSSProperties}
              >
                <span className="sv__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="sv__name">{servico.titulo}</h3>
                <p className="sv__desc">{servico.descricao}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
