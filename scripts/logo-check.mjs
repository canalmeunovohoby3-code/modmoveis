/** Renderiza /logo.svg isolado para conferir como o navegador o desenha. */
import fs from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer-core'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const OUT = 'C:\\Users\\TIAGO\\AppData\\Local\\Temp\\kilo\\mod-shots'
fs.mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1400, height: 700, deviceScaleFactor: 1 })
await page.setContent(`
  <body style="margin:0;display:flex;flex-direction:column;gap:24px;background:#2D1717;padding:40px">
    <img src="http://localhost:5173/logo.svg" style="height:120px" />
    <img src="http://localhost:5173/logo.svg" style="height:56px" />
    <img src="http://localhost:5173/logo.svg" style="height:36px" />
  </body>`)
await new Promise((r) => setTimeout(r, 1500))
await page.screenshot({ path: path.join(OUT, 'logo-check.png') })
await browser.close()
console.log('ok -> ' + path.join(OUT, 'logo-check.png'))
