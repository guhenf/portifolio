// Motor do mini game de basquete em canvas, sem dependências.
// Arraste a bola pra trás e solte (estilingue). Cada cesta chama onScore e solta uma palavra.

export type Game = {
  autoShot: () => void
  setSession: (n: number) => void
  destroy: () => void
}

type Options = { words: string[]; onScore: () => void }
type Ball = { x: number; y: number; vx: number; vy: number; r: number }
type Floater = { text: string; x: number; y: number; age: number }
type Aim = { x0: number; y0: number; x: number; y: number }

const COLORS = {
  skyTop: '#0c1511',
  skyBottom: '#16251e',
  floor: '#22352b',
  mint: '#b8f5d0',
  pole: '#3c5248',
  board: '#e9efec',
  ball: '#e8742c',
  seam: '#3a1d0a',
  net: 'rgba(238,243,240,.7)',
}

export function createGame(canvas: HTMLCanvasElement, { words, onScore }: Options): Game {
  const ctx = canvas.getContext('2d')!
  let W = 0, H = 0, S = 1
  let rimY = 0, rimL = 0, rimR = 0, boardX = 0, floorY = 0
  let ball: Ball = { x: 0, y: 0, vx: 0, vy: 0, r: 15 }
  let state: 'rest' | 'fly' = 'rest'
  let aim: Aim | null = null
  let shotTime = 0, scored = false, spin = 0, session = 0, lastWord = -1
  let floaters: Floater[] = []
  let raf = 0, last = performance.now()

  const gravity = () => 1500 * S

  const reset = () => {
    ball = { x: Math.max(48 * S, W * 0.16), y: floorY - 16 * S, vx: 0, vy: 0, r: 15 * S }
    state = 'rest'; shotTime = 0; scored = false
  }

  const layout = () => {
    const b = canvas.getBoundingClientRect()
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    W = b.width; H = b.height
    canvas.width = W * dpr; canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    S = Math.min(H / 420, W / 560)
    floorY = H - 30 * S
    rimY = H * 0.42
    boardX = W - Math.max(40 * S, W * 0.1)
    rimR = boardX - 8 * S
    rimL = rimR - 66 * S
    if (state !== 'fly') reset()
  }
  const resizeObserver = new ResizeObserver(layout)
  resizeObserver.observe(canvas)

  const launch = (vx: number, vy: number) => {
    ball.vx = vx; ball.vy = vy; state = 'fly'; shotTime = 0; scored = false
  }

  const score = () => {
    scored = true
    let i: number
    do { i = Math.floor(Math.random() * words.length) } while (i === lastWord && words.length > 1)
    lastWord = i
    floaters.push({ text: words[i], x: (rimL + rimR) / 2, y: rimY - 24 * S, age: 0 })
    onScore()
  }

  // Arremesso calculado: resolve a parábola pra cair no meio do aro em T segundos
  const autoShot = () => {
    if (state === 'fly') return
    const T = 1.05
    const tx = (rimL + rimR) / 2 + 4 * S, ty = rimY - 2 * S
    launch((tx - ball.x) / T, (ty - ball.y - 0.5 * gravity() * T * T) / T)
  }

  const pointer = (e: PointerEvent) => {
    const b = canvas.getBoundingClientRect()
    return { x: e.clientX - b.left, y: e.clientY - b.top }
  }
  const aimVelocity = (a: Aim) => {
    const k = 6.5
    let vx = (a.x0 - a.x) * k, vy = (a.y0 - a.y) * k
    const m = Math.hypot(vx, vy), cap = 1200 * S
    if (m > cap) { vx *= cap / m; vy *= cap / m }
    return { vx, vy, m: Math.min(m, cap) }
  }
  const onDown = (e: PointerEvent) => {
    if (state !== 'rest') return
    const p = pointer(e)
    aim = { x0: p.x, y0: p.y, x: p.x, y: p.y }
    canvas.setPointerCapture(e.pointerId)
    canvas.style.cursor = 'grabbing'
  }
  const onMove = (e: PointerEvent) => {
    if (!aim) return
    const p = pointer(e); aim.x = p.x; aim.y = p.y
  }
  const onUp = () => {
    if (!aim) return
    const v = aimVelocity(aim)
    aim = null; canvas.style.cursor = 'grab'
    if (v.m > 60 * S) launch(v.vx, v.vy)
  }
  const onCancel = () => { aim = null }
  canvas.addEventListener('pointerdown', onDown)
  canvas.addEventListener('pointermove', onMove)
  canvas.addEventListener('pointerup', onUp)
  canvas.addEventListener('pointercancel', onCancel)

  // Colisão da bola com a ponta do aro (tratada como um ponto)
  const hitPoint = (px: number, py: number) => {
    const dx = ball.x - px, dy = ball.y - py, d = Math.hypot(dx, dy), min = ball.r + 3 * S
    if (d < min && d > 0) {
      const nx = dx / d, ny = dy / d
      ball.x = px + nx * min; ball.y = py + ny * min
      const vn = ball.vx * nx + ball.vy * ny
      if (vn < 0) { ball.vx -= 1.55 * vn * nx; ball.vy -= 1.55 * vn * ny }
    }
  }

  const step = (dt: number) => {
    floaters.forEach(f => { f.age += dt; f.y -= 34 * S * dt })
    floaters = floaters.filter(f => f.age < 2.6)
    if (state !== 'fly') return

    shotTime += dt
    ball.vy += gravity() * dt
    const prevY = ball.y
    ball.x += ball.vx * dt; ball.y += ball.vy * dt
    spin += (ball.vx * dt) / ball.r

    hitPoint(rimL, rimY); hitPoint(rimR, rimY)

    const hitsBoard = ball.x + ball.r > boardX && ball.x < boardX + 10 * S &&
      ball.y > rimY - 104 * S && ball.y < rimY + 14 * S && ball.vx > 0
    if (hitsBoard) { ball.x = boardX - ball.r; ball.vx *= -0.55 }

    const throughHoop = prevY < rimY && ball.y >= rimY &&
      ball.x > rimL + 2 * S && ball.x < rimR - 2 * S && ball.vy > 0
    if (!scored && throughHoop) score()

    if (ball.y + ball.r > floorY) { ball.y = floorY - ball.r; ball.vy *= -0.5; ball.vx *= 0.82 }
    if (ball.x < -60 || ball.x > W + 60 || shotTime > 4.2) reset()
  }

  const draw = () => {
    const sky = ctx.createLinearGradient(0, 0, 0, H)
    sky.addColorStop(0, COLORS.skyTop); sky.addColorStop(1, COLORS.skyBottom)
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H)

    // estrelas
    ctx.fillStyle = 'rgba(184,245,208,.5)'
    for (let i = 0; i < 26; i++) {
      const x = (i * 97.3) % W, y = ((i * 53.7) % (rimY * 0.9)) + 8
      ctx.beginPath(); ctx.arc(x, y, i % 3 ? 1 : 1.6, 0, Math.PI * 2); ctx.fill()
    }

    // chão
    ctx.fillStyle = COLORS.floor; ctx.fillRect(0, floorY, W, H - floorY)
    ctx.fillStyle = COLORS.mint; ctx.fillRect(0, floorY, W, 2 * S)

    // poste e tabela
    ctx.strokeStyle = COLORS.pole; ctx.lineWidth = 8 * S; ctx.beginPath()
    ctx.moveTo(boardX + 22 * S, rimY - 40 * S); ctx.lineTo(boardX + 22 * S, floorY)
    ctx.moveTo(boardX + 6 * S, rimY - 30 * S); ctx.lineTo(boardX + 22 * S, rimY - 30 * S)
    ctx.stroke()
    ctx.fillStyle = COLORS.board; ctx.fillRect(boardX, rimY - 104 * S, 7 * S, 118 * S)

    // mira
    if (aim) {
      const v = aimVelocity(aim)
      ctx.fillStyle = 'rgba(184,245,208,.75)'
      for (let t = 0.06; t < 0.75; t += 0.06) {
        const x = ball.x + v.vx * t, y = ball.y + v.vy * t + 0.5 * gravity() * t * t
        ctx.beginPath(); ctx.arc(x, y, 3 * S * (1 - t), 0, Math.PI * 2); ctx.fill()
      }
    }

    // bola
    const r = ball.r
    ctx.save(); ctx.translate(ball.x, ball.y); ctx.rotate(spin)
    ctx.fillStyle = COLORS.ball; ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = COLORS.seam; ctx.lineWidth = 1.8 * S; ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(-r, 0); ctx.lineTo(r, 0); ctx.moveTo(0, -r); ctx.lineTo(0, r)
    ctx.moveTo(-r * 0.7, -r * 0.7); ctx.quadraticCurveTo(-r * 0.2, 0, -r * 0.7, r * 0.7)
    ctx.moveTo(r * 0.7, -r * 0.7); ctx.quadraticCurveTo(r * 0.2, 0, r * 0.7, r * 0.7)
    ctx.stroke(); ctx.restore()

    // rede (desenhada depois da bola, pra bola passar por dentro)
    const netBottom = rimY + 44 * S, inL = rimL + 12 * S, inR = rimR - 12 * S
    ctx.strokeStyle = COLORS.net; ctx.lineWidth = 1.5 * S; ctx.beginPath()
    for (let i = 0; i <= 5; i++) {
      const t = i / 5
      ctx.moveTo(rimL + (rimR - rimL) * t, rimY); ctx.lineTo(inL + (inR - inL) * t, netBottom)
    }
    for (let j = 1; j <= 3; j++) {
      const t = j / 3
      ctx.moveTo(rimL + (inL - rimL) * t, rimY + 44 * S * t); ctx.lineTo(rimR + (inR - rimR) * t, rimY + 44 * S * t)
    }
    ctx.stroke()

    // aro
    ctx.strokeStyle = COLORS.ball; ctx.lineWidth = 5 * S; ctx.lineCap = 'round'
    ctx.beginPath(); ctx.moveTo(rimL, rimY); ctx.lineTo(rimR + 6 * S, rimY); ctx.stroke()

    // palavras
    ctx.textAlign = 'center'
    ctx.font = `700 ${Math.round(Math.max(20, 30 * S))}px "Space Grotesk", sans-serif`
    for (const f of floaters) {
      ctx.globalAlpha = f.age < 0.3 ? f.age / 0.3 : Math.max(0, 1 - (f.age - 0.3) / 2.3)
      ctx.fillStyle = COLORS.mint
      ctx.fillText(f.text, Math.min(Math.max(f.x, 90), W - 90), f.y)
    }
    ctx.globalAlpha = 1

    if (state === 'rest' && !aim && session === 0) {
      ctx.fillStyle = 'rgba(238,243,240,.75)'; ctx.textAlign = 'left'
      ctx.font = `500 ${Math.round(Math.max(14, 16 * S))}px Inter, sans-serif`
      ctx.fillText('Arraste pra trás e solte', Math.max(16, ball.x - 30 * S), ball.y - 36 * S)
    }
  }

  const loop = (now: number) => {
    const dt = Math.min(0.033, (now - last) / 1000)
    last = now
    if (W) { for (let i = 0; i < 4; i++) step(dt / 4); draw() }
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)

  return {
    autoShot,
    setSession: n => { session = n },
    destroy: () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onCancel)
    },
  }
}
