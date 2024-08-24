import { GameObj, SceneDef, Vec2 } from 'kaplay'
import k from '../kaplayCtx'
import { makeSonic } from '../entities/sonic'
import { makeMotobug } from '../entities/motobug'
import { makeRing } from '../entities/ring'

const storedSoundSetting = k.getData('has-sound')

export const game: SceneDef = () => {
  let isMuted =
    storedSoundSetting !== null ? !Boolean(storedSoundSetting) : false

  const citySfx = k.play('city', { volume: isMuted ? 0 : 0.2, loop: true })
  k.setGravity(3100)

  const bgPieceWidth = 1920
  const bgPieces = [
    k.add([k.sprite('chemical-bg'), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
    k.add([
      k.sprite('chemical-bg'),
      k.pos(1920 * 2, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
  ]

  const platforms = [
    k.add([k.sprite('platforms'), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite('platforms'), k.pos(384, 450), k.scale(4)]),
  ]

  const sonic = makeSonic(k.vec2(200, 745))
  sonic.setControls()
  sonic.setEvents()

  const scoreText = k.add([
    k.text('SCORE : 0', { font: 'mania', size: 72 }),
    k.pos(20, 20),
  ])
  let score = 0
  let scoreMultiplier = 0
  sonic.onCollide('ring', (ring: GameObj) => {
    let storedSoundSetting = k.getData('has-sound')
    if (storedSoundSetting === true) {
      k.play('ring', { volume: 0.5 })
    }
    k.destroy(ring)
    score++
    scoreText.text = `SCORE : ${score}`
    sonic.ringCollectUI.text = '+1'
    k.wait(1, () => {
      sonic.ringCollectUI.text = ''
    })
  })
  sonic.onCollide('enemy', (enemy: GameObj) => {
    let storedSoundSetting = k.getData('has-sound')
    if (!sonic.isGrounded()) {
      if (storedSoundSetting === true) {
        k.play('destroy', { volume: 0.5 })
        k.play('hyper-ring', { volume: 0.5 })
      }
      k.destroy(enemy)
      sonic.play('jump')
      sonic.jump()
      scoreMultiplier += 1
      score += 10 * scoreMultiplier
      scoreText.text = `SCORE : ${score}`
      if (scoreMultiplier === 1)
        sonic.ringCollectUI.text = `+${10 * scoreMultiplier}`
      if (scoreMultiplier > 1) sonic.ringCollectUI.text = `x${scoreMultiplier}`
      k.wait(1, () => {
        sonic.ringCollectUI.text = ''
      })
      return
    }

    if (storedSoundSetting === true) {
      k.play('hurt', { volume: 0.5 })
    }
    k.setData('current-score', score)
    k.go('gameover', citySfx)
  })

  addSoundButton(isMuted, citySfx)

  let level_speed = 500
  k.loop(1, () => {
    level_speed += 50
  })

  addGamePlatform(k.vec2(0, 832))

  initSpawnMotobugs(level_speed)
  initSpawnRings(level_speed)

  k.onUpdate(() => {
    if (sonic.isGrounded()) scoreMultiplier = 0

    if (bgPieces[1].pos.x < 0) {
      const shiftedBg = bgPieces.shift() // Shift the first element

      if (shiftedBg) {
        // Only proceed if the shift was successful
        shiftedBg.moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0)
        bgPieces.push(shiftedBg)
      }
    }

    bgPieces[0].move(-75, 0)
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0)

    // for jump effect
    bgPieces[0].moveTo(bgPieces[0].pos.x, -sonic.pos.y / 10 + 50)
    bgPieces[1].moveTo(bgPieces[1].pos.x, -sonic.pos.y / 10 + 50)

    if (platforms[1].pos.x < 0) {
      const shiftedPlatform = platforms.shift() // Shift the first element

      if (shiftedPlatform) {
        // Only proceed if the shift was successful
        shiftedPlatform.moveTo(platforms[0].pos.x + platforms[0].width * 4, 450)
        platforms.push(shiftedPlatform)
      }
    }

    platforms[0].move(-level_speed, 0)
    platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450)
  })
}

const addSoundButton = (isMuted: boolean, citySfx: any) => {
  const toggleText = k.add([
    k.text(isMuted ? '🔇' : '🔊', { font: 'mania', size: 64 }),
    k.anchor('topright'),
    k.pos(k.width() - 50, 50),
    k.area({
      cursor: 'pointer',
    }), // Make it interactive
  ])
  toggleText.onClick(() => {
    // Toggle the sound setting
    isMuted = !isMuted

    // Update the local storage with the new state
    k.setData('has-sound', !isMuted)
    citySfx.volume = isMuted ? 0 : 0.2
    toggleText.text = isMuted ? '🔇' : '🔊'
    console.log(isMuted ? 'Muted' : 'Unmuted')
  })
}

const addGamePlatform = (pos: Vec2) => {
  // Add the platform where Sonic will run
  k.add([
    k.rect(1920, 300),
    k.opacity(0),
    k.area(),
    k.pos(pos),
    k.body({ isStatic: true }),
    'platform',
  ])
}

const initSpawnRings = (level_speed: number) => {
  const spawnRing = () => {
    const ring = makeRing(k.vec2(1950, 745))
    ring.onUpdate(() => {
      ring.move(-level_speed, 0)
    })
    ring.onExitScreen(() => {
      if (ring.pos.x < 0) k.destroy(ring)
    })

    const waitTime = k.rand(0.5, 3)

    k.wait(waitTime, spawnRing)
  }

  spawnRing()
}

const initSpawnMotobugs = (level_speed: number) => {
  const spawnMotoBug = () => {
    const motobug = makeMotobug(k.vec2(1950, 773))
    motobug.onUpdate(() => {
      if (level_speed < 3000) {
        motobug.move(-(level_speed + 300), 0)
        return
      }
      motobug.move(-level_speed, 0)
    })

    motobug.onExitScreen(() => {
      if (motobug.pos.x < 0) k.destroy(motobug)
    })

    const waitTime = k.rand(0.5, 2.5)

    k.wait(waitTime, spawnMotoBug)
  }

  spawnMotoBug()
}
