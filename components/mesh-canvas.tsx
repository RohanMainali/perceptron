"use client"

import { useEffect, useRef } from "react"

export default function MeshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const _cvs = canvasRef.current
    if (!_cvs) return
    const _ctx = _cvs.getContext("2d")
    if (!_ctx) return

    // Typed consts so TypeScript doesn't lose narrowing inside closures
    const cvs: HTMLCanvasElement = _cvs
    const ctx: CanvasRenderingContext2D = _ctx

    const SPACING = 44
    const INFLUENCE = 280
    const STRENGTH = 0.42
    const SPRING = 0.06
    const DAMPING = 0.8

    let mx = -99999
    let my = -99999
    let cols = 0
    let rows = 0
    let raf = 0

    type Pt = { hx: number; hy: number; x: number; y: number; vx: number; vy: number }
    let grid: Pt[][] = []

    function buildGrid() {
      const parent = cvs.parentElement
      if (!parent) return
      cvs.width = parent.clientWidth
      cvs.height = parent.clientHeight
      cols = Math.ceil(cvs.width / SPACING) + 2
      rows = Math.ceil(cvs.height / SPACING) + 2
      grid = []
      for (let r = 0; r < rows; r++) {
        grid[r] = []
        for (let c = 0; c < cols; c++) {
          const hx = c * SPACING
          const hy = r * SPACING
          grid[r][c] = { hx, hy, x: hx, y: hy, vx: 0, vy: 0 }
        }
      }
    }

    function onMouseMove(e: MouseEvent) {
      const rect = cvs.getBoundingClientRect()
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
    }

    function tick() {
      ctx.clearRect(0, 0, cvs.width, cvs.height)

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = grid[r][c]
          const dx = mx - p.hx
          const dy = my - p.hy
          const dist = Math.hypot(dx, dy)

          // Mild gravity pull toward cursor
          if (dist < INFLUENCE && dist > 0) {
            const t = 1 - dist / INFLUENCE
            p.vx += (dx / dist) * t * t * STRENGTH * 1.8
            p.vy += (dy / dist) * t * t * STRENGTH * 1.8
          }

          // Spring return to home
          p.vx += (p.hx - p.x) * SPRING
          p.vy += (p.hy - p.y) * SPRING
          p.vx *= DAMPING
          p.vy *= DAMPING
          p.x += p.vx
          p.y += p.vy
        }
      }

      // Horizontal lines
      ctx.strokeStyle = "rgba(22,163,74,0.30)"
      ctx.lineWidth = 0.75
      for (let r = 0; r < rows; r++) {
        ctx.beginPath()
        for (let c = 0; c < cols; c++) {
          const { x, y } = grid[r][c]
          if (c === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Vertical lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath()
        for (let r = 0; r < rows; r++) {
          const { x, y } = grid[r][c]
          if (r === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Glowing intersection dots near cursor
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = grid[r][c]
          const dist = Math.hypot(mx - p.hx, my - p.hy)
          if (dist < INFLUENCE) {
            const t = 1 - dist / INFLUENCE
            ctx.beginPath()
            ctx.arc(p.x, p.y, t * 2.2, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(22,163,74,${(t * 0.38).toFixed(3)})`
            ctx.fill()
          }
        }
      }

      raf = requestAnimationFrame(tick)
    }

    buildGrid()
    tick()

    const parent = cvs.parentElement!
    const ro = new ResizeObserver(() => buildGrid())
    ro.observe(parent)
    window.addEventListener("mousemove", onMouseMove, { passive: true })

    return () => {
      ro.disconnect()
      window.removeEventListener("mousemove", onMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 1,
        maskImage:
          "radial-gradient(ellipse 105% 90% at 50% 15%, black 5%, transparent 88%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 105% 90% at 50% 15%, black 5%, transparent 88%)",
      }}
    />
  )
}
