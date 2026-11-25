import { jobs, education, community } from '../data'

export default function Experience() {
  return (
    <section className="band" id="experiencia" style={{ paddingTop: 0 }}>
      <div className="wrap xp">
        <div>
          <h2>Experiência</h2>
          <ul className="tl">
            {jobs.map(j => (
              <li key={j.company + j.when}>
                <span className="when">
                  {j.current && <i className="dot" />}
                  {j.when}
                </span>
                <div>
                  <b>{j.role}</b>
                  <span className="co">{j.company}</span>
                  {j.description && <p>{j.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <aside className="side">
          <h2 style={{ fontSize: 'clamp(28px,3.4vw,36px)' }}>Formação</h2>
          <ul>
            {education.map(([course, where]) => (
              <li key={course + where}>{course}<small>{where}</small></li>
            ))}
          </ul>
          <h3 style={{ marginBottom: 8 }}>Comunidade</h3>
          <ul>
            {community.map(([name, what]) => (
              <li key={name}>{name}<small>{what}</small></li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
