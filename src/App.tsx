import Hero from './components/Hero'
import About from './components/About'
import OffCode from './components/OffCode'
import Projects from './components/Projects'
import Experience from './components/Experience'
import KellySection from './components/KellySection'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <About />
        <OffCode />
        <Projects />
        <Experience />
        <KellySection />
        <Contact />
      </main>
      <footer>
        <span>© {new Date().getFullYear()} Gustavo Franco</span>
        <span>Piracicaba, São Paulo</span>
      </footer>
    </>
  )
}
