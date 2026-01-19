import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Home />
      <About />
      <Services />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
