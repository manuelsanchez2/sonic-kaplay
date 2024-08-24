import { Vec2 } from 'kaplay'
import k from '../kaplayCtx'

export function makeRing(pos: Vec2) {
  const motobug = k.add([
    k.sprite('ring', { anim: 'spin' }),
    k.area(),
    k.scale(4),
    k.anchor('center'),
    k.pos(pos),
    k.offscreen(), // destroy when offscreen?
    'ring',
  ])

  return motobug
}
