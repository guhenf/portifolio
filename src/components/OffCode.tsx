import MilkBoxes from './MilkBoxes'

export default function OffCode() {
  return (
    <section className="band off" id="fora">
      <div className="wrap">
        <h2>Fora do código</h2>
        <p className="lead">As coisas que não cabem num currículo, mas explicam quem eu sou.</p>

        <div className="apae">
          <MilkBoxes />
          <div>
            <p className="big">Caixas de leite pra APAE, de porta em porta.</p>
            <p>
              Na campanha do projeto pra APAE da cidade, o time inteiro se mobilizou. A minha parte foi sair de casa em
              casa pelos bairros perto de onde eu morava, empurrando uma carriola.
            </p>
            <p>Não lembro o número exato. Lembro das ruas, das portas e da carriola voltando pesada, pra somar com as caixas de todo mundo.</p>
          </div>
        </div>

        <div className="pair">
          <article>
            <Medal />
            <div>
              <h3>Medalha de mérito</h3>
              <p>
                Melhor aluno do Instituto Passe de Mágica, no SESI, entre 2012 e 2014. Foi lá que aprendi que time bom é
                aquele em que todo mundo puxa junto.
              </p>
            </div>
          </article>
          <article>
            <Jersey />
            <div>
              <h3>A camisa que nunca usei</h3>
              <p>A camisa do projeto só veio em tamanho G, e eu sou baixinho. Nunca usei, mas guardo até hoje.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function Medal() {
  return (
    <svg viewBox="0 0 150 150" aria-hidden="true">
      <path d="M48 0 L75 62 L102 0 Z" fill="var(--mint)" stroke="var(--ink)" strokeWidth={4} strokeLinejoin="round" />
      <path d="M62 0 L75 30 L88 0" fill="none" stroke="var(--ink)" strokeWidth={3} />
      <circle cx={75} cy={98} r={44} fill="#d9a92b" stroke="var(--ink)" strokeWidth={5} />
      <circle cx={75} cy={98} r={32} fill="none" stroke="#8a6612" strokeWidth={3} />
      <path d="M75 76 L81 91 L97 92 L85 102 L89 118 L75 109 L61 118 L65 102 L53 92 L69 91Z" fill="#f4d37a" stroke="#8a6612" strokeWidth={2} strokeLinejoin="round" />
      <path d="M50 78 A36 36 0 0 1 66 66" fill="none" stroke="#fff3c4" strokeWidth={5} strokeLinecap="round" />
    </svg>
  )
}

function Jersey() {
  return (
    <svg viewBox="0 0 150 150" aria-hidden="true">
      <path d="M75 6 V18" stroke="var(--ink)" strokeWidth={4} strokeLinecap="round" />
      <path d="M40 30 Q75 8 110 30" fill="none" stroke="var(--ink)" strokeWidth={4} strokeLinecap="round" />
      <path d="M46 28 Q58 26 62 24 Q75 40 88 24 Q92 26 104 28 L106 64 Q108 104 110 142 H40 Q42 104 44 64 Z" fill="var(--mint)" stroke="var(--ink)" strokeWidth={4} strokeLinejoin="round" />
      <path d="M46 28 Q36 42 44 64 M104 28 Q114 42 106 64" fill="none" stroke="var(--ink)" strokeWidth={4} />
      <rect x={66} y={40} width={18} height={16} rx={2} fill="#fff" stroke="var(--ink)" strokeWidth={2} />
      <text x={75} y={53} textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={13} fill="#0b0b0b">G</text>
    </svg>
  )
}
