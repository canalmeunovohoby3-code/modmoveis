/** Capturas + medição da geometria do encontro hero ↔ X, logo e rodapé. */
import fs from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer-core'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const OUT = 'C:\\Users\\TIAGO\\AppData\\Local\\Temp\\kilo\\mod-shots'
fs.mkdirSync(OUT, { recursive: true })
const espera = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--force-device-scale-factor=1'],
})

async function abrir(width, height) {
  const page = await browser.newPage()
  await page.setViewport({ width, height, deviceScaleFactor: 1 })
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }])
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' })
  await page.evaluate(() => (document.fonts ? document.fonts.ready : null))
  await espera(1700)
  return page
}

const medir = (page) =>
  page.evaluate(() => {
    const r = (sel) => {
      const el = document.querySelector(sel)
      return el ? el.getBoundingClientRect() : null
    }
    const hero = r('.hero')
    const zone = r('.mqx')
    const front = r('.mqx__band--front')
    const back = r('.mqx__band--back')
    const galeria = r('#projetos')
    const vw = window.innerWidth
    const vDepth = 0.034 * vw
    // Amostra o que está sob o ponto: se o hero aparecer abaixo do V, falhou.
    const abaixoDoV = []
    for (const x of [3, Math.round(vw * 0.25), Math.round(vw * 0.75), vw - 4]) {
      const y = Math.round(zone.top + 3)
      const el = document.elementFromPoint(x, y)
      abaixoDoV.push({ x, classe: el ? el.className.toString().slice(0, 42) : 'nulo' })
    }
    return {
      vw,
      vDepth: Math.round(vDepth * 10) / 10,
      heroBase: Math.round(hero.bottom),
      vDoHero: Math.round(hero.bottom - vDepth),
      zonaTopo: Math.round(zone.top),
      gap: Math.round(hero.bottom - vDepth - zone.top),
      zonaAltura: Math.round(zone.height),
      faixaFrenteTopo: Math.round(front.top),
      faixaTrasTopo: Math.round(back.top),
      galeriaTopo: Math.round(galeria.top),
      zonaBase: Math.round(zone.bottom),
      heroAbaixoDoV: abaixoDoV,
      corGaleria: getComputedStyle(document.querySelector('#projetos')).backgroundColor,
    }
  })

const res = {}

// DESKTOP
{
  const page = await abrir(1440, 900)
  res.desktop = await medir(page)
  await page.evaluate(() => window.scrollTo(0, window.innerHeight - 560))
  await espera(700)
  await page.screenshot({ path: path.join(OUT, 'b1-hero-x-desktop.png') })
  await page.evaluate(() => window.scrollTo(0, 0))
  await espera(600)
  await page.screenshot({ path: path.join(OUT, 'b2-hero-topo-desktop.png') })
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await espera(900)
  await page.screenshot({ path: path.join(OUT, 'b3-footer-desktop.png') })
  await page.close()
}

// MOBILE
{
  const page = await abrir(390, 844)
  res.mobile = await medir(page)
  await page.evaluate(() => window.scrollTo(0, window.innerHeight - 440))
  await espera(700)
  await page.screenshot({ path: path.join(OUT, 'b4-hero-x-mobile.png') })
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await espera(900)
  await page.screenshot({ path: path.join(OUT, 'b5-footer-mobile.png') })
  await page.close()
}

// TIPOGRAFIA aplicada
{
  const page = await abrir(1440, 900)
  res.tipografia = await page.evaluate(() => {
    const t = (sel) => {
      const el = document.querySelector(sel)
      if (!el) return null
      const cs = getComputedStyle(el)
      return {
        fonte: cs.fontFamily.split(',')[0].replace(/"/g, ''),
        peso: cs.fontWeight,
        tamanho: cs.fontSize,
      }
    }
    return {
      hero: t('.hero__title'),
      projetos: t('#pf-titulo'),
      processo: t('#proc-titulo'),
      diferenciais: t('#df-titulo'),
      sobre: t('#ab-titulo'),
      servicos: t('#sv-titulo'),
      cta: t('#cta-titulo'),
      body: t('.hero__support'),
    }
  })
  res.botoes = await page.evaluate(() => {
    const b = document.querySelector('.hero__ctas .btn')
    const cs = getComputedStyle(b)
    return { animacao: cs.animationName, duracao: cs.animationDuration, overflowOk: b.scrollWidth <= b.clientWidth + 1 }
  })
  await page.close()
}

// ANIMAÇÃO DAS LETRAS (as letras realmente se movem?)
{
  const page = await abrir(1440, 900)
  const ler = () => page.$$eval('.hero__letter', (els) => els.map((e) => getComputedStyle(e).transform))
  const a = await ler()
  await espera(320)
  const b = await ler()
  const c = await ler()
  await espera(400)
  const d = await ler()
  res.letras = {
    total: a.length,
    mudou: a.filter((v, i) => v !== b[i] || v !== d[i]).length,
    amostra: a.slice(0, 3),
  }
  await page.close()
}

await browser.close()
fs.writeFileSync(path.join(OUT, 'geo.json'), JSON.stringify(res, null, 2))
console.log(JSON.stringify(res, null, 2))
