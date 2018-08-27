import Gruu from 'gruujs'
import cx from 'classnames'

import houseSVG from './svg/house.svg'
import oilSVG from './svg/oil.svg'
import tapeSVG from './svg/tape.svg'
import gearSVG from './svg/gear.svg'

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
// top: -742,
// }}

const HouseStore = (
  <$
    state={{
      left: -400,
      top: -1180,
      wifiFixed: false,
      leverFixed: false,
      wireFixed: false,
      gearFixed: false,
      tapeTaken: false,
      oilTaken: false,
      gearTaken: true
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
  <div $className={() => cx(styleHouse.lever, HouseAnimations.state.lever)}>
    <div />
  </div>
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

const Stair0Floor2InteractionArea = (
  <div
    className={cx(styleHouse.interactionArea)}
    style={{ left: 300, top: 555, width: 80, height: 300 }}
  />
)

const Stairm1FloorInteractionArea = (
  <div
    className={cx(styleHouse.interactionArea)}
    style={{ left: 765, top: 1000, width: 80, height: 300 }}
  />
)

const Oil = (
  <div className={styleHouse.oil} innerHTML={oilSVG}></div>
)

const OilInteractionArea = (
  <div
    className={cx(styleHouse.interactionArea)}
    style={{ left: 1510, top: 555, width: 250, height: 300 }}
  />
)

const WireInteractionArea = (
  <div
    className={cx(styleHouse.interactionArea)}
    style={{ left: 620, top: 555, width: 270, height: 300 }}
  />
)

const Sparkle = (side, rotate, delay) => (
  <div
    className={styleHouse.sparkle}
    style={{
      transform: side === 'left' ?  `rotateZ(${rotate}deg)` : `rotateZ(${rotate}deg) scaleX(-1)`,
      left: side === 'left' ? '715px' : '805px'
    }}
  >
    <div style={{ animationDelay: `${delay}s` }}/>
  </div>
)

const Wire = (
  <div className={styleHouse.wireContainer}>
    <div>
      <div />
      <div />
      <div />
      <div />
    </div>
    {
      () => !HouseStore.state.wireFixed ? (
        <$>
          {Sparkle('left', -35, 0)}
          {Sparkle('left', 15, 0.2)}
          {Sparkle('left', -15, 0.4)}
          {Sparkle('right', -15, 0)}
          {Sparkle('right', 35, 0.2)}
          {Sparkle('right', 15, 0.4)}
        </$>
      ) : (
        <div className={styleHouse.fixingWire} />
      )
    }
  </div>
)

const Tape = (
  <div className={styleHouse.tape} innerHTML={tapeSVG}></div>
)

const TapeInteractionArea = (
  <div
    className={cx(styleHouse.interactionArea)}
    style={{ left: 1130, top: 1000, width: 270, height: 300 }}
  />
)

const StaticGear = (customStyle = {}) => (
  <div className={styleHouse.staticGear} innerHTML={gearSVG} style={customStyle}></div>
)

const StaticGearInteractionArea = (
  <div
    className={cx(styleHouse.interactionArea)}
    style={{ left: 50, top: 1000, width: 350, height: 300 }}
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
    {() => !HouseStore.state.oilTaken && Oil}
    {OilInteractionArea}
    {Stair1FloorInteractionArea}
    {Stair0Floor1InteractionArea}
    {Stair0Floor2InteractionArea}
    {Stairm1FloorInteractionArea}
    {Wire}
    {WireInteractionArea}
    {() => !HouseStore.state.tapeTaken && Tape}
    {TapeInteractionArea}
    {StaticGear()}
    {() => HouseStore.state.gearFixed ? StaticGear({ left: 160, animationDirection: 'reverse', animationDelay: '-0.5s' }) : <div className={styleHouse.emptyGear} />}
    {() => HouseStore.state.gearFixed ? StaticGear({ left: 110 }): StaticGear({ left: 100, animationDuration: `0s` })}
    {StaticGearInteractionArea}
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

const isInteractiveAreaActive = (Area) => {
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

  if (isInteractiveAreaActive(LeverInteractionArea)) {
    tipsVisible = true
    if (!HouseStore.state.leverFixed) {
      tipsText = 'That looks interesting...\n\nPress E to interact'
    } else {
      tipsText = 'I hope it is alright now...'
    }
  }

  if (isInteractiveAreaActive(ComputerInteractionArea)) {
    tipsVisible = true
    if (!HouseStore.state.wifiFixed) {
      tipsText = 'It looks like I\'ve lost connection...\n\nPress E to interact'
    }
  }

  if (isInteractiveAreaActive(Stair1FloorInteractionArea) || isInteractiveAreaActive(Stair0Floor2InteractionArea)) {
    tipsVisible = true
    tipsText = 'Press ↓ to go downstairs'
  }

  if (isInteractiveAreaActive(Stair0Floor1InteractionArea) || isInteractiveAreaActive(Stairm1FloorInteractionArea)) {
    tipsVisible = true
    tipsText = 'Press ↑ to go upstairs'
  }

  if (isInteractiveAreaActive(OilInteractionArea) && !HouseStore.state.oilTaken) {
    tipsVisible = true
    tipsText = 'Hmm... I might use it somewhere\n\nPress E to pick oil'
  }

  if (isInteractiveAreaActive(WireInteractionArea)) {
    tipsVisible = true
    if (!HouseStore.state.wireFixed) {
      tipsText = 'Ouch! It looks bad...\n\nPress E to interact'
    } else {
      tipsText = 'Well... That\'s definitely better'
    }
  }

  if (isInteractiveAreaActive(TapeInteractionArea) && !HouseStore.state.tapeTaken) {
    tipsVisible = true
    tipsText = 'That may be useful...\n\nPress E to pick tape'
  }

  if (isInteractiveAreaActive(StaticGearInteractionArea)) {
    tipsVisible = true
    if (!HouseStore.state.gearFixed) {
      tipsText = 'There\'s something missing here...\n\nPress E to interact'
    } else {
      tipsText = 'I seems to be working now...'
    }
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
      if (
        !HouseStore.state.leverFixed &&
        isInteractiveAreaActive(LeverInteractionArea) &&
        !LeverInteractionArea.state.active
      ) {
        LeverInteractionArea.state.active = true
        if (HouseStore.state.oilTaken) {
          HouseStore.state.leverFixed = true
          HouseAnimations.state.lever = styleHouse.leverFixedAnimation
        } else {
          HouseAnimations.state.lever = styleHouse.leverBrokenAnimation
          setTimeout(() => {
            setTemporaryText('Hmm..., it won\'t go any further...\nI wish I had something to oil it')
          }, 1000)
        }
        setTimeout(() => {
          if (!HouseStore.state.leverFixed) {
            LeverInteractionArea.state.active = false
            HouseAnimations.state.lever = null
          }
        }, 2000)
      }
      if (
        isInteractiveAreaActive(ComputerInteractionArea) &&
        !ComputerInteractionArea.state.active
      ) {
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
      if (
        isInteractiveAreaActive(OilInteractionArea) &&
        !HouseStore.state.oilTaken
      ) {
        HouseStore.state.oilTaken = true
      }
      if (
        isInteractiveAreaActive(WireInteractionArea) &&
        !HouseStore.state.wireFixed
      ) {
        if (HouseStore.state.tapeTaken) {
          HouseStore.state.wireFixed = true
        } else {
          setTemporaryText('I\'d better not touch it\nI have to find something to isolate it')
        }
      }
      if (
        isInteractiveAreaActive(TapeInteractionArea) &&
        !HouseStore.state.tapeTaken
      ) {
        HouseStore.state.tapeTaken = true
      }
      if (
        isInteractiveAreaActive(StaticGearInteractionArea) &&
        !HouseStore.state.gearFixed
      ) {
        if (HouseStore.state.gearTaken) {
          HouseStore.state.gearFixed = true
        } else {
          setTemporaryText('Without necessary tools I can do nothing...')
        }
      }
      break
    case 40:
      if (isInteractiveAreaActive(Stair1FloorInteractionArea)) {
        HouseStore.state.left = -970
        HouseStore.state.top = -742
        PlayerStore.state.direction = 'RIGHT'
      }
      if (isInteractiveAreaActive(Stair0Floor2InteractionArea)) {
        HouseStore.state.left = -800
        HouseStore.state.top = -1175
        PlayerStore.state.direction = 'RIGHT'
      }
      break
    case 38:
      if (isInteractiveAreaActive(Stair0Floor1InteractionArea)) {
        HouseStore.state.left = -500
        HouseStore.state.top = -311
        PlayerStore.state.direction = 'LEFT'
      }
      if (isInteractiveAreaActive(Stairm1FloorInteractionArea)) {
        HouseStore.state.left = -335
        HouseStore.state.top = -742
        PlayerStore.state.direction = 'LEFT'
      }
      break
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
