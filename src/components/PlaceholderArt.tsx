import type { ReactElement } from 'react'
import type { Art, Tone } from '../types'

/* ============================================================
   Arte de placeholder.

   Enquanto as fotografias reais não chegam, cada imagem vazia recebe
   uma composição geométrica inspirada em marcenaria — ripados, módulos,
   prateleiras, arcos e grades — desenhada em tons neutros quentes.
   É claramente um placeholder, mas com a mesma direção de arte do site,
   para que a substituição posterior seja trocar o arquivo, e não o layout.
   ============================================================ */

interface Palette {
  a: string
  b: string
  wood: string
  woodDeep: string
}

const palettes: Record<Tone, Palette> = {
  1: { a: '#f6f2ea', b: '#e5ddcc', wood: '#b39272', woodDeep: '#8f6f52' },
  2: { a: '#efe9dd', b: '#dbd0ba', wood: '#9d7c5b', woodDeep: '#7a5c41' },
  3: { a: '#eae3d4', b: '#d0c4ac', wood: '#8a6a4f', woodDeep: '#634b37' },
  4: { a: '#f3eee4', b: '#ded3bf', wood: '#a58256', woodDeep: '#7f6242' },
  5: { a: '#e9e1d1', b: '#cdc0a6', wood: '#84654a', woodDeep: '#5b4433' },
  6: { a: '#f7f3ec', b: '#e0d7c5', wood: '#b89a78', woodDeep: '#93765a' },
}

const GOLD = '#b69247'

/** Gerador pseudoaleatório determinístico: a mesma seed dá sempre a mesma arte. */
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const seedOf = (art: Art, tone: Tone) => tone * 7919 + art.length * 131 + art.charCodeAt(0) * 17

function Slats({ rand, p }: { rand: () => number; p: Palette }) {
  const slats: ReactElement[] = []
  let x = -30
  let i = 0
  while (x < 1030) {
    const w = 10 + rand() * 30
    const dark = rand() > 0.55
    slats.push(
      <rect
        key={`s${i}`}
        x={x}
        y={-30}
        width={w}
        height={1060}
        fill={dark ? p.woodDeep : p.wood}
        opacity={0.16 + rand() * 0.46}
      />,
    )
    x += w + 6 + rand() * 12
    i += 1
  }
  return (
    <g>
      {slats}
      <rect x={-30} y={624} width={1060} height={16} fill={p.woodDeep} opacity={0.5} />
      <rect x={-30} y={737} width={1060} height={7} fill={p.woodDeep} opacity={0.32} />
      <rect x={-30} y={796} width={1060} height={6} fill={GOLD} opacity={0.72} />
    </g>
  )
}

function Modules({ rand, p }: { rand: () => number; p: Palette }) {
  const cols = 3 + Math.floor(rand() * 2)
  const colW = 1000 / cols
  const blocks: ReactElement[] = []
  for (let c = 0; c < cols; c += 1) {
    let y = -20
    let r = 0
    while (y < 1020) {
      const h = 110 + rand() * 240
      blocks.push(
        <rect
          key={`m${c}-${r}`}
          x={c * colW + 14}
          y={y}
          width={colW - 28}
          height={h}
          fill={rand() > 0.5 ? p.wood : p.woodDeep}
          opacity={0.14 + rand() * 0.28}
        />,
        <rect
          key={`o${c}-${r}`}
          x={c * colW + 14}
          y={y}
          width={colW - 28}
          height={h}
          fill="none"
          stroke={p.woodDeep}
          strokeWidth={1.5}
          opacity={0.45}
        />,
      )
      if (rand() > 0.62) {
        blocks.push(
          <rect
            key={`g${c}-${r}`}
            x={c * colW + colW * 0.4}
            y={y + h - 22}
            width={colW * 0.2}
            height={5}
            fill={GOLD}
            opacity={0.75}
          />,
        )
      }
      y += h + 12
      r += 1
    }
  }
  return <g>{blocks}</g>
}

function Shelves({ rand, p }: { rand: () => number; p: Palette }) {
  const items: ReactElement[] = []
  const rows = 6
  for (let r = 0; r < rows; r += 1) {
    const y = 90 + r * 145
    items.push(
      <rect key={`sh${r}`} x={-20} y={y} width={1040} height={6} fill={p.woodDeep} opacity={0.5} />,
    )
    let x = 20 + rand() * 40
    while (x < 930) {
      const w = 40 + rand() * 110
      const h = 34 + rand() * 92
      items.push(
        <rect key={`b${r}-${x}`} x={x} y={y - h} width={w} height={h} fill={p.wood} opacity={0.22 + rand() * 0.3} />,
      )
      x += w + 14 + rand() * 26
    }
  }
  return <g>{items}</g>
}

