import Gruu from 'gruujs'
import cx from 'classnames'

import houseSVG from './svg/house.svg'
import oilSVG from './svg/oil2.svg'

import style from './index.scss'
import styleHouse from './house.scss'

const centerX = window.innerWidth / 2
const centerY = window.innerHeight / 2

const PlayerStore = (
  <$
    state={{
      direction: 'LEFT',
      isWalking: false
    }}
  />
)

// state={{
//   left: -1130,
//   top: -311
// }}

const HouseStore = (
  <$
    state={{
      left: -1130,
      top: -742,
      wifiFixed: false,
      leverFixed: false,
      oilTaken: false
    }}
  />
)

const HouseAnimations = (
  <$
    state={{
      lever: null,
      wifi: null
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

const Tips = (
  <div
    state={{ text: '', temporaryText: '', visible: false }}
    $className={function () {
      return cx(styleHouse.tips, this.state.visible && styleHouse.tipsVisible)
    }}
    $innerText={function () {
      return this.state.temporaryText || this.state.text
    }}
  />
)

let temporaryTextTimeout
const setTemporaryText = (temporaryText) => {
  Tips.state.temporaryText = temporaryText
  clearTimeout(temporaryTextTimeout)
  temporaryTextTimeout = setTimeout(() => {
    Tips.state.temporaryText = ''
  }, 5000)
}

const Lever = (
  <div $className={() => cx(styleHouse.lever, HouseAnimations.state.lever)} />
)

const LeverInteractionArea = (
  <div
    state={{ active: false }}
    className={cx(styleHouse.interactionArea)}
    style={{ left: 50, top: 120, width: 320, height: 300 }}
  />
)

const Computer = (
  <div $className={() => cx(styleHouse.wifiContainer, HouseAnimations.state.wifi)}>
    <div className={styleHouse.wifiCross} />
    <div className={styleHouse.wifi} />
  </div>
)

const ComputerInteractionArea = (
  <div
    state={{ active: false }}
    className={cx(styleHouse.interactionArea)}
    style={{ left: 1120, top: 120, width: 300, height: 300 }}
  />
)

const Stair1FloorInteractionArea = (
  <div
    className={cx(styleHouse.interactionArea)}
    style={{ left: 470, top: 120, width: 80, height: 300 }}
  />
)

const Stair0Floor1InteractionArea = (
  <div
    className={cx(styleHouse.interactionArea)}
    style={{ left: 940, top: 555, width: 80, height: 300 }}
  />
)

const Oil = (
  <div className={styleHouse.oil}><div innerHTML={oilSVG} /></div>
)

const OilInteractionArea = (
  <div
    className={cx(styleHouse.interactionArea)}
    style={{ left: 1450, top: 555, width: 250, height: 300 }}
  />
)

const HouseBackground = (
  <div className={styleHouse.house} $style={() => ({
    left: `calc(${HouseStore.state.left}px + ${window.innerWidth / 2}px)`,
    top: `calc(${HouseStore.state.top}px + ${window.innerHeight / 2}px)`,
  })}>
    <div innerHTML={houseSVG} />
    {Lever}
    {LeverInteractionArea}
    {Computer}
    {ComputerInteractionArea}
    {Oil}
    {OilInteractionArea}
    {Stair1FloorInteractionArea}
    {Stair0Floor1InteractionArea}
  </div>
)

const App = (
  <div>
    {HouseBackground}
    {Hero}
    {Tips}
  </div>
)

Gruu.renderApp(document.querySelector('#root'), App)

const IsInteractiveAreaActive = (Area) => {
  const bbox = Area._n.getBoundingClientRect()
  return (
    bbox.left < centerX && bbox.right > centerX && bbox.top < centerY && bbox.bottom > centerY
  )
}

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

  let tipsText = ''
  let tipsVisible = false

  if (IsInteractiveAreaActive(LeverInteractionArea)) {
    tipsVisible = true
    if (!HouseStore.state.leverFixed) {
      tipsText = 'That looks interesting...\n\nPress E to interact'
    }
  }

  if (IsInteractiveAreaActive(ComputerInteractionArea)) {
    tipsVisible = true
    if (!HouseStore.state.leverFixed) {
      tipsText = 'It looks like I\'ve lost connection...\n\nPress E to interact'
    }
  }

  if (IsInteractiveAreaActive(Stair1FloorInteractionArea)) {
    tipsVisible = true
    tipsText = 'Press ↓ to go downstairs'
  }

  if (IsInteractiveAreaActive(Stair0Floor1InteractionArea)) {
    tipsVisible = true
    tipsText = 'Press ↑ to go upstairs'
  }

  if (tipsText !== Tips.state.text && tipsText !== '') {
    Tips.state.text = tipsText
  }

  if (tipsVisible !== Tips.state.visible) {
    Tips.state.visible = tipsVisible
    if (!tipsVisible) {
      setTimeout(() => {
        Tips.state.temporaryText = ''
      }, 1000)
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
    case 69:
      if (IsInteractiveAreaActive(LeverInteractionArea) && !LeverInteractionArea.state.active) {
        LeverInteractionArea.state.active = true
        if (HouseStore.state.leverFixed) {
          HouseAnimations.state.lever = styleHouse.leverFixedAnimation
        } else {
          HouseAnimations.state.lever = styleHouse.leverBrokenAnimation
          setTemporaryText('Hmm..., it won\'t go any further...\nI wish I had something to oil it')
        }
        setTimeout(() => {
          if (!HouseStore.state.leverFixed) {
            LeverInteractionArea.state.active = false
            HouseAnimations.state.lever = null
          }
        }, 2000)
      }
      if (IsInteractiveAreaActive(ComputerInteractionArea) && !ComputerInteractionArea.state.active) {
        if (HouseStore.state.wifiFixed) {
          HouseAnimations.state.wifi = styleHouse.wifiAnimation
        } else {
          HouseAnimations.state.wifi = styleHouse.wifiAnimation
          setTimeout(() => {
            setTemporaryText('Nope, it is still not working')
          }, 1000)
        }
        setTimeout(() => {
          ComputerInteractionArea.state.active = false
          HouseAnimations.state.wifi = null
        }, 1500)
      }
      break
    case 40:
      if (IsInteractiveAreaActive(Stair1FloorInteractionArea)) {
        HouseStore.state.left = -970
        HouseStore.state.top = -742
      }
    case 38:
      if (IsInteractiveAreaActive(Stair0Floor1InteractionArea)) {
        HouseStore.state.left = -500
        HouseStore.state.top = -311
      }
    default:
      break
  }
})

document.addEventListener('keyup', (e) => {
  PlayerStore.state.isWalking = false
})

gameLoop()

let resizeTimeout
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    window.location.reload()
  }, 250)
})
