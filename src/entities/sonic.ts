import { BodyComp, GameObj, SpriteComp, Vec2 } from 'kaplay'
import k from '../kaplayCtx'

type SonicComp = GameObj<SpriteComp | BodyComp> & {
  ringCollectUI: GameObj
  setControls(): void
  setEvents(): void
  onCollide(collider: string, callback: Function): void
  pos: Vec2
}

export function makeSonic(pos: Vec2): SonicComp {
  const sonic = k.add([
    k.sprite('sonic', { anim: 'run' }),
    k.scale(4),
    k.area(),
    k.anchor('center'),
    k.pos(pos),
    k.body({ jumpForce: 1700 }),
  ]) as GameObj<SpriteComp | BodyComp> & Partial<SonicComp>

  // Adding custom methods and properties
  sonic.ringCollectUI = sonic.add([
    k.text('', { font: 'mania', size: 24 }),
    k.color(255, 255, 0),
    k.anchor('center'),
    k.pos(30, -10),
  ])

  sonic.setControls = function () {
    k.onButtonPress('jump', () => {
      // check that the button was not clicked
      if (this.isGrounded()) {
        this.play('jump')
        this.jump()
        let storedSoundSetting = k.getData('has-sound')
        if (storedSoundSetting === true) {
          k.play('jump', { volume: 0.5 })
        }
      }
    })
  }

  sonic.setEvents = function () {
    this.onGround(() => {
      this.play('run')
    })
  }

  return sonic as SonicComp
}
