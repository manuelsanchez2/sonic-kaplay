import { SceneDef } from 'kaplay'
import k from '../kaplayCtx'
import { makeSonic } from '../entities/sonic'
import { GAME_SPEED } from '../config'
// import { makeSonic } from "../entities/sonic";

export const mainMenu: SceneDef = () => {
  if (!k.getData('best-score')) k.setData('best-score', 0)
  k.onButtonPress('jump', () => k.go('game'))

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

  k.add([
    k.text('SONIC RING RUN', { font: 'mania', size: 96 }),
    k.anchor('center'),
    k.pos(k.center().x, 200),
  ])

  k.add([
    k.text('Press Space to Play', { font: 'mania', size: 32 }),
    k.anchor('center'),
    k.pos(k.center().x, k.center().y - 200),
  ])

  makeSonic(k.vec2(200, 745))
  k.onUpdate(() => {
    if (bgPieces[1].pos.x < 0) {
      const shiftedBg = bgPieces.shift() // Shift the first element

      if (shiftedBg) {
        // Only proceed if the shift was successful
        shiftedBg.moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0)
        bgPieces.push(shiftedBg)
      }
    }

    bgPieces[0].move(-100, 0)
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0)

    if (platforms[1].pos.x < 0) {
      const shiftedPlatform = platforms.shift() // Shift the first element

      if (shiftedPlatform) {
        // Only proceed if the shift was successful
        shiftedPlatform.moveTo(platforms[0].pos.x + platforms[0].width * 4, 450)
        platforms.push(shiftedPlatform)
      }
    }

    platforms[0].move(-GAME_SPEED, 0)
    platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450)
  })
}
