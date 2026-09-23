import { site, whatsappLink } from '../data/site'
import { PlaceholderArt } from '../components/PlaceholderArt'
import { Reveal } from '../components/Reveal'
import { TitleReveal } from '../components/TitleReveal'
import './FinalCta.css'

export function FinalCta() {
  return (
    <section className="cta is-dark" id="contato" aria-labelledby="cta-titulo">
      <div className="cta__bg" data-parallax="64" aria-hidden="true">
        <PlaceholderArt art="arch" tone={3} />
      </div>
      <div className="cta__scrim" aria-hidden="true" />

      <div className="container container--wide cta__inner">
        {/* Informações à esquerda */}
        <div className="cta__info">
          <Reveal className="section-head__top cta__top" fx="left">
            <span className="label">Contato</span>
            <span className="section-head__index">Vamos projetar</span>
          </Reveal>

          <TitleReveal
            as="h2"
            id="cta-titulo"
            className="cta__title"
            delay={80}
            linhas={['Seu próximo ambiente', 'começa com uma conversa.']}
          />

          <Reveal as="p" className="cta__lead" fx="left" delay={160}>
            Conte-nos o que você imagina. A M O D transforma a ideia em projeto.
          </Reveal>

          <Reveal className="cta__actions" fx="left" delay={240}>
            <a className="btn btn--lg" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <span>Solicitar meu projeto</span>
              <span className="btn__arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="15" height="15">
                  <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </span>
            </a>
            <a className="cta__phone" href={`tel:+${site.telefone.raw}`}>
              <span className="cta__phone-label">WhatsApp</span>
              {site.telefone.display}
            </a>
          </Reveal>

          <Reveal className="cta__meta" fx="left" delay={320}>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
              {site.instagram.handle}
            </a>
            <span>{site.atuacao}</span>
            <span>{site.regioes.slice(1).join(' · ')}</span>
          </Reveal>
        </div>

        {/* Mapa à direita — enquadramento cobrindo a área de atendimento:
            Rio de Janeiro, Niterói e Baixada Fluminense (sem pino de endereço,
            porque a empresa atende a região e não divulga showroom). */}
        <Reveal className="cta__map" fx="zoom" delay={160}>
          <iframe
            className="cta__map-frame"
            src="https://maps.google.com/maps?ll=-22.875,-43.21&z=11&hl=pt-BR&output=embed"
            title="Mapa da área de atendimento: Rio de Janeiro, Niterói e Baixada Fluminense"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <span className="cta__map-tag">
            <span aria-hidden="true">✦</span> Rio de Janeiro · Niterói · Baixada Fluminense
          </span>
        </Reveal>
      </div>
    </section>
  )
}
