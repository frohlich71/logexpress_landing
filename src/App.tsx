import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Advantages from './components/Advantages'
import HowItWorks from './components/HowItWorks'
import CoverageMap from './components/CoverageMap'
import Plans from './components/Plans'
import Partners from './components/Partners'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Advantages />
        <HowItWorks />
        <CoverageMap />
        <Plans />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
