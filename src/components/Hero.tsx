import { GITHUB, LINKEDIN } from '../data'

const nav = [
  ['sobre', 'Sobre'],
  ['fora', 'Fora do código'],
  ['projetos', 'Projetos'],
  ['experiencia', 'Experiência'],
  ['kelly', 'Kelly'],
  ['contato', 'Contato'],
]

const stops = [
  ['Quadra', '2012 – 2014'],
  ['Cozinha', '2017 – 2019'],
  ['Química', '2020 – 2021'],
  ['Código', '2023 – hoje'],
]

export default function Hero() {
  return (
    <header className="hero band" id="inicio">
      <div className="wrap">
        <nav aria-label="Principal">
          <a className="logo" href="#inicio">guhenf</a>
          <ul>
            {nav.map(([id, label]) => (
              <li key={id}><a href={`#${id}`}>{label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="top">
          <div>
            <h1>Gustavo Franco</h1>
            <p className="role">Desenvolvedor full stack · Piracicaba, SP</p>
          </div>
          <div>
            <p className="intro">
              Já fui cozinheiro e técnico de laboratório. Hoje construo aplicações web com C#, .NET e React,
              e levo pro código o que a quadra, a cozinha e o laboratório me ensinaram: equipe, ritmo e controle de qualidade.
            </p>
            <div className="btns">
              <a className="btn main" href="#projetos">Ver projetos</a>
              <a className="btn" href={GITHUB}>GitHub</a>
              <a className="btn" href={LINKEDIN}>LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="route" aria-label="Trajetória: quadra, cozinha, química e código">
          <div className="fig">
            <RouteDrawing />
          </div>
          <div className="stops">
            {stops.map(([name, when]) => (
              <div key={name}><b>{name}</b><span>{when}</span></div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

function RouteDrawing() {
  return (
    <svg viewBox="0 -10 1200 260" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M150 170 C 270 170 330 110 450 110 S 630 170 750 170 S 930 110 1050 110" strokeWidth={10} />
        <path d="M40 170 H150 M1050 110 H1170" strokeWidth={10} strokeDasharray="2 22" />
      </g>

      {/* quadra */}
      <g transform="translate(150 170)">
        <circle r={20} fill="var(--hero)" stroke="currentColor" strokeWidth={8} />
        <g transform="translate(0 -84)">
          <circle r={40} fill="var(--orange)" stroke="currentColor" strokeWidth={5} />
          <path d="M-40 0 H40 M0 -40 V40 M-28 -28 Q-6 0 -28 28 M28 -28 Q6 0 28 28" fill="none" stroke="currentColor" strokeWidth={4} />
        </g>
      </g>

      {/* cozinha */}
      <g transform="translate(450 110)">
        <circle r={20} fill="var(--hero)" stroke="currentColor" strokeWidth={8} />
        <g transform="translate(-14 -80)">
          <path d="M-46 14 Q0 30 46 14 L44 22 Q0 40 -44 22Z" fill="currentColor" />
          <ellipse cx={0} cy={22} rx={46} ry={13} fill="currentColor" />
          <rect x={40} y={11} width={56} height={10} rx={5} fill="currentColor" transform="rotate(-8 40 16)" />
          <ellipse cx={-6} cy={14} rx={30} ry={7} fill="var(--mint)" stroke="currentColor" strokeWidth={3} />
          <path d="M-20 -6 q6 -10 0 -20 M-4 -4 q6 -12 0 -24 M12 -6 q6 -10 0 -20" fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" />
        </g>
      </g>

      {/* química */}
      <g transform="translate(750 170)">
        <circle r={20} fill="var(--hero)" stroke="currentColor" strokeWidth={8} />
        <g transform="translate(0 -148)">
          <path d="M-11 0 V30 L-40 84 Q-44 96 -30 96 H30 Q44 96 40 84 L11 30 V0Z" fill="var(--hero)" stroke="currentColor" strokeWidth={6} strokeLinejoin="round" />
          <path d="M-27 64 H27 L38 87 Q40 92 32 92 H-32 Q-40 92 -38 87Z" fill="var(--mint)" stroke="currentColor" strokeWidth={3} />
          <circle cx={-8} cy={78} r={5} fill="currentColor" />
          <circle cx={12} cy={72} r={3.5} fill="currentColor" />
          <path d="M-17 0 H17" stroke="currentColor" strokeWidth={8} strokeLinecap="round" />
        </g>
      </g>

      {/* código */}
      <g transform="translate(1050 110)">
        <circle r={24} fill="currentColor" />
        <circle r={10} fill="var(--mint)" />
        <g transform="translate(-56 -130)">
          <rect width={112} height={76} rx={10} fill="currentColor" />
          <rect x={8} y={8} width={96} height={60} rx={4} fill="var(--mint)" />
          <path d="M38 24 L25 38 L38 52 M74 24 L87 38 L74 52 M62 20 L50 56" fill="none" stroke="#0b0b0b" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M44 76 V90 M68 76 V90 M34 92 H78" stroke="currentColor" strokeWidth={8} strokeLinecap="round" />
        </g>
      </g>

      <circle id="tok" r={9} fill="var(--mint)" stroke="currentColor" strokeWidth={4} />
    </svg>
  )
}
