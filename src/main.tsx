// Os globais entram antes do App de propósito: assim o CSS de cada componente
// é empacotado depois e vence no empate de especificidade. Sem isso, regras de
// componente perdem para as globais.
import './styles/tokens.css'
import './styles/global.css'
import './styles/motion.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'

const container = document.getElementById('root')

if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
