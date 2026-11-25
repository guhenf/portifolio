import { useEffect, useRef, useState } from 'react'
import { createGame, type Game } from '../game/basketball'
import { blessings } from '../data'

const STORAGE_KEY = 'cestasKelly'

function loadTotal() {
  try { return Number(localStorage.getItem(STORAGE_KEY)) || 0 } catch { return 0 }
}

export default function KellySection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<Game | null>(null)
  const [session, setSession] = useState(0)
  const [total, setTotal] = useState(loadTotal)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const game = createGame(canvas, {
      words: blessings,
      onScore: () => {
        setSession(s => s + 1)
        setTotal(t => {
          const next = t + 1
          try { localStorage.setItem(STORAGE_KEY, String(next)) } catch { /* sem storage, segue o jogo */ }
          return next
        })
      },
    })
    gameRef.current = game
    return () => game.destroy()
  }, [])

  useEffect(() => { gameRef.current?.setSession(session) }, [session])

  const shoot = () => gameRef.current?.autoShot()

  return (
    <section className="kelly band" id="kelly">
      <div className="wrap kgrid">
        <div>
          <h2>Uma cesta pela Kelly</h2>
          <p className="dates">Kelly Cristina Silva Cota · ✝ 17 de março de 2020</p>
          <p>
            A Kelly foi pivô e tetracampeã brasileira, com passagem por equipes como Piracicaba, Santo André, Vasco e
            Americana. Desde 2010 ensinava basquete no Instituto Passe de Mágica, em Piracicaba. Foi lá que ela foi
            nossa treinadora.
          </p>
          <p>Ela partiu cedo, aos 39 anos.</p>
          <p>Esse jogo é o meu jeito de continuar fazendo cestas por ela. A cada arremesso certo, uma palavra de carinho sobe pra Kelly.</p>
          <p>E se você for ruim igual uns amigos daquela época, é só clicar no botão “Arremessar”!</p>
        </div>
        <div>
          <div className="court">
            <canvas
              ref={canvasRef}
              tabIndex={0}
              aria-label="Jogo de basquete: arraste para trás e solte para arremessar. Ou use o botão Arremessar."
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); shoot() }
              }}
            />
          </div>
          <div className="gbar">
            <span className="count" aria-live="polite"><b>{session}</b> cestas pela Kelly nesta visita</span>
            <button className="btn" type="button" onClick={shoot}>Arremessar</button>
          </div>
          <p className="hint">
            Arraste a bola pra trás e solte, como um estilingue. No teclado, use Enter ou o botão Arremessar.{' '}
            {total > 0 && `Você já fez ${total} ${total === 1 ? 'cesta' : 'cestas'} por ela.`}
          </p>
        </div>
      </div>
    </section>
  )
}
