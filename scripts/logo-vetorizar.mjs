/**
 * Converte os <text> da logo em caminhos vetoriais.
 *
 * O arquivo original (CorelDRAW) traz os textos como <text> apoiados em fontes
 * SVG embutidas (format(svg)), que nenhum navegador moderno carrega. O "O" de
 * MÓD, a linha "MÓVEIS PLANEJADOS" e o telefone acabavam desenhados com a fonte
 * substituta de cada aparelho — daí a diferença entre desktop e mobile.
 *
 * Aqui os contornos são extraídos dos próprios <glyph> embutidos e escritos
 * como <path>, com o mesmo preenchimento. O resultado é vetor puro: idêntico
 * em qualquer navegador, e mais leve (as fontes saem do arquivo).
 */
import fs from 'node:fs'
import path from 'node:path'

const raiz = process.cwd()
const destino = path.join(raiz, 'public', 'logo.svg')
const backupDir = path.join(raiz, '_originais-midia', 'logo')
const origem = path.join(backupDir, 'logo-original.svg')

/* O backup é a fonte: o script pode ser rodado de novo sem acumular edições. */
if (!fs.existsSync(origem)) {
  throw new Error('Backup nao encontrado em _originais-midia/logo/logo-original.svg')
}

let svg = fs.readFileSync(origem, 'utf8')

/* ---------- 1. fontes embutidas ---------- */
const fontes = new Map()
const fonteRe = /<font id="([^"]+)"[^>]*>([\s\S]*?)<\/font>/g
let m
while ((m = fonteRe.exec(svg))) {
  const id = m[1]
  const corpo = m[2]
  const glyphs = new Map()
  const gRe = /<glyph\s+unicode="([^"]+)"\s+horiz-adv-x="([^"]+)"\s+d="([^"]+)"/g
  let g
  while ((g = gRe.exec(corpo))) glyphs.set(g[1], { adv: parseFloat(g[2]), d: g[3] })
  const units = /<font-face[^>]*units-per-em="([^"]+)"/.exec(corpo)
  fontes.set(id, { glyphs, units: units ? parseFloat(units[1]) : 1000 })
}

/* ---------- 2. família -> id da fonte ---------- */
const familiaParaId = new Map()
const ffRe = /@font-face\s*\{\s*font-family:"([^"]+)"[^;]*;[^}]*url\("#([^"]+)"\)\s*format\(svg\)\s*\}/g
while ((m = ffRe.exec(svg))) familiaParaId.set(m[1].trim(), m[2])

/* ---------- 3. classes utilitárias ---------- */
const classes = new Map()
const clsRe = /\.([A-Za-z0-9_]+)\s*\{([^}]*)\}/g
while ((m = clsRe.exec(svg))) classes.set(m[1], m[2])

const lerClasse = (atributo) => {
  const nomes = (atributo || '').split(/\s+/).filter(Boolean)
  let fill = null
  let fonte = null
  nomes.forEach((n) => {
    const corpo = classes.get(n)
    if (!corpo) return
    if (/fill\s*:/.test(corpo)) fill = n
    if (/font-size/.test(corpo)) fonte = corpo
  })
  return { fill, fonte }
}

/* ---------- 4. converte cada <text> ---------- */
const espacoEm = 0.3 // avanço do espaço, em em (não há glifo de espaço)

let convertidos = 0
svg = svg.replace(/<text\s+([^>]*)>([^<]*)<\/text>/g, (todo, atributos, conteudo) => {
  const x0 = parseFloat(/x="([^"]+)"/.exec(atributos)?.[1] ?? '0')
  const y0 = parseFloat(/y="([^"]+)"/.exec(atributos)?.[1] ?? '0')
  const cls = lerClasse(/class="([^"]*)"/.exec(atributos)?.[1])

  if (!cls.fonte) return todo
  const tamanho = parseFloat(/font-size\s*:\s*([\d.]+)px/.exec(cls.fonte)?.[1] ?? '0')
  const familia = /font-family\s*:\s*['"]?([^;'"]+)/.exec(cls.fonte)?.[1]?.trim()
  const fonteId = familia ? familiaParaId.get(familia) : null
  const fonte = fonteId ? fontes.get(fonteId) : null
  if (!fonte || !tamanho) return todo

  const escala = tamanho / fonte.units
  const classe = cls.fill ?? ''
  let x = x0
  const partes = []

  for (const caractere of conteudo) {
    const glifo = fonte.glyphs.get(caractere)
    if (!glifo) {
      x += espacoEm * tamanho
      continue
    }
    const n = (v) => Math.round(v * 1000) / 1000
    partes.push(
      `<path class="${classe}" transform="translate(${n(x)} ${n(y0)}) scale(${n(escala)} ${n(-escala)})" d="${glifo.d}"/>`,
    )
    x += glifo.adv * escala
  }

  convertidos += 1
  return `<g>${partes.join('')}</g>`
})

/* ---------- 5. remove as fontes embutidas (já não são usadas) ---------- */
svg = svg.replace(/<font id="[^"]+"[\s\S]*?<\/font>\s*/g, '')
svg = svg.replace(/\s*@font-face \{ font-family:[^}]*\}\s*/g, '\n    ')
svg = svg.replace(/\s*\.fnt\d+ \{[^}]*\}\s*/g, '\n    ')

/* ---------- 6. degradê próprio para o "O" ----------
   O degradê original do arquivo estava calibrado para a posição do glifo
   substituto; aplicado ao desenho real do "O" ele saía lavado. Aqui o ouro
   metálico é definido em objectBoundingBox, então acompanha a forma. */
const gradienteO = `<linearGradient id="id4" x1="0.08" y1="0" x2="0.86" y2="1">
   <stop offset="0" style="stop-color:#FCF7AE"/>
   <stop offset="0.28" style="stop-color:#F2D97A"/>
   <stop offset="0.52" style="stop-color:#D9B95C"/>
   <stop offset="0.74" style="stop-color:#B6924A"/>
   <stop offset="1" style="stop-color:#7E5A2E"/>
  </linearGradient>`
svg = svg.replace(/<linearGradient id="id4"[\s\S]*?<\/linearGradient>/, gradienteO)

fs.writeFileSync(destino, svg, 'utf8')

const antes = fs.statSync(path.join(backupDir, 'logo-original.svg')).size
const depois = fs.statSync(origem).size
console.log(`textos convertidos: ${convertidos}`)
console.log(`tamanho: ${(antes / 1024).toFixed(1)} KB -> ${(depois / 1024).toFixed(1)} KB`)
console.log(`restam <text>? ${/<text/.test(svg) ? 'sim' : 'nao'}`)
console.log(`restam fontes embutidas? ${/<font /.test(svg) ? 'sim' : 'nao'}`)
