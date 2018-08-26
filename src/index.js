import Gruu from 'gruujs'
import cx from 'classnames'

import houseSVG from './svg/house6.svg'

import style from './index.scss'
import styleHouse from './house.scss'

const PlayerStore = (
  <$
    state={{
      direction: 'LEFT',
      isWalking: false
    }}
  />
)

let resizeTimeout
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    window.location.reload()
  }, 250)
})

const HouseStore = (
  <$
    state={{
      left: -1600,
      top: -311
    }}
  />
)

const Leg = (customLegPartStyle = {}) => (
  <div className={style.leg}>
    <div
      $className={() => cx(style.legPart, style.thigh, (
        PlayerStore.state.isWalking
          ? style.thighMoveAnimation
          : style.thighStandAnimation
      ))}
      style={customLegPartStyle}
    >
      <div
        $className={() => cx(style.legPart, style.calf, (
          PlayerStore.state.isWalking
            ? style.calfMoveAnimation
            : style.calfStandAnimation
        ))}
        style={customLegPartStyle}
      />
    </div>
  </div>
)

const Arm = (customArmPartStyle = {}) => (
  <div className={style.arm}>
    <div
      $className={() => cx(style.armPart, style.shoulder, (
        PlayerStore.state.isWalking
          ? style.shoulderMoveAnimation
          : style.shoulderStandAnimation
      ))}
      style={customArmPartStyle}
    >
      <div
        $className={() => cx(style.armPart, style.forearm, (
          PlayerStore.state.isWalking
            ? style.forearmMoveAnimation
            : style.forearmStandAnimation
        ))}
        style={customArmPartStyle}
      />
    </div>
  </div>
)

const ArmWithLight = () => (
  <div className={style.arm}>
    <div className={cx(style.armPart, style.shoulder, style.shoulderWithLightAnimation)}>
      <div className={cx(style.armPart, style.forearm, style.forearmWithLightAnimation)}>
        <div>
          <div>
            <div />
            <div>
              <div />
              <div />
              <div />
            </div>
            <div />
          </div>
        </div>
      </div>
    </div>
  </div>
)

const Head = (
  <div className={style.head} />
)

const Chest = (
  <div
    $className={() => cx(style.chest, (
      PlayerStore.state.isWalking
        ? style.chestMoveAnimation
        : style.chestStandAnimation
    ))}
  >
    {Head}
    {Arm({ animationDelay: 0 })}
    {/* {ArmWithLight()} */}
  </div>
)

const Hero = (
  <div className={style.hero} $style={() => ({
    transform: PlayerStore.state.direction === 'RIGHT'
      ? 'scaleX(-1) translate(50%, -50%)'
      : 'scaleX(1) translate(-50%, -50%)'
  })}>
    {Chest}
    {Leg({ animationDelay: 0, animationFillMode: 'forwards' })}
    {Leg({ animationDelay: '-1s', animationFillMode: 'backwards' })}
  </div>
)

// const Light = (
//   <div className={style.light} $style={() => ({
//     transform: PlayerStore.state.direction === 'LEFT'
//       ? 'scaleX(1)'
//       : 'scaleX(-1)'
//   })}>
//     <div />
//     <div>
//       <div />
//       <div />
//       <div />
//     </div>
//     <div />
//   </div>
// )

const HouseBackground = (
  <div className={styleHouse.house} $style={() => ({
    left: `calc(${HouseStore.state.left}px + ${window.innerWidth / 2}px)`,
    top: `calc(${HouseStore.state.top}px + ${window.innerHeight / 2}px)`,
  })}>
    <div innerHTML={houseSVG} />
  </div>
)

const App = (
  <div>
    {HouseBackground}
    {Hero}
    {/* {Light} */}
  </div>
)

Gruu.renderApp(document.querySelector('#root'), App)

const gameLoop = () => {
  if (PlayerStore.state.isWalking) {
    switch (PlayerStore.state.direction) {
      case 'LEFT':
        HouseStore.state.left += 3
        break
      case 'RIGHT':
        HouseStore.state.left -= 3
        break
      default:
        break
    }
  }
  setTimeout(gameLoop, 30)
}

document.addEventListener('keydown', (e) => {
  console.log(e.keyCode)
  switch (e.keyCode) {
    case 39:
      PlayerStore.state.direction = 'RIGHT'
      PlayerStore.state.isWalking = true
      break
    case 37:
      PlayerStore.state.direction = 'LEFT'
      PlayerStore.state.isWalking = true
      break
    default:
      break
  }
})

document.addEventListener('keyup', (e) => {
  PlayerStore.state.isWalking = false
})

gameLoop()
