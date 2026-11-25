import { useMemo } from 'react'

type Box = { x: number; y: number; angle: number }

// Gerador pseudo-aleatório com semente: o desenho sai igual em toda visita
function seeded(seed: number) {
  let s = seed
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}

function buildBoxes(): { pile: Box[]; cart: Box[] } {
  const rnd = seeded(7)
  const pile: Box[] = []
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 5 - r; c++)
      pile.push({ x: 56 + c * 38 + r * 19, y: 286 - r * 46, angle: (rnd() - 0.5) * 6 })

  const cart: Box[] = []
  ;[6, 5, 4, 2].forEach((n, r) => {
    for (let c = 0; c < n; c++)
      cart.push({ x: 330 + c * 38 + (6 - n) * 19, y: 232 - r * 42, angle: (rnd() - 0.5) * 14 })
  })
  return { pile, cart }
}

function MilkBox({ x, y, angle }: Box) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <rect x={-17} y={-26} width={34} height={44} rx={2} fill="#fff" />
      <path d="M-17 -26 L-10 -36 H10 L17 -26" fill="#fff" stroke="var(--ink)" strokeWidth={2.5} strokeLinejoin="round" />
      <rect x={-17} y={-6} width={34} height={12} fill="#4aa3df" />
      <rect x={-17} y={-26} width={34} height={44} rx={2} fill="none" stroke="var(--ink)" strokeWidth={2.5} />
    </g>
  )
}

export default function MilkBoxes() {
  const { pile, cart } = useMemo(buildBoxes, [])
  return (
    <svg viewBox="0 0 640 340" role="img" aria-label="Ilustração: uma pilha grande de caixas de leite arrecadadas pelo time, ao lado de uma carriola cheia de caixas">
      <path d="M10 316 H630" stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
      {pile.map((b, i) => <MilkBox key={`p${i}`} {...b} />)}
      {cart.map((b, i) => <MilkBox key={`c${i}`} {...b} />)}
      {/* carriola */}
      <path d="M300 250 H560 L540 300 H322 Z" fill="var(--orange)" stroke="var(--ink)" strokeWidth={4} strokeLinejoin="round" />
      <path d="M318 262 H548" stroke="#ffffff" strokeOpacity={0.35} strokeWidth={5} strokeLinecap="round" />
      <path d="M560 252 L620 236" stroke="var(--ink)" strokeWidth={8} strokeLinecap="round" />
      <path d="M340 300 L330 318 M520 300 L530 318" stroke="var(--ink)" strokeWidth={6} strokeLinecap="round" />
      <circle cx={300} cy={300} r={16} fill="var(--ink)" />
      <circle cx={300} cy={300} r={6} fill="var(--mint)" />
    </svg>
  )
}
