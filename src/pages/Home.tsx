import './Home.css'

function Home() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className="hero-title">CRAFT7 INTERIORS</h1>
        <p className="hero-subtitle">Your Potential, our Passion</p>
      </div>
      <div className="hero-background">
        <div className="tech-illustration">
          {/* Decorative elements */}
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="gear gear-1"></div>
          <div className="gear gear-2"></div>
        </div>
      </div>
    </section>
  )
}

export default Home
