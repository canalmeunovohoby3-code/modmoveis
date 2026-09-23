/**
 * Verificação visual e comportamental no navegador (Chrome + puppeteer-core).
 *
 * Mede, na página real:
 *  - movimento das duas faixas em X (transform em instantes diferentes);
 *  - troca do item ativo em Processo e Diferenciais ao longo do tempo;
 *  - overflow horizontal em desktop e mobile;
 *  - screenshots para inspeção visual.
 *
 * Uso: node scripts/verificar.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer-core'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const URL = process.env.MOD_URL ?? 'http://localhost:5173/'
const OUT = 'C:\\Users\\TIAGO\\AppData\\Local\\Temp\\kilo\\mod-shots'

fs.mkdirSync(OUT, { recursive: true })

const espera = (ms) => new Promise((r) => setTimeout(r, ms))
const relatorio = { url: URL, marquee: {}, processo: {}, diferenciais: {}, overflow: {} }

/** Diagnóstico: classes, opacity e estado dos itens animados. */
async function diagnosticar(page) {
  return page.evaluate(() => {
    const info = (sel) =>
      Array.from(document.querySelectorAll(sel)).map((el) => ({
        classe: el.getAttribute('class'),
        opacity: Number(getComputedStyle(el).opacity).toFixed(2),
        visivel: el.classList.contains('is-visible'),
        ativo:
          el.dataset.ativo ?? (el.classList.contains('is-active') ? 'true' : 'false'),
      }))
    const hero = document.querySelector('.hero')?.getBoundingClientRect()
    const x = document.querySelector('.mqx')?.getBoundingClientRect()
    const bands = Array.from(document.querySelectorAll('.mqx__band')).map((el) => {
      const r = el.getBoundingClientRect()
      return { top: Math.round(r.top), altura: Math.round(r.height), largura: Math.round(r.width) }
    })
    return {
      df: info('#diferenciais .df__item'),
      proc: info('#processo .proc__step'),
      hero: hero ? { altura: Math.round(hero.height), base: Math.round(hero.bottom) } : null,
      x: x ? { topo: Math.round(x.top), altura: Math.round(x.height) } : null,
      sobreposicao: hero && x ? Math.round(hero.bottom - x.top) : null,
      faixas: bands,
      viewport: window.innerHeight,
    }
  })
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--force-device-scale-factor=1'],
})

async function novaPagina(width, height, reduced = 'no-preference') {
  const page = await browser.newPage()
  await page.setViewport({ width, height, deviceScaleFactor: 1 })
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: reduced }])
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 })
  await page.evaluate(() => (document.fonts ? document.fonts.ready : null))
  await espera(1400)
  return page
}

async function navegarPara(page, id) {
  await page.evaluate((alvo) => document.getElementById(alvo)?.scrollIntoView({ block: 'center' }), id)
  await espera(1100)
}

async function verificarMarquee(page, chave, seletor) {
  const ler = () => page.$eval(seletor, (el) => getComputedStyle(el).transform)
  const t0 = await ler()
  await espera(650)
  const t1 = await ler()
  await espera(650)
  const t2 = await ler()
  relatorio.marquee[chave] = { t0, t1, t2, move: t0 !== t1 && t1 !== t2 }
}

async function amostrarAtivos(page, seletor, duracaoMs) {
  const amostras = []
  const inicio = Date.now()
  while (Date.now() - inicio < duracaoMs) {
    const idx = await page.$$eval(seletor, (els) =>
      els.findIndex(
        (el) => el.dataset.ativo === 'true' || el.classList.contains('is-active'),
      ),
    )
    const t = Math.round((Date.now() - inicio) / 100) / 10
    if (amostras.length === 0 || amostras[amostras.length - 1].i !== idx) {
      amostras.push({ t, i: idx })
    }
    await espera(120)
  }
  return amostras
}

