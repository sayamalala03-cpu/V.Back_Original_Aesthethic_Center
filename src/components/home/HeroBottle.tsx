import { useEffect, useRef } from 'react'
import {
  ACESFilmicToneMapping, AmbientLight, CanvasTexture, Color, CylinderGeometry, DirectionalLight, DoubleSide,
  Group, LatheGeometry, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, PMREMGenerator,
  PerspectiveCamera, PlaneGeometry, Scene, SphereGeometry, SRGBColorSpace, TorusGeometry, Vector2, WebGLRenderer,
} from 'three'

interface Props {
  /** Called with true once the first frame is drawn, false if WebGL is lost or unavailable. */
  onState: (ok: boolean) => void
}

/**
 * The 3D serum bottle. Lazy-loaded from Hero, so three.js is not in the first page load.
 * The label is a placeholder; swap the text when the clinic has real packaging.
 * If WebGL is unavailable or the context is lost, the parent keeps showing the SVG bottle.
 */
export default function HeroBottle({ onState }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const stage = canvas?.parentElement
    const hero = canvas?.closest<HTMLElement>('.hm-hero')
    if (!canvas || !stage || !hero) return

    const small = window.innerWidth < 768
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({ canvas, alpha: true, antialias: !small, powerPreference: 'low-power' })
    } catch {
      onState(false)
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = SRGBColorSpace
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05

    const scene = new Scene()
    const camera = new PerspectiveCamera(28, 1, 0.1, 100)
    camera.position.set(0, 0, 11)

    // Studio reflections, built once from a few bright panels
    const pmrem = new PMREMGenerator(renderer)
    const studio = new Scene()
    studio.background = new Color(0x1d150f)
    const panel = (w: number, h: number, x: number, y: number, z: number, c: number, k: number) => {
      const m = new Mesh(
        new PlaneGeometry(w, h),
        new MeshBasicMaterial({ color: new Color(c).multiplyScalar(k), side: DoubleSide }),
      )
      m.position.set(x, y, z)
      m.lookAt(0, 0, 0)
      studio.add(m)
    }
    panel(8, 12, -9, 2, 2, 0xfff1dc, 3)
    panel(10, 3, 0, 9, 0, 0xffffff, 4)
    panel(6, 10, 9, 0, -2, 0xffd9a0, 2.2)
    panel(14, 3, 0, -8, 4, 0xc99a62, 0.8)
    const envTarget = pmrem.fromScene(studio, 0.03)
    scene.environment = envTarget.texture
    pmrem.dispose()

    const key = new DirectionalLight(0xfff0dc, 1.1); key.position.set(-4, 5, 6); scene.add(key)
    const rim = new DirectionalLight(0xffe2b8, 0.8); rim.position.set(5, 1, -4); scene.add(rim)
    scene.add(new AmbientLight(0xffffff, 0.2))

    const V = (x: number, y: number) => new Vector2(x, y)
    const g = new Group()
    const glass = new Mesh(
      new LatheGeometry([V(0, -1.6), V(.6, -1.6), V(.72, -1.57), V(.78, -1.48), V(.78, .62), V(.76, .82), V(.66, .96), V(.46, 1.06), V(.34, 1.12), V(.32, 1.3)], 72),
      new MeshPhysicalMaterial({ color: 0xf1d3a4, transparent: true, opacity: 0.4, roughness: 0.04, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 1.6, side: DoubleSide, depthWrite: false }),
    )
    const liquid = new Mesh(
      new LatheGeometry([V(0, -1.52), V(.66, -1.52), V(.7, -1.45), V(.7, .35), V(.6, .45), V(0, .45)], 64),
      new MeshPhysicalMaterial({ color: 0xd9a45c, roughness: 0.15, clearcoat: 0.6, emissive: 0x3a1f08, emissiveIntensity: 0.25, envMapIntensity: 1 }),
    )
    const gold = new MeshStandardMaterial({ color: 0xd8b377, metalness: 1, roughness: 0.2, envMapIntensity: 1.4 })
    const collar = new Mesh(new CylinderGeometry(0.34, 0.38, 0.34, 64), gold); collar.position.y = 1.28
    const r1 = new Mesh(new TorusGeometry(0.385, 0.03, 16, 64), gold); r1.rotation.x = Math.PI / 2; r1.position.y = 1.11
    const r2 = new Mesh(new TorusGeometry(0.27, 0.025, 16, 64), gold); r2.rotation.x = Math.PI / 2; r2.position.y = 1.45
    const bulb = new Mesh(new SphereGeometry(0.3, 48, 32), new MeshStandardMaterial({ color: 0x3a2a1c, roughness: 0.45, envMapIntensity: 0.9 }))
    bulb.scale.set(1, 1.7, 1); bulb.position.y = 1.95

    // Placeholder label
    const lc = document.createElement('canvas'); lc.width = 768; lc.height = 504
    const x = lc.getContext('2d')
    if (x) {
      x.fillStyle = '#F4ECDC'; x.fillRect(0, 0, 768, 504)
      x.strokeStyle = '#C9A46A'; x.lineWidth = 5; x.strokeRect(22, 22, 724, 460)
      x.fillStyle = '#2B221B'; x.textAlign = 'center'
      x.font = '500 150px "Cormorant Garamond", Georgia, serif'; x.fillText('V.Back', 384, 270)
      x.fillStyle = '#7A5A34'; x.font = '600 24px Manrope, system-ui, sans-serif'; x.fillText('ORIGINAL AESTHETIC CENTER', 384, 340)
    }
    const tex = new CanvasTexture(lc); tex.colorSpace = SRGBColorSpace; tex.anisotropy = 4
    const label = new Mesh(
      new CylinderGeometry(0.795, 0.795, 1.25, 64, 1, true, -Math.PI * 0.38, Math.PI * 0.76),
      new MeshStandardMaterial({ map: tex, roughness: 0.6, envMapIntensity: 0.7 }),
    )
    label.position.y = -0.25

    g.add(liquid, label, glass, collar, r1, r2, bulb)
    g.position.y = -0.43
    const holder = new Group(); holder.add(g); scene.add(holder)

    const size = () => {
      const w = stage.clientWidth, h = stage.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    size()
    const ro = 'ResizeObserver' in window ? new ResizeObserver(() => { size(); if (reduce) draw(0) }) : null
    ro?.observe(stage)

    let mx = 0, my = 0, tx = 0, ty = 0, sp = 0, spT = 0
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (fine && !reduce) hero.addEventListener('pointermove', onMove, { passive: true })
    const onScroll = () => { spT = Math.min(1, Math.max(0, window.scrollY / Math.max(1, hero.offsetHeight))) }
    if (!reduce) window.addEventListener('scroll', onScroll, { passive: true })

    function draw(t: number) {
      mx += (tx - mx) * 0.06
      my += (ty - my) * 0.06
      sp += (spT - sp) * 0.08 // eased, so the bottle glides instead of snapping to the scroll position
      camera.position.z = 11 - sp * 0.9 // a slow push-in adds depth
      key.position.x = -4 + sp * 6 // the key light sweeps across the glass
      holder.rotation.y = 0.55 + Math.sin(t * 0.5) * 0.22 + sp * Math.PI * 1.35 + mx * 0.35
      holder.rotation.x = 0.06 + Math.sin(t * 0.7) * 0.03 - my * 0.12
      holder.rotation.z = -0.14 + Math.sin(t * 0.6) * 0.02
      holder.position.y = Math.sin(t * 0.9) * 0.09 + sp * 0.9
      holder.scale.setScalar(1 + sp * 0.12)
      renderer.render(scene, camera)
    }
    draw(0)
    onState(true)

    let visible = true
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((en) => { visible = en[0].isIntersecting }) : null
    io?.observe(hero)
    let raf = 0
    const t0 = performance.now()
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden) return
      draw((now - t0) / 1000)
    }
    if (!reduce) raf = requestAnimationFrame(loop)

    const onLost = (e: Event) => { e.preventDefault(); cancelAnimationFrame(raf); onState(false) }
    canvas.addEventListener('webglcontextlost', onLost)

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('webglcontextlost', onLost)
      hero.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      ro?.disconnect()
      io?.disconnect()
      envTarget.dispose()
      tex.dispose()
      const meshes: Mesh[] = [glass, liquid, collar, r1, r2, bulb, label]
      meshes.forEach((m) => {
        m.geometry.dispose()
        ;(Array.isArray(m.material) ? m.material : [m.material]).forEach((mat) => mat.dispose())
      })
      renderer.dispose()
    }
  }, [onState])

  return <canvas ref={canvasRef} width={10} height={10} />
}
