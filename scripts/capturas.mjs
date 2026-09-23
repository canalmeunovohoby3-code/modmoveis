/** Capturas de conferência: logo no header, junção hero→X e rodapé. */
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

async function shot(width, height, nome, preparar) {
  const page = await browser.newPage()
  await page.setViewport({ width, height, deviceScaleFactor: 1 })
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }])
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' })
  await page.evaluate(() => (document.fonts ? document.fonts.ready : null))
  await espera(1600)
  if (preparar) await preparar(page)
  await page.screenshot({ path: path.join(OUT, nome) })
  await page.close()
}

// Header + hero no topo
await shot(1440, 900, 'a1-header-logo.png')
// Junção hero -> X
await shot(1440, 900, 'a2-hero-x.png', async (p) => {
  await p.evaluate(() => window.scrollTo(0, window.innerHeight - 560))
  await espera(700)
})
// Junção hero -> X no mobile
await shot(390, 844, 'a3-hero-x-mobile.png', async (p) => {
  await p.evaluate(() => window.scrollTo(0, window.innerHeight - 460))
  await espera(700)
})
// Rodapé
await shot(1440, 900, 'a4-footer.png', async (p) => {
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await espera(900)
})
// Rodapé mobile
await shot(390, 844, 'a5-footer-mobile.png', async (p) => {
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await espera(900)
})

await browser.close()
console.log('capturas ok')
