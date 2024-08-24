import kaplay from 'kaplay'

const k = kaplay({
  canvas: document.getElementById('game') as HTMLCanvasElement,
  width: 1920,
  height: 1080,
  letterbox: true,
  background: [0, 0, 0, 1],
  global: false,
  touchToMouse: true,
  buttons: {
    jump: {
      keyboard: ['space', 'up', 'w'],
      gamepad: 'dpad-up',
    },
  },
  // debugKey: 'd',
  // debug: true,
})

export default k
