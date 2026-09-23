/**
 * Verificação do refinamento: tipografia, header, velocidade das faixas,
 * piscada de borda dos botões e sincronia Processo × Diferenciais.
 */
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

const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }])
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' })
await page.evaluate(() => (document.fonts ? document.fonts.ready : null))
await espera(1600)

const res = {}

// 1. TIPOGRAFIA
res.tipografia = await page.evaluate(() => {
  const t = (sel) => {
    const el = document.querySelector(sel)
    if (!el) return null
    const cs = getComputedStyle(el)
    return { fonte: cs.fontFamily.split(',')[0].replace(/"/g, ''), peso: cs.fontWeight }
  }
  const nav = document.querySelector('.header__link')
  const navE = document.querySelector('.header__nav')
  return {
    hero: t('.hero__title'),
    projetos: t('#pf-titulo'),
    processo: t('#proc-titulo'),
    diferenciais: t('#df-titulo'),
    cta: t('#cta-titulo'),
    header_nav: t('.header__link'),
    header_wa: t('.header__wa'),
    body: t('.hero__support'),
    navLargura: navE ? Math.round(navE.getBoundingClientRect().width) : null,
    navCabe: navE ? navE.scrollWidth <= navE.clientWidth + 1 : null,
  }
})

// 2. VELOCIDADE DAS FAIXAS
const lerTx = (sel) =>
  page.$eval(sel, (el) => {
    const m = /matrix\(1, 0, 0, 1, (-?[\d.]+),/.exec(getComputedStyle(el).transform)
    return m ? parseFloat(m[1]) : 0
  })
{
  const sel = '.mqx__band--front .mq__track'
  const a = await lerTx(sel)
  await espera(1000)
  const b = await lerTx(sel)
  res.faixaFrentePxPorSeg = Math.round(Math.abs(b - a))
}

// 3. PISCADA DE BORDA DOS BOTÕES (só a borda muda)
{
  const amostrar = () =>
    page.evaluate(() => {
      const el = document.querySelector('.hero__ctas .btn')
      const cs = getComputedStyle(el)
      return { sombra: cs.boxShadow, fundo: cs.backgroundColor, cor: cs.color }
    })
  const amostras = []
  for (let i = 0; i < 26; i += 1) {
    amostras.push(await amostrar())
    await espera(120)
  }
  const sombras = new Set(amostras.map((a) => a.sombra))
  const fundos = new Set(amostras.map((a) => a.fundo))
  const cores = new Set(amostras.map((a) => a.cor))
  res.botoes = {
    animacao: await page.$eval('.hero__ctas .btn', (el) => getComputedStyle(el).animationName),
    duracao: await page.$eval('.hero__ctas .btn', (el) => getComputedStyle(el).animationDuration),
    variacoesDeBorda: sombras.size,
    variacoesDeFundo: fundos.size,
    variacoesDeTexto: cores.size,
  }
}

// 4. SINCRONIA PROCESSO × DIFERENCIAIS
{
  const ler = () =>
    page.evaluate(() => {
      const p = Array.from(document.querySelectorAll('#processo .proc__step')).findIndex((el) =>
        el.classList.contains('is-active'),
      )
      const d = Array.from(document.querySelectorAll('#diferenciais .df__item')).findIndex(
        (el) => el.dataset.ativo === 'true',
      )
      return { p, d, t: performance.now() }
    })
  const amostras = []
  const inicio = Date.now()
  while (Date.now() - inicio < 7000) {
    amostras.push(await ler())
    await espera(60)
  }
  const eventos = []
  for (const a of amostras) {
    const ultimo = eventos[eventos.length - 1]
    if (!ultimo || ultimo.p !== a.p || ultimo.d !== a.d) {
      eventos.push({ p: a.p, d: a.d, t: Math.round(a.t) })
    }
  }
  const iguais = amostras.every((a) => a.p === a.d)
  const intervalos = eventos.slice(2).map((e, i) => Math.round(e.t - eventos[i + 1].t))
  res.sincronia = {
    sempreIguais: iguais,
    sequencia: eventos.map((e) => `${e.p}/${e.d}`).join(' '),
    intervalosMs: intervalos,
  }
}

await page.screenshot({ path: path.join(OUT, 'c-tipografia.png') })

fs.writeFileSync(path.join(OUT, 'refino.json'), JSON.stringify(res, null, 2))
console.log(JSON.stringify(res, null, 2))
await browser.close()