// ---------------- DESKTOP ----------------
{
  const page = await novaPagina(1440, 900)

  relatorio.overflow.desktop = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    ok: document.documentElement.scrollWidth <= window.innerWidth + 1,
  }))

  await page.screenshot({ path: path.join(OUT, '01-hero-desktop.png') })
  await verificarMarquee(page, 'frente', '.mqx__band--front .mq__track')
  await verificarMarquee(page, 'tras', '.mqx__band--back .mq__track')

  // Enquadra hero + X juntos
  await page.evaluate(() => window.scrollTo(0, window.innerHeight - 520))
  await espera(600)
  await page.screenshot({ path: path.join(OUT, '02-hero-x-desktop.png') })

  await navegarPara(page, 'processo')
  relatorio.processo.desktop = await amostrarAtivos(page, '#processo .proc__step', 9000)
  await page.screenshot({ path: path.join(OUT, '03-processo-desktop.png') })

  await navegarPara(page, 'diferenciais')
  relatorio.diferenciais.desktop = await amostrarAtivos(page, '#diferenciais .df__item', 9000)
  await page.screenshot({ path: path.join(OUT, '04-diferenciais-desktop.png') })

  await page.evaluate(() => window.scrollTo(0, 0))
  await espera(800)
  relatorio.geometriaDesktop = await diagnosticar(page)
  await page.screenshot({ path: path.join(OUT, '09-hero-completo-desktop.png') })

  await page.close()
}

// ---------------- MOBILE ----------------
{
  const page = await novaPagina(390, 844)

  relatorio.overflow.mobile = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    ok: document.documentElement.scrollWidth <= window.innerWidth + 1,
  }))

  await page.evaluate(() => window.scrollTo(0, 0))
  await espera(700)
  await page.screenshot({ path: path.join(OUT, '10-hero-mobile.png') })

  await page.evaluate(() => window.scrollTo(0, window.innerHeight - 420))
  await espera(600)
  await page.screenshot({ path: path.join(OUT, '05-hero-x-mobile.png') })

  await verificarMarquee(page, 'frente-mobile', '.mqx__band--front .mq__track')
  await verificarMarquee(page, 'tras-mobile', '.mqx__band--back .mq__track')

  await navegarPara(page, 'processo')
  relatorio.processo.mobile = await amostrarAtivos(page, '#processo .proc__step', 7000)
  await page.screenshot({ path: path.join(OUT, '06-processo-mobile.png') })

  await navegarPara(page, 'diferenciais')
  relatorio.diferenciais.mobile = await amostrarAtivos(page, '#diferenciais .df__item', 7000)
  await page.screenshot({ path: path.join(OUT, '07-diferenciais-mobile.png') })

  await page.evaluate(() => window.scrollTo(0, 0))
  await espera(700)
  relatorio.geometriaMobile = await diagnosticar(page)

  await page.close()
}

// ---------------- REDUCED MOTION ----------------
{
  const page = await novaPagina(1280, 800, 'reduce')
  const seletor = '.mqx__band--front .mq__track'
  const a = await page.$eval(seletor, (el) => getComputedStyle(el).transform)
  await espera(800)
  const b = await page.$eval(seletor, (el) => getComputedStyle(el).transform)
  relatorio.reducedMotion = {
    dataMotion: await page.evaluate(() => document.documentElement.dataset.motion),
    marqueeMove: a !== b,
    a,
    b,
  }
  await navegarPara(page, 'processo')
  relatorio.reducedMotion.processo = await amostrarAtivos(page, '#processo .proc__step', 7000)
  await navegarPara(page, 'diferenciais')
  relatorio.reducedMotion.diferenciais = await amostrarAtivos(page, '#diferenciais .df__item', 7000)
  await page.close()
}

// ---------------- LOGO ----------------
{
  const page = await novaPagina(1440, 900)
  relatorio.logo = await page.evaluate(() => {
    const info = (sel) => {
      const el = document.querySelector(sel)
      if (!el) return null
      const r = el.getBoundingClientRect()
      return {
        carregada: el.complete && el.naturalWidth > 0,
        natural: `${el.naturalWidth}x${el.naturalHeight}`,
        altura: Math.round(r.height),
        largura: Math.round(r.width),
      }
    }
    return { header: info('.header .logo__img'), footer: info('.footer .logo__img') }
  })
  await page.close()
}

await browser.close()

fs.writeFileSync(path.join(OUT, 'relatorio.json'), JSON.stringify(relatorio, null, 2))
console.log(JSON.stringify(relatorio, null, 2))
console.log('\nScreenshots em: ' + OUT)
