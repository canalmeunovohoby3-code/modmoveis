/** Congela a piscada no instante em que a borda está acesa, para conferir. */
import path from 'node:path'
import puppeteer from 'puppeteer-core'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const OUT = 'C:\\Users\\TIAGO\\AppData\\Local\\Temp\\kilo\\mod-shots'
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

const congelar = () =>
  page.addStyleTag({
    content: `@keyframes border-blink-frozen {
        0%, 100% { box-shadow: var(--blink-base, 0 0 0 0 rgba(182,146,71,0)), 0 0 0 2px rgba(182,146,71,.95), 0 0 18px 3px rgba(182,146,71,.5); }
      }
      .btn:not(.btn--ghost):not(.btn--ghost-dark),
      .header__wa, .wa, .header__menu-wa {
        animation-name: border-blink-frozen !important;
        animation-duration: 2.3s !important;
      }`,
  })

await congelar()
await espera(300)

// herói + botão principal + WhatsApp do header
await page.screenshot({ path: path.join(OUT, 'd1-botao-borda.png') })

// flutuante + CTA final
await page.evaluate(() => document.getElementById('contato')?.scrollIntoView({ block: 'center' }))
await espera(600)
await page.screenshot({ path: path.join(OUT, 'd2-cta-borda.png') })

// estado normal (sem a piscada) para comparar
await page.reload({ waitUntil: 'networkidle2' })
await espera(1500)
await page.evaluate(() => document.getElementById('contato')?.scrollIntoView({ block: 'center' }))
await espera(600)
await page.screenshot({ path: path.join(OUT, 'd3-cta-normal.png') })

await browser.close()
console.log('ok')
