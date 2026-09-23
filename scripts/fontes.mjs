/** Compara candidatas tipográficas no mesmo título, para decidir com imagem. */
import fs from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer-core'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const OUT = 'C:\\Users\\TIAGO\\AppData\\Local\\Temp\\kilo\\mod-shots'
fs.mkdirSync(OUT, { recursive: true })

const familias = [
  ['Syne', 'Syne:wght@400..800'],
  ['Bricolage Grotesque', 'Bricolage+Grotesque:opsz,wght@12..96,400..800'],
  ['Urbanist', 'Urbanist:wght@400..800'],
  ['Jost', 'Jost:wght@400..700'],
  ['Familjen Grotesk', 'Familjen+Grotesk:wght@400..700'],
  ['Outfit', 'Outfit:wght@400..700'],
]

const links = familias
  .map(([, q]) => `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${q}&display=swap">`)
  .join('\n')

const blocos = familias
  .map(
    ([nome]) => `
  <section>
    <span class="rotulo">${nome}</span>
    <h1 style="font-family:'${nome}', sans-serif">Ambientes pensados<br>para permanecer.</h1>
    <p style="font-family:'${nome}', sans-serif">Como cada ambiente nasce — conhecer, projetar, fabricar, instalar.</p>
  </section>`,
  )
  .join('\n')

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--force-device-scale-factor=1'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1500, height: 2100, deviceScaleFactor: 1 })
await page.setContent(`<!doctype html><html><head><meta charset="utf-8">${links}
<style>
  body{margin:0;background:#150a0a;color:#f8f4ed;padding:34px 40px;font-family:sans-serif}
  section{margin-bottom:38px;border-bottom:1px solid rgba(248,244,237,.12);padding-bottom:26px}
  .rotulo{display:block;font-family:monospace;font-size:13px;letter-spacing:.16em;color:#b69247;text-transform:uppercase;margin-bottom:10px}
  h1{margin:0 0 10px;font-size:74px;line-height:.98;font-weight:600;letter-spacing:-.01em;text-transform:uppercase}
  p{margin:0;font-size:26px;line-height:1.2;font-weight:600}
</style></head><body>${blocos}</body></html>`)
await page.evaluate(() => document.fonts.ready)
await new Promise((r) => setTimeout(r, 2500))
await page.screenshot({ path: path.join(OUT, 'e-fontes.png'), fullPage: true })
await browser.close()
console.log('ok -> ' + path.join(OUT, 'e-fontes.png'))
