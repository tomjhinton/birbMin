import './style.scss'
import * as THREE from 'three'
import { gsap } from 'gsap'
import * as Tone from 'tone'

import vertexShader from './shaders/vertex.glsl'

import fragmentShader1 from './shaders/fragment-1.glsl'

import fragmentShader2 from './shaders/fragment-2.glsl'

import fragmentShader3 from './shaders/fragment-3.glsl'

import fragmentShader4 from './shaders/fragment-4.glsl'

import fragmentShader5 from './shaders/fragment-5.glsl'

import fragmentShader6 from './shaders/fragment-6.glsl'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('canvas.webgl')


import Opening from './opening.json'

const now = Tone.now()
const currentMidi = Opening
const synths = []
let notPlaying = true
const freeverb = new Tone.Freeverb().toDestination()
freeverb.dampening = 500
const vol = new Tone.Volume(-22).toDestination()
document.querySelector('#gallery').addEventListener('click', (e) => {


  if (notPlaying && currentMidi) {
    notPlaying = false
    const now = Tone.now() + 0.5
    currentMidi.tracks.forEach((track) => {
      //create a synth for each track
      const synth = new Tone.PolySynth(Tone.FMSynth, {
        envelope: {
          attack: 0.02,
          decay: 0.1,
          sustain: 0.3,
          release: 1
        }
      }).toDestination()
      console.log(synth)
      synth.connect(freeverb)
      synth.connect(vol)
      synths.push(synth)
      //schedule all of the events
      track.notes.forEach((note) => {
        synth.triggerAttackRelease(
          note.name,
          note.duration,
          note.time + now,
          note.velocity
        )
      })
    })
  } else {
    //dispose the synth and make a new one
    while (synths.length) {
      const synth = synths.shift()
      synth.disconnect()
    }
    notPlaying = true
  }
})


// import cannonDebugger from 'cannon-es-debugger'

const textureLoader = new THREE.TextureLoader()

const bakedTexture = textureLoader.load('bake3.jpg')

bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding

const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture})

const scene = new THREE.Scene()

// Loading Bar Stuff

const loadingBarElement = document.querySelector('.loading-bar')
const loadingBarText = document.querySelector('.loading-bar-text')
const loadingManager = new THREE.LoadingManager(
  // Loaded
  () =>{
    window.setTimeout(() =>{
      gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

      loadingBarElement.classList.add('ended')
      loadingBarElement.style.transform = ''

      loadingBarText.classList.add('fade-out')

    }, 500)
  },

  // Progress
  (itemUrl, itemsLoaded, itemsTotal) =>{
    const progressRatio = itemsLoaded / itemsTotal
    loadingBarElement.style.transform = `scaleX(${progressRatio})`

  }
)

const gtlfLoader = new GLTFLoader(loadingManager)

