import { useEffect, useState } from 'react'

/** Indica se a página passou de um limite de rolagem (usado no header). */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

/** Descobre qual seção está em foco para o estado da navegação. */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.5, 1] },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids])

  return active
}

/** Trava a rolagem do documento enquanto um overlay está aberto. */
export function useBodyLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return
    document.body.classList.add('is-locked')
    return () => document.body.classList.remove('is-locked')
  }, [locked])
}

/** Observa uma media query (ex.: para trocar interação no mobile). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const list = window.matchMedia(query)
    const onChange = () => setMatches(list.matches)
    onChange()
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/**
 * Ativa o sistema de revelação: observa todo elemento `.reveal` e `.tr` do
 * documento e adiciona `.is-visible` quando ele entra no viewport.
 *
 * A checagem é feita por `getBoundingClientRect` (via requestAnimationFrame),
 * e NÃO por IntersectionObserver: elementos que entram com `clip-path`
 * (`data-fx="mask"`) têm área de interseção zerada, então o observer nunca
 * disparava para eles — as imagens com máscara ficavam invisíveis. O
 * getBoundingClientRect ignora o recorte e resolve isso de forma confiável.
 */
export function useRevealOnScroll(): void {
  useEffect(() => {
    const SELETOR = '.reveal:not(.is-visible), .tr:not(.is-visible)'
    let frame = 0

    const checar = () => {
      frame = 0
      const limite = window.innerHeight * 0.92
      document.querySelectorAll(SELETOR).forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < limite && r.bottom > 0) el.classList.add('is-visible')
      })
    }

    const agendar = () => {
      if (!frame) frame = window.requestAnimationFrame(checar)
    }

    checar()
    window.addEventListener('scroll', agendar, { passive: true })
    window.addEventListener('resize', agendar, { passive: true })

    const mutation = new MutationObserver(agendar)
    mutation.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('scroll', agendar)
      window.removeEventListener('resize', agendar)
      mutation.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])
}

/**
 * Passo de um ciclo de N etapas derivado do relógio absoluto.
 *
 * Como o valor vem de `Date.now() / intervalo`, dois componentes com o mesmo
 * total e o mesmo intervalo mostram SEMPRE o mesmo passo — o ciclo de Processo
 * e o de Diferenciais ficam sincronizados, sem depender de quando cada seção
 * entrou na tela. O timer apenas acorda exatamente na virada de cada etapa.
 */
export function useSyncedStep(total: number, intervaloMs: number): number {
  const calcular = () => Math.floor(Date.now() / intervaloMs) % total
  const [passo, setPasso] = useState(calcular)

  useEffect(() => {
    let id = 0

    const agendar = () => {
      const agora = Date.now()
      const proxima = (Math.floor(agora / intervaloMs) + 1) * intervaloMs
      id = window.setTimeout(
        () => {
          setPasso(Math.floor(Date.now() / intervaloMs) % total)
          agendar()
        },
        proxima - agora + 12,
      )
    }

    setPasso(Math.floor(Date.now() / intervaloMs) % total)
    agendar()
    return () => window.clearTimeout(id)
  }, [total, intervaloMs])

  return passo
}

/**
 * Expõe a preferência de movimento do sistema em `<html data-motion>`.
 * Serve para diagnóstico (saber se o navegador está em "reduzir movimento")
 * sem precisar abrir o console.
 */
export function useMotionFlag(): void {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const list = window.matchMedia('(prefers-reduced-motion: reduce)')
    const aplicar = () => {
      document.documentElement.dataset.motion = list.matches ? 'reduzido' : 'ativo'
    }
    aplicar()
    list.addEventListener('change', aplicar)
    return () => list.removeEventListener('change', aplicar)
  }, [])
}

/**
 * Parallax leve. Elementos com `data-parallax="<fator>"` recebem `--py`
 * proporcional à distância ao centro da tela. Respeita reduced-motion e
 * só roda em ponteiros finos (evita custo no mobile).
 */
export function useParallax(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    if (reduced || !fine) return

    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    if (!items.length) return

    let frame = 0

    const update = () => {
      frame = 0
      const viewportH = window.innerHeight
      items.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const factor = Number(el.dataset.parallax) || 0
        const progress = (rect.top + rect.height / 2 - viewportH / 2) / viewportH
        const offset = Math.max(-1, Math.min(1, progress)) * factor
        el.style.setProperty('--py', `${offset.toFixed(2)}px`)
      })
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])
}
