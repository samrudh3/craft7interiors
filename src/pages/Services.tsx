import './Services.css'
import { useMemo, useRef, useState } from 'react'
import tv1 from '../assets/TVUnits/TVUnit 1.jpeg'
import tv2 from '../assets/TVUnits/TVUnit 2.jpeg'
import tv3 from '../assets/TVUnits/TVUnit 3.jpeg'
import kitchen1 from '../assets/Kitchen/Kicthen 1.jpeg'
import wardrobe1 from '../assets/Wardrobe/WarDrobe 1.jpeg'
import wardrobe2 from '../assets/Wardrobe/WarDrobe 2.jpeg'

type ServiceImage = {
  id: number
  title: string
  category: string
  src: string
}

function Services() {
  const categories = ['All', 'TV Sets', 'Kitchen', 'Wardrobe', 'Bedroom']
  const [active, setActive] = useState('All')
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  const images: ServiceImage[] = useMemo(
    () => [
      {
        id: 1,
        title: 'Prestige Waterford, Pratyush',
        category: 'TV Sets',
        src: tv1,
      },
      {
        id: 2,
        title: 'Shapoorji Park West, Rahul',
        category: 'TV Sets',
        src: tv2,
      },
      {
        id: 3,
        title: 'Prestige Waterford, Sheerju',
        category: 'TV Sets',
        src: tv3,
      },
      {
        id: 4,
        title: 'Modern Kitchen Layout',
        category: 'Kitchen',
        src: kitchen1,
      },
      {
        id: 5,
        title: 'Luxury Wardrobe',
        category: 'Wardrobe',
        src: wardrobe1,
      },
      {
        id: 6,
        title: 'Cozy Bedroom',
        category: 'Wardrobe',
        src: wardrobe2,
      },
    ],
    [],
  )

  const filtered = useMemo(
    () => (active === 'All' ? images : images.filter((i) => i.category === active)),
    [active, images],
  )

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollerRef.current
    if (!el) return
    // Scroll by exactly one card (card width + gap)
    const firstCard = el.querySelector<HTMLDivElement>('.card')
    const style = window.getComputedStyle(el)
    const gapValue = style.getPropertyValue('gap') || style.getPropertyValue('column-gap') || '16px'
    const gap = parseInt(gapValue, 10) || 16
    const cardWidth = firstCard ? firstCard.clientWidth : Math.round(el.clientWidth / 4)
    const amount = cardWidth + gap
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <h1 className="services-title">Our Services</h1>

        <div className="services-filters">
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-btn ${active === c ? 'active' : ''}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="gallery-wrap">
          <button className="scroll-btn left" onClick={() => scroll('left')} aria-label="scroll left">
            ‹
          </button>
          <div className="gallery" ref={scrollerRef}>
            {filtered.map((img) => (
              <div className="card" key={img.id}>
                <div className="card-image" style={{ backgroundImage: `url(${img.src})` }} />
                <div className="card-title">{img.title}</div>
              </div>
            ))}
          </div>
          <button className="scroll-btn right" onClick={() => scroll('right')} aria-label="scroll right">
            ›
          </button>
        </div>
      </div>
    </section>
  )
}

export default Services
