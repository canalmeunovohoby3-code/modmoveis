import { marqueeServicos, marqueeValores } from '../data/site'
import { Marquee } from './Marquee'
import './MarqueeX.css'

/**
 * Duas faixas cruzadas em X aberto, logo abaixo (e levemente por cima) do hero.
 *
 * Cada faixa é mais larga que a tela e vai até além das bordas, então não tem
 * começo nem fim visíveis — uma passa por trás da outra no cruzamento. O
 * conteúdo de cada uma segue rolando em direções opostas.
 */
export function MarqueeX() {
  return (
    <div className="mqx" aria-hidden="true">
      {/* Faixa de trás: sobe da esquerda para a direita */}
      <div className="mqx__band mqx__band--back">
        <Marquee items={marqueeValores} reverse duracao={17} className="mq--secondary" />
      </div>

      {/* Faixa da frente: desce da esquerda para a direita */}
      <div className="mqx__band mqx__band--front">
        <Marquee items={marqueeServicos} duracao={14} />
      </div>
    </div>
  )
}