function Arch({ rand, p }: { rand: () => number; p: Palette }) {
  const lines: ReactElement[] = []
  for (let i = 0; i < 7; i += 1) {
    lines.push(
      <rect
        key={`v${i}`}
        x={80 + i * 130}
        y={-20}
        width={2}
        height={1040}
        fill={p.woodDeep}
        opacity={0.16 + rand() * 0.18}
      />,
    )
  }
  return (
    <g>
      {lines}
      <path
        d="M300 1000 L300 430 A200 200 0 0 1 700 430 L700 1000 Z"
        fill={p.wood}
        opacity={0.26}
      />
      <path
        d="M300 1000 L300 430 A200 200 0 0 1 700 430 L700 1000"
        fill="none"
        stroke={p.woodDeep}
        strokeWidth={2}
        opacity={0.5}
      />
      <path
        d="M470 1000 L470 430 A30 30 0 0 1 530 430 L530 1000"
        fill="none"
        stroke={GOLD}
        strokeWidth={2.5}
        opacity={0.8}
      />
    </g>
  )
}

function Grid({ rand, p }: { rand: () => number; p: Palette }) {
  const lines: ReactElement[] = []
  for (let i = 0; i <= 20; i += 1) {
    lines.push(
      <line key={`gx${i}`} x1={i * 50} y1={0} x2={i * 50} y2={1000} stroke={p.woodDeep} strokeWidth={1} opacity={0.16} />,
      <line key={`gy${i}`} x1={0} y1={i * 50} x2={1000} y2={i * 50} stroke={p.woodDeep} strokeWidth={1} opacity={0.16} />,
    )
  }
  const bx = 150 + rand() * 300
  const by = 180 + rand() * 300
  return (
    <g>
      {lines}
      <rect x={bx} y={by} width={330} height={420} fill={p.wood} opacity={0.24} />
      <rect x={bx} y={by} width={330} height={420} fill="none" stroke={p.woodDeep} strokeWidth={2} opacity={0.5} />
      <rect x={bx} y={by + 300} width={330} height={4} fill={GOLD} opacity={0.8} />
    </g>
  )
}

function Curve({ rand, p }: { rand: () => number; p: Palette }) {
  return (
    <g>
      <rect x={-20} y={-20} width={1040} height={1040} fill={p.wood} opacity={0.1} />
      <path
        d={`M-20 ${520 + rand() * 60} C 220 ${380 + rand() * 60}, 420 ${700 + rand() * 40}, 1020 ${430 + rand() * 60}`}
        fill="none"
        stroke={p.woodDeep}
        strokeWidth={16}
        opacity={0.24}
      />
      <path
        d={`M-20 ${600 + rand() * 60} C 260 ${470 + rand() * 50}, 460 ${770 + rand() * 40}, 1020 ${530 + rand() * 50}`}
        fill="none"
        stroke={GOLD}
        strokeWidth={3}
        opacity={0.72}
      />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={120 + i * 300} y={-20} width={3} height={1040} fill={p.woodDeep} opacity={0.2} />
      ))}
    </g>
  )
}

interface PlaceholderArtProps {
  art?: Art
  tone?: Tone
}

/** Composição SVG que ocupa toda a área da imagem vazia. */
export function PlaceholderArt({ art = 'slats', tone = 1 }: PlaceholderArtProps) {
  const p = palettes[tone] ?? palettes[1]
  const rand = mulberry32(seedOf(art, tone))
  const id = `ph-${art}-${tone}`

  return (
    <svg
      className="media__art"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={p.a} />
          <stop offset="100%" stopColor={p.b} />
        </linearGradient>
        <radialGradient id={`${id}-vig`} cx="0.5" cy="0.38" r="0.8">
          <stop offset="55%" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="100%" stopColor="rgba(30,15,15,0.16)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="1000" height="1000" fill={`url(#${id}-bg)`} />
      {art === 'slats' && <Slats rand={rand} p={p} />}
      {art === 'modules' && <Modules rand={rand} p={p} />}
      {art === 'shelves' && <Shelves rand={rand} p={p} />}
      {art === 'arch' && <Arch rand={rand} p={p} />}
      {art === 'grid' && <Grid rand={rand} p={p} />}
      {art === 'curve' && <Curve rand={rand} p={p} />}
      <rect x="0" y="0" width="1000" height="1000" fill={`url(#${id}-vig)`} />
    </svg>
  )
}
