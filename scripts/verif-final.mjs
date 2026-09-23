/** Confere fonte, ausência do "M O D" no hero e velocidade do X. */
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

const res = {}

async function abrir(w, h) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 })
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }])
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' })
  await page.evaluate(() => document.fonts.ready)
  await espera(1800)
  return page
}

const page = await abrir(1440, 900)

// FONTE
res.fonte = await page.evaluate(async () => {
  await document.fonts.ready
  const t = (sel) => {
    const el = document.querySelector(sel)
    return el ? getComputedStyle(el).fontFamily.split(',')[0].replace(/"/g, '') : null
  }
  return {
    carregada: document.fonts.check('600 40px "Bricolage Grotesque"'),
    hero: t('.hero__title'),
    projetos: t('#pf-titulo'),
    processo: t('#proc-titulo'),
    header_nav: t('.header__link'),
    header_wa: t('.header__wa'),
    body: t('.hero__support'),
  }
})

// HERO SEM "M O D"
res.hero = await page.evaluate(() => {
  const hero = document.querySelector('.hero')
  const texto = hero.innerText.replace(/\s+/g, ' ').trim()
  return {
    temMarcaMod: Boolean(document.querySelector('.hero__mark')),
    temKicker: Boolean(document.querySelector('.hero__kicker')),
    iniciaCom: texto.slice(0, 90),
    contemMOD: /M\s*O\s*D/.test(texto),
  }
})

// VELOCIDADE DO X
{
  const lerTx = (sel) =>
    page.$eval(sel, (el) => {
      const m = /matrix\(1, 0, 0, 1, (-?[\d.]+),/.exec(getComputedStyle(el).transform)
      return m ? parseFloat(m[1]) : 0
    })
  const a = await lerTx('.mqx__band--front .mq__track')
  const c = await lerTx('.mqx__band--back .mq__track')
  await espera(1000)
  const b = await lerTx('.mqx__band--front .mq__track')
  const d = await lerTx('.mqx__band--back .mq__track')
  res.x = {
    frentePxPorSeg: Math.round(Math.abs(b - a)),
    trasPxPorSeg: Math.round(Math.abs(d - c)),
    sentidosOpostos: Math.sign(b - a) !== Math.sign(d - c),
  }
}

await page.screenshot({ path: path.join(OUT, 'f1-hero-desktop.png') })
await page.close()

const mob = await abrir(390, 844)
await mob.screenshot({ path: path.join(OUT, 'f2-hero-mobile.png') })
await mob.close()

await browser.close()
fs.writeFileSync(path.join(OUT, 'final.json'), JSON.stringify(res, null, 2))
console.log(JSON.stringify(res, null, 2))
