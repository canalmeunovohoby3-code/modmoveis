import type { CSSProperties } from 'react'
import { portfolioIntro, projetos } from '../data/works'
import type { Ratio } from '../types'
import { Media } from '../components/Media'
import { Reveal } from '../components/Reveal'
import { TitleReveal } from '../components/TitleReveal'
import './Portfolio.css'

const proporcoes: Record<Ratio, string> = {
  retrato: '4 / 5',
  vertical: '3 / 4',
  quadrado: '1 / 1',
  paisagem: '4 / 3',
  panorama: '16 / 9',
  largo: '21 / 9',
}

export function Portfolio() {
  return (
    <section className="pf section" id="projetos" aria-labelledby="pf-titulo">
      <div className="container container--wide">
        <header className="pf__head">
          <Reveal className="section-head__top" fx="fade">
            <span className="label">Galeria</span>
            <span className="section-head__index">Seleção de ambientes</span>
          </Reveal>

          <TitleReveal as="h2" id="pf-titulo" className="pf__title" linhas={[portfolioIntro.titulo]} delay={80} />

          <Reveal as="p" className="lead pf__lead" delay={180}>
            {portfolioIntro.texto}
          </Reveal>
        </header>
      </div>

      <div className="pf__gallery">
        <ul className="pf__grid">
          {projetos.map((projeto, i) => {
            const numero = projeto.numero ?? String(i + 1).padStart(2, '0')

            return (
              <li
                key={projeto.id}
                className="pf__item"
                style={{ '--reveal-delay': `${(i % 4) * 90}ms` } as CSSProperties}
              >
                <figure className="pf__frame reveal" data-fx="mask-rise">
                  <div className="pf__mat">
                    <Media
                      as="span"
                      imagem={projeto.capa}
                      ratio={proporcoes[projeto.proporcao]}
                      sizes="(max-width: 700px) 92vw, (max-width: 1180px) 46vw, 31vw"
                    />
                  </div>

                  <figcaption className="pf__plate">
                    <span className="pf__num">Projeto {numero}</span>
                    <span className="pf__rule" aria-hidden="true" />
                  </figcaption>
                </figure>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
