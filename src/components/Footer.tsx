import { footerServicos, navegacao, site, whatsappLink } from '../data/site'
import { Logo } from './Logo'
import './Footer.css'

export function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer className="footer is-dark">
      <span className="footer__glow" aria-hidden="true" />

      <div className="container container--wide footer__inner">
        <div className="footer__brand">
          <Logo />
          <p className="footer__tagline">{site.descricaoCurta}</p>
          <span className="footer__brand-rule" aria-hidden="true" />
          <p className="footer__note">
            Fabricação própria, projeto personalizado e instalação especializada em {site.atuacao}.
          </p>
        </div>

        <nav className="footer__col" aria-label="Navegação do rodapé">
          <h2 className="footer__title">Navegação</h2>
          <ul className="footer__list">
            {navegacao.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__title">Serviços</h2>
          <ul className="footer__list">
            {footerServicos.map((servico) => (
              <li key={servico}>
                <a href="#servicos">{servico}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h2 className="footer__title">Contato</h2>
          <ul className="footer__list">
            <li>
              <span>{site.atuacao}</span>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp — {site.telefone.display}
              </a>
            </li>
            <li>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                {site.instagram.handle}
              </a>
            </li>
            <li>
              <span>{site.regioes.slice(1).join(' · ')}</span>
            </li>
          </ul>
        </div>
      </div>

      {(site.garantia.confirmado || site.prazo.confirmado) && (
        <div className="container container--wide footer__notes">
          {site.garantia.confirmado && <span>{site.garantia.texto}</span>}
          {site.prazo.confirmado && <span>{site.prazo.texto}</span>}
        </div>
      )}

      <div className="container container--wide footer__base">
        <span>
          © {ano} {site.nomeCompleto}
        </span>
        <span className="footer__sig">Fabricação própria · Projeto sob medida · Rio de Janeiro</span>
      </div>
    </footer>
  )
}
