import * as THREE from 'three'

/*
 * The Three.js half of the horizon hero, isolated so it can be loaded with a
 * dynamic import() after hydration — three.js stays out of the landing
 * page's critical bundle. The hero component drives it through the returned
 * controller.
 */

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const CAMERA_PATH = [
  { y: 24, z: 110 },
  { y: 32, z: 20 },
  { y: 42, z: -70 },
]

function buildStars(scene: THREE.Scene, rng: () => number) {
  const layers: { points: THREE.Points; material: THREE.ShaderMaterial }[] = []
  for (let layer = 0; layer < 2; layer++) {
    const count = layer === 0 ? 900 : 500
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const radius = 300 + rng() * 700
      const theta = rng() * Math.PI * 2
      // Bias stars to the upper hemisphere so they live in the sky.
      const phi = Math.acos(1 - rng() * 0.9)
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = Math.abs(radius * Math.cos(phi)) + 20
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 200
      sizes[i] = 0.6 + rng() * (layer === 0 ? 1.6 : 2.4)
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    const material = new THREE.ShaderMaterial({
      uniforms: { uOpacity: { value: 0.9 }, uTime: { value: 0 } },
      vertexShader: `
        attribute float size;
        uniform float uTime;
        varying float vTwinkle;
        void main() {
          vTwinkle = 0.75 + 0.25 * sin(uTime * 0.8 + position.x * 0.05);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (260.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uOpacity;
        varying float vTwinkle;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = (1.0 - smoothstep(0.0, 0.5, dist)) * uOpacity * vTwinkle;
          gl_FragColor = vec4(0.62, 0.66, 0.92, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    })
    const points = new THREE.Points(geometry, material)
    scene.add(points)
    layers.push({ points, material })
  }
  return layers
}

function buildRidges(scene: THREE.Scene, rng: () => number) {
  // Far ridges are palest (atmospheric perspective); near ridge is deepest.
  const layers = [
    { z: -210, height: 100, color: 0xbfcbec, opacity: 0.55 },
    { z: -150, height: 92, color: 0xa4b3e2, opacity: 0.7 },
    { z: -95, height: 80, color: 0x8495d1, opacity: 0.85 },
    { z: -45, height: 62, color: 0x5b6cb4, opacity: 1 },
  ]
  const meshes: THREE.Mesh[] = []
  layers.forEach((layer, index) => {
    const points: THREE.Vector2[] = []
    const segments = 48
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments - 0.5) * 1400
      const y =
        Math.sin(i * 0.35 + index * 2.1) * layer.height * 0.5 +
        Math.sin(i * 0.13 + index) * layer.height * 0.35 +
        rng() * layer.height * 0.18 -
        58
      points.push(new THREE.Vector2(x, y))
    }
    points.push(new THREE.Vector2(1400, -400), new THREE.Vector2(-1400, -400))
    const geometry = new THREE.ShapeGeometry(new THREE.Shape(points))
    const material = new THREE.MeshBasicMaterial({
      color: layer.color,
      transparent: true,
      opacity: layer.opacity,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.z = layer.z
    mesh.userData = { parallax: 1 + index * 0.6 }
    scene.add(mesh)
    meshes.push(mesh)
  })
  return meshes
}

function buildSun(scene: THREE.Scene) {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255, 214, 150, 0.95)')
  gradient.addColorStop(0.35, 'rgba(255, 190, 120, 0.45)')
  gradient.addColorStop(1, 'rgba(255, 190, 120, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  const texture = new THREE.CanvasTexture(canvas)
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false })
  const sprite = new THREE.Sprite(material)
  sprite.position.set(30, -6, -260)
  sprite.scale.set(160, 160, 1)
  scene.add(sprite)
  return { sprite, material, texture }
}

export interface HorizonSceneController {
  applyProgress: (p: number) => void
  setRendering: (on: boolean) => void
  resize: () => void
  dispose: () => void
}

export function initHorizonScene(canvas: HTMLCanvasElement): HorizonSceneController {
  const rng = mulberry32(20260714)
  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0xe8eefc, 0.0011)

  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 2000)
  camera.position.set(0, CAMERA_PATH[0].y, CAMERA_PATH[0].z)
  camera.lookAt(0, 14, -320)

  const isMobile = window.innerWidth < 768
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.3 : 1.75))

  const stars = buildStars(scene, rng)
  const ridges = buildRidges(scene, rng)
  const sun = buildSun(scene)

  let progress = 0
  let rendering = true
  let rafId = 0

  const applyProgress = (p: number) => {
    progress = p
    // Two-segment camera path: drift forward, then crest toward the horizon.
    const seg = p < 0.5 ? 0 : 1
    const t = seg === 0 ? p / 0.5 : (p - 0.5) / 0.5
    const from = CAMERA_PATH[seg]
    const to = CAMERA_PATH[seg + 1]
    camera.position.y = from.y + (to.y - from.y) * t
    camera.position.z = from.z + (to.z - from.z) * t
    camera.lookAt(0, 14, -320)
    // Stars dissolve into daylight across the first two thirds of the story.
    const starFade = Math.max(0, 1 - p * 1.7)
    stars.forEach(({ material }) => (material.uniforms.uOpacity.value = 0.9 * starFade))
    // Sun swells and lifts slightly as dawn arrives.
    const swell = 160 + p * 150
    sun.sprite.scale.set(swell, swell, 1)
    sun.sprite.position.y = -6 + p * 26
    sun.material.opacity = 0.75 + p * 0.25
  }

  const clock = new THREE.Clock()
  const renderLoop = () => {
    rafId = requestAnimationFrame(renderLoop)
    if (!rendering) return
    const elapsed = clock.getElapsedTime()
    stars.forEach(({ material }) => (material.uniforms.uTime.value = elapsed))
    // Slow ambient sway on the ridges; scroll parallax rides on top.
    ridges.forEach((ridge, i) => {
      ridge.position.x = Math.sin(elapsed * 0.06 + i) * (2 + i)
      ridge.position.y = progress * ridge.userData.parallax * 14
    })
    renderer.render(scene, camera)
  }
  renderLoop()
  applyProgress(0)

  return {
    applyProgress,
    setRendering: (on: boolean) => {
      rendering = on
    },
    resize: () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    },
    dispose: () => {
      cancelAnimationFrame(rafId)
      stars.forEach(({ points, material }) => {
        points.geometry.dispose()
        material.dispose()
      })
      ridges.forEach((ridge) => {
        ridge.geometry.dispose()
        ;(ridge.material as THREE.Material).dispose()
      })
      sun.texture.dispose()
      sun.material.dispose()
      renderer.dispose()
    },
  }
}
