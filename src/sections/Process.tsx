import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { etapas, processoIntro } from '../data/process'
import { useSyncedStep } from '../hooks/useUi'
import { Reveal } from '../components/Reveal'
import { TitleReveal } from '../components/TitleReveal'
import './Process.css'

/* Mesma cadência e mesma referência de tempo dos Diferenciais: as duas seções
   avançam juntas (01+01, 02+02, ...). */
const INTERVALO = 1500

interface Posicao {
  x: number
  y: number
}

export function Process() {
  const total = etapas.length
  const ativo = useSyncedStep(total, INTERVALO)
  const [pos, setPos] = useState<Posicao>({ x: 0, y: 0 })
  const listaRef = useRef<HTMLOListElement>(null)

  /* O fio e o ponto luminoso seguem a posição real do marcador ativo,
     medidos no layout — assim acompanham as colunas em qualquer largura.
     A lista é o referencial: ela começa exatamente onde o fio está. */
  useEffect(() => {
    const cont = listaRef.current
    if (!cont) return

    const medir = () => {
      const marcas = cont.querySelectorAll<HTMLElement>('.proc__dot')
      const marca = marcas[ativo]
      if (!marca) return
      const c = cont.getBoundingClientRect()
      const d = marca.getBoundingClientRect()
      const proximo = { x: d.left - c.left + d.width / 2, y: d.top - c.top + d.height / 2 }
      setPos((atual) =>
        Math.abs(atual.x - proximo.x) < 0.5 && Math.abs(atual.y - proximo.y) < 0.5
          ? atual
          : proximo,
      )
    }

    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [ativo])

  const estilo = { '--spark-x': `${pos.x}px`, '--spark-y': `${pos.y}px` } as CSSProperties

  return (
    <section className="proc section" id="processo" aria-labelledby="proc-titulo">
      <div className="container container--wide">
        <header className="proc__head">
          <Reveal className="section-head__top" fx="fade">
            <span className="label">Processo</span>
            <span className="section-head__index">Quatro etapas</span>
          </Reveal>

          <TitleReveal
            as="h2"
            id="proc-titulo"
            className="proc__title"
            linhas={[processoIntro.titulo]}
            delay={80}
          />

          <Reveal as="p" className="lead proc__lead" delay={180}>
            {processoIntro.texto}
          </Reveal>
        </header>

        <Reveal className="proc__steps" fx="fade">
          <div className="proc__track" style={estilo} aria-hidden="true">
            <span className="proc__fill" />
            <span className="proc__spark" />
          </div>

          <ol className="proc__list" ref={listaRef}>
            {etapas.map((etapa, i) => (
              <li
                key={etapa.numero}
                className={`proc__step${i === ativo ? ' is-active' : ''}`}
                style={{ '--i': i } as CSSProperties}
                aria-current={i === ativo ? 'step' : undefined}
              >
                <span className="proc__dot" aria-hidden="true" />
                <span className="proc__num">{etapa.numero}</span>
                <h3 className="proc__step-title">{etapa.titulo}</h3>
                <p className="proc__step-text">{etapa.texto}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
