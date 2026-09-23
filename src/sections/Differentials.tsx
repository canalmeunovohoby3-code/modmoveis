import { diferenciais, diferenciaisIntro } from '../data/differentials'
import { useSyncedStep } from '../hooks/useUi'
import { Reveal } from '../components/Reveal'
import { TitleReveal } from '../components/TitleReveal'
import './Differentials.css'

/* Mesma cadência e mesma referência de tempo do Processo: as duas seções
   avançam juntas (01+01, 02+02, ...). */
const INTERVALO = 1500

export function Differentials() {
  const total = diferenciais.length
  const ativo = useSyncedStep(total, INTERVALO)

  return (
    <section className="df section is-dark" id="diferenciais" aria-labelledby="df-titulo">
      <div className="container container--wide">
        <header className="df__head">
          <Reveal className="section-head__top" fx="fade">
            <span className="label">Diferenciais</span>
            <span className="section-head__index">Por que M O D</span>
          </Reveal>

          <TitleReveal
            as="h2"
            id="df-titulo"
            className="df__title"
            delay={80}
            linhas={[
              diferenciaisIntro.titulo[0],
              <em className="accent" key="accent">
                {diferenciaisIntro.titulo[1]}
              </em>,
            ]}
          />

          <Reveal as="p" className="lead df__lead" delay={220}>
            {diferenciaisIntro.texto}
          </Reveal>
        </header>

        <ul className="df__list">
          {diferenciais.map((item, i) => {
            /* O estado ativo vai em `data-ativo` (nunca na classe do elemento
               observado): reescrever o className apagaria o `is-visible`
               aplicado pelo observador de reveal. */
            const on = i === ativo

            return (
              <Reveal
                as="li"
                key={item.numero}
                className="df__item"
                fx="fall"
                delay={i * 140}
                dataAtivo={on}
              >
                <span className="df__line" aria-hidden="true" />
                <span className="df__plate" aria-hidden="true" />
                <span className="df__bar" aria-hidden="true" />
                <span className="df__dot" aria-hidden="true" />
                <span className="df__num" aria-hidden="true">
                  {item.numero}
                </span>
                <h3 className="df__item-title">{item.titulo}</h3>
                <p className="df__text">{item.texto}</p>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
