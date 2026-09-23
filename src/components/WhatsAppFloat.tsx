import { useScrolled } from '../hooks/useUi'
import { site, whatsappLink } from '../data/site'
import { WhatsAppIcon } from './WhatsAppIcon'
import './WhatsAppFloat.css'

/** Botão flutuante de WhatsApp — discreto, aparece após o primeiro bloco. */
export function WhatsAppFloat() {
  const visivel = useScrolled(320)

  return (
    <a
      className={`wa${visivel ? ' is-visible' : ''}`}
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Solicitar orçamento pelo WhatsApp ${site.telefone.display}`}
      aria-hidden={!visivel}
      tabIndex={visivel ? 0 : -1}
    >
      <span className="wa__icon" aria-hidden="true">
        <WhatsAppIcon size={20} />
      </span>
      <span className="wa__label">Solicitar projeto</span>
    </a>
  )
}
