import k from './kaplayCtx'
import {
  DisclaimerScene,
  GameOverScene,
  GameScene,
  MainMenuScene,
} from './scenes'

// Sprites
k.loadSprite('chemical-bg', 'graphics/chemical-bg.png')
k.loadSprite('platforms', 'graphics/platforms.png')
k.loadSprite('sonic', 'graphics/sonic.png', {
  sliceX: 8,
  sliceY: 2,
  anims: {
    run: {
      from: 0,
      to: 7,
      loop: true,
      speed: 30,
    },
    jump: {
      from: 8,
      to: 15,
      loop: true,
      speed: 100,
    },
  },
})
k.loadSprite('ring', 'graphics/ring.png', {
  sliceX: 16,
  sliceY: 1,
  anims: {
    spin: {
      from: 0,
      to: 15,
      loop: true,
      speed: 30,
    },
  },
})
k.loadSprite('motobug', 'graphics/motobug.png', {
  sliceX: 5,
  sliceY: 1,
  anims: {
    run: {
      from: 0,
      to: 4,
      loop: true,
      speed: 8,
    },
  },
})

// Fonts
k.loadFont('mania', 'fonts/mania.ttf')

// Sounds
k.loadSound('destroy', 'sounds/Destroy.wav')
k.loadSound('hurt', 'sounds/Hurt.wav')
k.loadSound('hyper-ring', 'sounds/HyperRing.wav')
k.loadSound('jump', 'sounds/Jump.wav')
k.loadSound('ring', 'sounds/Ring.wav')
k.loadSound('city', 'sounds/city.mp3')

// Scenes
k.scene('disclaimer', DisclaimerScene)
k.scene('main-menu', MainMenuScene)
k.scene('game', GameScene)
k.scene('gameover', GameOverScene)

k.go('disclaimer')
