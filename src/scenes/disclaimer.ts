import { SceneDef } from 'kaplay'
import { PREFERS_REDUCED_MOTION } from '../config'
import k from '../kaplayCtx'

export const disclaimer: SceneDef = () => {
  k.add([
    k.text(
      `
        Sonic is owned by SEGA.
        This is a fangame made by JSLegendDev using assets from Sonic Mania
      `,
      { font: 'mania', size: 32 }
    ),
  ])

  const pressStartText = k.add([
    k.text('Press Space to Start The Game', {
      font: 'mania',
      size: 64,
    }),
    k.anchor('center'),
    k.pos(k.center()),
    k.opacity(1), // Add opacity component
  ])

  if (!PREFERS_REDUCED_MOTION) {
    // Function to toggle opacity
    let visible = true
    k.loop(0.5, () => {
      // Blink every 0.5 seconds
      visible = !visible
      pressStartText.opacity = visible ? 1 : 0
    })
  }

  k.onButtonPress('jump', () => k.go('main-menu'))
}