const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
  depthWrite: false,
  uniforms:
    {
      uAlpha: { value: 1 }
    },
  transparent: true,
  vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
  fragmentShader: `
  uniform float uAlpha;
        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})

const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}



//Resizing handler

window.addEventListener('resize', () =>{



  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2 ))


})


const material1 = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader1,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: {
      value: 0
    },
    uColor: {
      value: new THREE.Color('orange')
    },

    uValueA: {
      value: Math.random()
    },
    uValueB: {
      value: Math.random()
    },
    uValueC: {
      value: Math.random()
    },
    uValueD: {
      value: Math.random()
    },

    uResolution: { type: 'v2', value: new THREE.Vector2() },
    uPosition: {
      value: {
        x: 0
      }
    }

  }
})

const material2 = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader2,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: {
      value: 0
    },
    uColor: {
      value: new THREE.Color('orange')
    },

    uValueA: {
      value: Math.random()
    },
    uValueB: {
      value: Math.random()
    },
    uValueC: {
      value: Math.random()
    },
    uValueD: {
      value: Math.random()
    },

    uResolution: { type: 'v2', value: new THREE.Vector2() },
    uPosition: {
      value: {
        x: 0
      }
    }

  }
})

const material3 = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader3,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: {
      value: 0
    },
    uColor: {
      value: new THREE.Color('orange')
    },

    uValueA: {
      value: Math.random()
    },
    uValueB: {
      value: Math.random()
    },
    uValueC: {
      value: Math.random()
    },
    uValueD: {
      value: Math.random()
    },

    uResolution: { type: 'v2', value: new THREE.Vector2() },
    uPosition: {
      value: {
        x: 0
      }
    }

  }
})

const material4 = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader4,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: {
      value: 0
    },
    uColor: {
      value: new THREE.Color('orange')
    },

    uValueA: {
      value: Math.random()
    },
    uValueB: {
      value: Math.random()
    },
    uValueC: {
      value: Math.random()
    },
    uValueD: {
      value: Math.random()
    },

    uResolution: { type: 'v2', value: new THREE.Vector2() },
    uPosition: {
      value: {
        x: 0
      }
    }

  }
})

const material5 = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader5,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: {
      value: 0
    },
    uColor: {
      value: new THREE.Color('orange')
    },

    uValueA: {
      value: Math.random()
    },
    uValueB: {
      value: Math.random()
    },
    uValueC: {
      value: Math.random()
    },
    uValueD: {
      value: Math.random()
    },

    uResolution: { type: 'v2', value: new THREE.Vector2() },
    uPosition: {
      value: {
        x: 0
      }
    }

  }
})

const material6 = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader6,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: {
      value: 0
    },
    uColor: {
      value: new THREE.Color('orange')
    },

    uValueA: {
      value: Math.random()
    },
    uValueB: {
      value: Math.random()
    },
    uValueC: {
      value: Math.random()
    },
    uValueD: {
      value: Math.random()
    },

    uResolution: { type: 'v2', value: new THREE.Vector2() },
    uPosition: {
      value: {
        x: 0
      }
    }

  }
})

let materialsArray = [material1, material2, material3, material4, material5, material6]


document.querySelector('#birb').addEventListener('click', (e) => {
  materialsArray.map(x => {
    x.uniforms.uValueA.value = Math.random()
    x.uniforms.uValueB.value = Math.random()
    x.uniforms.uValueC.value = Math.random()
    x.uniforms.uValueD.value = Math.random()
  })

})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, .1, 2000)
camera.position.x = -15
camera.position.y = 20
camera.position.z = 55
scene.add(camera)




// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//Stops you looking under the model, because it's never polite to peak under someones model.
controls.maxPolarAngle = Math.PI / 2 - 0.1

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true
})
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()


let sceneGroup, room, canvas1, canvas2, canvas3, canvas4, canvas5, canvas6
gtlfLoader.load(
  'minimal.glb',
  (gltf) => {
    gltf.scene.scale.set(8.5,8.5,8.5)
    sceneGroup = gltf.scene
    sceneGroup.needsUpdate = true
    sceneGroup.position.y -= 4.5
    scene.add(sceneGroup)

    room = gltf.scene.children.find((child) => {
      return child.name === 'room'
    })

    canvas1 = gltf.scene.children.find((child) => {
      return child.name === 'canvas-1'
    })

    canvas2 = gltf.scene.children.find((child) => {
      return child.name === 'canvas-2'
    })

    canvas3 = gltf.scene.children.find((child) => {
      return child.name === 'canvas-3'
    })

    canvas4 = gltf.scene.children.find((child) => {
      return child.name === 'canvas-4'
    })

    canvas5 = gltf.scene.children.find((child) => {
      return child.name === 'canvas-5'
    })

    canvas6 = gltf.scene.children.find((child) => {
      return child.name === 'canvas-6'
    })
    // intersectsArr.push(room)
    room.material = bakedMaterial

    canvas1.material = material1
    canvas2.material = material2
    canvas3.material = material3
    canvas4.material = material4
    canvas5.material = material5
    canvas6.material = material6

    sceneGroup.rotation.y -=.6
  }

)



//Animation stuff.

const clock = new THREE.Clock()
let oldElapsedTime = 0
const tick = () =>{
  // if ( mixer ) mixer.update( clock.getDelta() )
  const elapsedTime = clock.getElapsedTime()

  const deltaTime = elapsedTime - oldElapsedTime
  oldElapsedTime = elapsedTime
  //Update Physics World



  // Update controls
  controls.update()



  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
