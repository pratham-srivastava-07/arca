import * as THREE from 'three'

/*
 * The Three.js half of the horizon hero, isolated so it can be loaded with a
 * dynamic import() after hydration — three.js stays out of the landing
 * page's critical bundle. The hero component drives it through the returned
 * controller.
 *
 * The scene is a dawn flight down a mountain valley: real displaced 3D
 * terrain (ridged fractal noise, flat-shaded facets, snow above the tree
 * line) backlit by the rising sun, with exponential fog carrying far peaks
 * into the sky gradient.
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

function makePerlin(rng: () => number) {
  const p = new Uint8Array(512)
  const src = Array.from({ length: 256 }, (_, i) => i)
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[src[i], src[j]] = [src[j], src[i]]
  }
  for (let i = 0; i < 512; i++) p[i] = src[i & 255]
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t
  const grad = (h: number, x: number, y: number) => {
    const g = h & 7
    const u = g < 4 ? x : y
    const v = g < 4 ? y : x
    return (g & 1 ? -u : u) + (g & 2 ? -2 * v : 2 * v)
  }
  return (x: number, y: number) => {
    const X = Math.floor(x) & 255
    const Y = Math.floor(y) & 255
    x -= Math.floor(x)
    y -= Math.floor(y)
    const u = fade(x)
    const v = fade(y)
    const a = p[p[X] + Y]
    const b = p[p[X + 1] + Y]
    const c = p[p[X] + Y + 1]
    const d = p[p[X + 1] + Y + 1]
    return (
      lerp(
        lerp(grad(a, x, y), grad(b, x - 1, y), u),
        lerp(grad(c, x, y - 1), grad(d, x - 1, y - 1), u),
        v
      ) / 2.2
    )
  }
}

const smoothstep = (edge0: number, edge1: number, t: number) => {
  const k = Math.min(1, Math.max(0, (t - edge0) / (edge1 - edge0)))
  return k * k * (3 - 2 * k)
}

const CAMERA_PATH = [
  { y: 26, z: 120 },
  { y: 34, z: 0 },
  { y: 46, z: -130 },
]
const LOOK_AT = new THREE.Vector3(0, 52, -480)

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
      positions[i * 3 + 1] = Math.abs(radius * Math.cos(phi)) + 40
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

function buildTerrain(scene: THREE.Scene, rng: () => number, isMobile: boolean) {
  const perlin = makePerlin(rng)
  // Ridged fBm: folding |noise| makes sharp ridgelines instead of round blobs.
  const ridged = (x: number, y: number) => {
    let sum = 0
    let amp = 0.52
    let freq = 1
    for (let o = 0; o < 5; o++) {
      const n = 1 - Math.abs(perlin(x * freq, y * freq))
      sum += n * n * amp
      amp *= 0.5
      freq *= 2.03
    }
    return sum
  }

  const width = 1900
  const depth = 950
  const segX = isMobile ? 130 : 210
  const segZ = isMobile ? 62 : 100
  const geometry = new THREE.PlaneGeometry(width, depth, segX, segZ)
  geometry.rotateX(-Math.PI / 2)
  geometry.translate(0, 0, -320) // spans z ≈ +155 … -795

  const pos = geometry.attributes.position as THREE.BufferAttribute
  const colors = new Float32Array(pos.count * 3)
  const rockLow = new THREE.Color('#5866ab')
  const rockHigh = new THREE.Color('#93a2d8')
  const snow = new THREE.Color('#f7f9ff')
  const vertexColor = new THREE.Color()

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const z = pos.getZ(i)
    // Valley corridor: low under the camera path, massifs rising to the
    // sides and toward the horizon.
    const side = smoothstep(48, 330, Math.abs(x))
    const far = smoothstep(-150, -720, z)
    const amp = 14 + 110 * side + 40 * far
    const h =
      Math.pow(ridged(x * 0.0042, z * 0.0042), 1.9) * amp +
      ridged(x * 0.021, z * 0.021) * 3 -
      26
    pos.setY(i, h)

    const snowT = smoothstep(30, 54, h + perlin(x * 0.05, z * 0.05) * 7)
    vertexColor
      .copy(rockLow)
      .lerp(rockHigh, smoothstep(-26, 30, h))
      .lerp(snow, snowT)
    colors[i * 3] = vertexColor.r
    colors[i * 3 + 1] = vertexColor.g
    colors[i * 3 + 2] = vertexColor.b
  }
  pos.needsUpdate = true
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.computeVertexNormals()

  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    flatShading: true,
    roughness: 0.95,
    metalness: 0,
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  return { mesh, material, geometry }
}

function buildLights(scene: THREE.Scene) {
  // Cool sky bounce + warm low sun behind the far peaks + faint fill from
  // the camera side so near slopes aren't dead black.
  const hemi = new THREE.HemisphereLight(0xe6efff, 0x5f6cab, 0.95)
  const sunLight = new THREE.DirectionalLight(0xffc9a0, 1.0)
  sunLight.position.set(60, 70, -640)
  const fill = new THREE.DirectionalLight(0xdfe7ff, 0.35)
  fill.position.set(-80, 90, 320)
  scene.add(hemi, sunLight, fill)
  return { hemi, sunLight, fill }
}

function buildSun(scene: THREE.Scene) {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255, 224, 170, 1)')
  gradient.addColorStop(0.18, 'rgba(255, 214, 150, 0.9)')
  gradient.addColorStop(0.42, 'rgba(255, 190, 120, 0.4)')
  gradient.addColorStop(1, 'rgba(255, 190, 120, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  const texture = new THREE.CanvasTexture(canvas)
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    fog: false,
  })
  const sprite = new THREE.Sprite(material)
  sprite.position.set(50, 32, -760)
  sprite.scale.set(300, 300, 1)
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
  // Fog color matches the CSS sky's mid tone so far peaks dissolve into it.
  scene.fog = new THREE.FogExp2(0xe6edfb, 0.00135)

  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 2000)
  camera.position.set(0, CAMERA_PATH[0].y, CAMERA_PATH[0].z)
  camera.lookAt(LOOK_AT)

  const isMobile = window.innerWidth < 768
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.3 : 1.75))

  const stars = buildStars(scene, rng)
  const terrain = buildTerrain(scene, rng, isMobile)
  const lights = buildLights(scene)
  const sun = buildSun(scene)

  let rendering = true
  let rafId = 0

  const applyProgress = (p: number) => {
    // Two-segment camera path: drift down the valley, then crest toward the
    // far massif. The terrain is static — the moving camera is the parallax.
    const seg = p < 0.5 ? 0 : 1
    const t = seg === 0 ? p / 0.5 : (p - 0.5) / 0.5
    const from = CAMERA_PATH[seg]
    const to = CAMERA_PATH[seg + 1]
    camera.position.y = from.y + (to.y - from.y) * t
    camera.position.z = from.z + (to.z - from.z) * t
    camera.lookAt(LOOK_AT)
    // Stars dissolve into daylight across the first two thirds of the story.
    const starFade = Math.max(0, 1 - p * 1.7)
    stars.forEach(({ material }) => (material.uniforms.uOpacity.value = 0.9 * starFade))
    // The sun climbs and swells; its light warms the facets as dawn arrives.
    const swell = 300 + p * 200
    sun.sprite.scale.set(swell, swell, 1)
    sun.sprite.position.y = 32 + p * 34
    sun.material.opacity = 0.8 + p * 0.2
    lights.sunLight.intensity = 1.0 + p * 1.2
    lights.hemi.intensity = 0.95 + p * 0.25
  }

  const clock = new THREE.Clock()
  const renderLoop = () => {
    rafId = requestAnimationFrame(renderLoop)
    if (!rendering) return
    const elapsed = clock.getElapsedTime()
    stars.forEach(({ material }) => (material.uniforms.uTime.value = elapsed))
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
      terrain.geometry.dispose()
      terrain.material.dispose()
      sun.texture.dispose()
      sun.material.dispose()
      renderer.dispose()
    },
  }
}
