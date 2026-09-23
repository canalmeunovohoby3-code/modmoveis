import { sobre } from '../data/about'
import { Media } from '../components/Media'
import { Reveal } from '../components/Reveal'
import { TitleReveal } from '../components/TitleReveal'
import './About.css'

export function About() {
  return (
    <section className="ab section" id="sobre" aria-labelledby="ab-titulo">
      <div className="container container--wide">
        <div className="ab__grid">
          <div className="ab__text">
            <Reveal className="section-head__top" fx="fade">
              <span className="label">{sobre.label}</span>
              <span className="section-head__index">Estúdio</span>
            </Reveal>

            <TitleReveal
              as="h2"
              id="ab-titulo"
              className="ab__title"
              delay={80}
              linhas={[
                'Precisão começa',
                <em className="accent" key="accent">
                  antes da instalação.
                </em>,
              ]}
            />

            <Reveal as="p" className="lead ab__lead" delay={200}>
              {sobre.texto}
            </Reveal>

            <Reveal as="ul" className="ab__list" fx="up" delay={280}>
              {sobre.destaques.map((item) => (
                <li key={item}>
                  <span className="ab__check" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </Reveal>

            <Reveal as="p" className="ab__foot" fx="fade" delay={340}>
              {sobre.rodape}
            </Reveal>
          </div>

          <div className="ab__media" data-parallax="26">
            <Reveal className="ab__media-main" fx="wipe">
              <Media imagem={sobre.imagem} ratio="3 / 2" sizes="(max-width: 1020px) 100vw, 46vw" />
            </Reveal>

            <Reveal className="ab__media-secondary" fx="wipe" delay={220}>
              <Media imagem={sobre.imagemSecundaria} ratio="4 / 3" tag={false} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
