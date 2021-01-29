const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.style.width = '95vw'
canvas.style.height = '25vh'

const wave = {
  y: canvas.height / 2,
  length: 0.1,
  amplitude: 70,
  frequency: 0.03
}

const strokeColor = {
  h: 200,
  s: 1,
  l: 81
}

const backgroundColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.1
}


let increment = wave.frequency
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${
    backgroundColor.b
  }, ${backgroundColor.a})`
  c.fillRect(0, 0, canvas.width, canvas.height)

  c.beginPath()
  c.moveTo(0, canvas.height / 2)

  for (let i = 0; i < canvas.width; i++) {
    c.lineTo(
      i,
      wave.y +
        Math.sin(i * wave.length + increment) *
          wave.amplitude *
          Math.sin(increment)
    )
  }

  c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))}, ${
    strokeColor.s
  }%, ${strokeColor.l}%)`
  c.stroke()
  increment += wave.frequency
}

animate()