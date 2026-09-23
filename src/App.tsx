import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { WhatsAppFloat } from './components/WhatsAppFloat'
import { MarqueeX } from './components/MarqueeX'
import { Hero } from './sections/Hero'
import { Portfolio } from './sections/Portfolio'
import { Testimonials } from './sections/Testimonials'
import { Differentials } from './sections/Differentials'
import { Process } from './sections/Process'
import { About } from './sections/About'
import { Services } from './sections/Services'
import { FinalCta } from './sections/FinalCta'
import { useMotionFlag, useParallax, useRevealOnScroll } from './hooks/useUi'

export function App() {
  useRevealOnScroll()
  useParallax()
  useMotionFlag()

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />

        {/* Assinatura visual da marca: as duas faixas cruzam em X sob o hero */}
        <MarqueeX />

        <Portfolio />
        <Testimonials />
        <Differentials />
        <Process />
        <About />
        <Services />
        <FinalCta />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}
