import './Services.css'
import { useMemo, useRef, useState } from 'react'

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
        src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1',
      },
      {
        id: 2,
        title: 'Shapoorji Park West, Rahul',
        category: 'TV Sets',
        src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2',
      },
      {
        id: 3,
        title: 'Prestige Waterford, Sheerju',
        category: 'Bedroom',
        src: 'https://images.unsplash.com/photo-1505691723518-36a6f7b8b4de?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3',
      },
      {
        id: 4,
        title: 'Modern Kitchen Layout',
        category: 'Kitchen',
        src: 'https://images.unsplash.com/photo-1542365887-1b1d3f04f9a7?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4',
      },
      {
        id: 5,
        title: 'Luxury Wardrobe',
        category: 'Wardrobe',
        src: 'https://images.unsplash.com/photo-1598300054021-2df0c3b2f1a8?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5',
      },
      {
        id: 6,
        title: 'Cozy Bedroom',
        category: 'Bedroom',
        src: 'https://images.unsplash.com/photo-1505692794407-6b4b2b9d6d78?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6',
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
