import { stackMain, stackOther, languages, stackOther2 } from '../data'

export default function About() {
  return (
    <section className="band" id="sobre">
      <div className="wrap about">
        <div>
          <h2>A carreira de um jogador versátil</h2>
          <p>
            Em 2017 comecei na gastronomia e usei nela minha única carta do ProUni. Fiz vários amigos, e a cozinha continua sendo meu hobby. Depois mudei pra técnico em Química por um motivo meio maluco: não tive muita base no ensino médio e queria aprender de verdade. Consegui, e fui além: entrei no laboratório de pintura da Hyundai Motor Brasil, analisando e testando materiais antes de irem pra linha de produção. Mas percebi que trabalhar com isso não era pra mim.
          </p>
          <p>
            Para nao ficar parado, trabalhei numa empresa(Motan) com um grande amigo, mas de saudade acabei voltando pra cozinha por um tempo no Bar do Ilson, do Fernando, um cara fera demais enquanto comecava a faculdade de ADS e procurava uma oportunidade com mais impacto pra mim e, pela afinidade que sempre tive com computadores e tecnologia, migrei pra programação.
          </p>
        </div>
        <div>
          <h3>Stack principal</h3>
          <ul className="stack">
            {stackMain.map(s => <li key={s} className="k">{s}</li>)}
          </ul>
          <h3>Também trabalho com</h3>
          <ul className="stack">
            {stackOther.map(s => <li key={s}>{s}</li>)}
          </ul>
          <h3>Noções em</h3>
          <ul className="stack">
            {stackOther2.map(s => <li key={s}>{s}</li>)}
          </ul>
          <h3>Idiomas</h3>
          <ul className="stack">
            {languages.map(s => <li key={s}>{s}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
