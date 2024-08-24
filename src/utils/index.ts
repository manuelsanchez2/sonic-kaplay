import { KAPLAYCtx } from 'kaplay'

export const addBackgroundAndPlatforms = (k: KAPLAYCtx) => {
  const bgPieceWidth = 1920
  const bgPieces = [
    k.add([k.sprite('chemical-bg'), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
    k.add([
      k.sprite('chemical-bg'),
      k.pos(bgPieceWidth, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
  ]

  const platforms = [
    k.add([k.sprite('platforms'), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite('platforms'), k.pos(384, 450), k.scale(4)]),
  ]

  return { bgPieces, platforms }
}
