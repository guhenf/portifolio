import { projects, GITHUB } from '../data'

export default function Projects() {
  return (
    <section className="band" id="projetos">
      <div className="wrap">
        <h2>Projetos</h2>
        <p className="lead">Uma seleção do que está no meu GitHub: projetos pessoais, testes técnicos e estudos.</p>
        <ul className="proj">
          {projects.map(p => (
            <li key={p.repo}>
              <h3>{p.name}</h3>
              <div>
                <p>{p.description}</p>
                <div className="tags">
                  {p.tags.map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
              <div className="links">
                <a href={`${GITHUB}/${p.repo}`}>Código</a>
                {p.live && <a href={p.live}>Ver online</a>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
