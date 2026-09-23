import { useState } from 'react'
import type { CSSProperties } from 'react'
import { navegacao, navegacaoIds, site, whatsappLink } from '../data/site'
import { useActiveSection, useBodyLock, useScrolled } from '../hooks/useUi'
import { Logo } from './Logo'
import { WhatsAppIcon } from './WhatsAppIcon'
import './Header.css'

export function Header() {
  const scrolled = useScrolled(40)
  const ativo = useActiveSection(navegacaoIds)
  const [menuAberto, setMenuAberto] = useState(false)

  useBodyLock(menuAberto)

  return (
    <header
      className={['header', scrolled && 'is-scrolled', menuAberto && 'is-open']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="header__bar container container--wide">
        <Logo />

        <nav className="header__nav" aria-label="Navegação principal">
          {navegacao.map((item) => {
            const id = item.href.replace('#', '')
            return (
              <a
                key={item.href}
                className={`header__link${ativo === id ? ' is-active' : ''}`}
                href={item.href}
                aria-current={ativo === id ? 'true' : undefined}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="header__actions">
          <a
            className="header__wa"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Falar no WhatsApp ${site.telefone.display}`}
          >
            <WhatsAppIcon size={16} />
            <span className="header__wa-label">WhatsApp</span>
          </a>

          <button
            className="header__burger"
            type="button"
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            onClick={() => setMenuAberto((aberto) => !aberto)}
          >
            <span className="sr-only">{menuAberto ? 'Fechar menu' : 'Abrir menu'}</span>
            <span className="header__burger-lines" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div id="menu-mobile" className="header__menu" aria-hidden={!menuAberto}>
        <nav className="header__menu-nav" aria-label="Navegação principal no celular">
          {navegacao.map((item, i) => (
            <a
              key={item.href}
              className="header__menu-link"
              href={item.href}
              onClick={() => setMenuAberto(false)}
              style={{ '--i': i } as CSSProperties}
            >
              <span className="header__menu-index">{String(i + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__menu-foot">
          <a
            className="header__menu-wa"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={18} />
            <span>WhatsApp — {site.telefone.display}</span>
          </a>

          <div className="header__menu-contact">
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
              {site.instagram.handle}
            </a>
            <span>{site.atuacao}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
