import { useEffect, useRef } from 'react'
import './About.css'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

interface Connection {
  from: number
  to: number
}

function About() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create nodes
    const nodeCount = 40
    const nodes: Node[] = []
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 2
      })
    }

    // Create connections
    const connections: Connection[] = []
    for (let i = 0; i < nodeCount; i++) {
      const connectionsPerNode = Math.floor(Math.random() * 3) + 1
      for (let j = 0; j < connectionsPerNode; j++) {
        const target = Math.floor(Math.random() * nodeCount)
        if (target !== i) {
          connections.push({ from: i, to: target })
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Keep within bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))
      })

      // Draw connections
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)'
      ctx.lineWidth = 1
      connections.forEach((conn) => {
        const from = nodes[conn.from]
        const to = nodes[conn.to]
        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.stroke()
      })

      // Draw nodes
      nodes.forEach((node) => {
        ctx.fillStyle = node.size > 4 ? 'rgba(100, 100, 100, 0.8)' : 'rgba(150, 150, 150, 0.6)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <section className="about-section" id="about">
      <canvas ref={canvasRef} className="network-canvas"></canvas>
      <div className="about-content">
        <h1 className="about-title">ABOUT<br />US</h1>
        <div className="about-description">
          <p>
            We design thoughtful interiors that blend style, comfort, and functionality.
            From concept to completion, we turn ideas into beautifully crafted spaces.
            Every design is tailored to reflect your lifestyle and vision
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
