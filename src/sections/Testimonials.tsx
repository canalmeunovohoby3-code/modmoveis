import { useEffect, useState } from 'react'
import { depoimentos, depoimentosIntro } from '../data/testimonials'
import { useMediaQuery } from '../hooks/useUi'
import { Reveal } from '../components/Reveal'
import { TitleReveal } from '../components/TitleReveal'
import './Testimonials.css'

export function Testimonials() {
  const total = depoimentos.length
  const [ativo, setAtivo] = useState(0)
  const [pausado, setPausado] = useState(false)
  const reduzido = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    if (reduzido || pausado || total < 2) return
    const timer = window.setInterval(() => setAtivo((atual) => (atual + 1) % total), 7000)
    return () => window.clearInterval(timer)
  }, [reduzido, pausado, total])

  const ir = (delta: number) => setAtivo((atual) => (atual + delta + total) % total)
  const atual = depoimentos[ativo]

  return (
    <section className="tm section is-dark" id="depoimentos" aria-labelledby="tm-titulo">
      <div className="container container--narrow">
        <header className="tm__head">
          <Reveal className="section-head__top" fx="fade">
            <span className="label">{depoimentosIntro.label}</span>
          </Reveal>

          <TitleReveal
            as="h2"
            id="tm-titulo"
            className="tm__title"
            linhas={depoimentosIntro.titulo}
            delay={80}
          />
        </header>

        <div
          className="tm__stage reveal"
          data-fx="settle"
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
          onFocus={() => setPausado(true)}
          onBlur={() => setPausado(false)}
        >
          <span className="tm__quote-mark" aria-hidden="true">
            &ldquo;
          </span>

          <div className="tm__slides" aria-live="polite">
            <blockquote className="tm__slide" key={atual.id}>
              <p className="tm__text">{atual.texto}</p>
              <footer className="tm__author">&mdash; {atual.autor}</footer>
            </blockquote>
          </div>

          {total > 1 && (
            <div className="tm__controls">
              <button type="button" className="tm__arrow" onClick={() => ir(-1)} aria-label="Depoimento anterior">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M15 4l-8 8 8 8" stroke="currentColor" strokeWidth="1.4" fill="none" />
                </svg>
              </button>

              <div className="tm__dots" role="tablist" aria-label="Selecionar depoimento">
                {depoimentos.map((dep, i) => (
                  <button
                    key={dep.id}
                    type="button"
                    role="tab"
                    className={`tm__dot${i === ativo ? ' is-active' : ''}`}
                    aria-selected={i === ativo}
                    aria-label={`Depoimento ${i + 1} de ${total}`}
                    onClick={() => setAtivo(i)}
                  />
                ))}
              </div>

              <button type="button" className="tm__arrow" onClick={() => ir(1)} aria-label="Próximo depoimento">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M9 4l8 8-8 8" stroke="currentColor" strokeWidth="1.4" fill="none" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <Reveal as="p" className="tm__aviso" fx="fade">
          {depoimentosIntro.aviso}
        </Reveal>
      </div>
    </section>
  )
}
