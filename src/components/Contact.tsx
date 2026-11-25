import { EMAIL, GITHUB, LINKEDIN } from '../data'

export default function Contact() {
  return (
    <section className="contact band" id="contato">
      <div className="wrap cgrid">
        <div>
          <h2>Vamos conversar?</h2>
          <p className="intro" style={{ marginTop: 16 }}>
            Aberto a oportunidades como desenvolvedor full stack, e a trocar ideia sobre projetos.
          </p>
        </div>
        <ul className="clist">
          <li><span>E-mail</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          <li><span>GitHub</span><a href={GITHUB}>github.com/guhenf</a></li>
          <li><span>LinkedIn</span><a href={LINKEDIN}>linkedin.com/in/guhenf</a></li>
        </ul>
      </div>
    </section>
  )
}
