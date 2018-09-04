import Gruu from 'gruujs'
import cx from 'classnames'

import houseSVG from './svg/house11.svg'
import oilSVG from './svg/oil2.svg'
import tapeSVG from './svg/tape.svg'
import gearSVG from './svg/gear2.svg'
import stairsSVG from './svg/stairs3.svg'
import windowSVG from './svg/window.svg'
import doorSVG from './svg/door.svg'
import drawers1SVG from './svg/drawers1.svg'
import drawers2SVG from './svg/drawers2.svg'

import style from './sass/index.scss'
import styleHouse from './sass/house.scss'

const centerX = window.innerWidth / 2
const centerY = window.innerHeight / 2

const PlayerStore = (
  <$
    state={{
      direction: 'LEFT',
      isWalking: false,
      left: -1250,
      top: -308,
    }}
  />
)

const HouseStore = (
  <$
    state={{
      startScreen: false,
      shadowScreenText: '',
      introStory: false,
      inIntroZone: false,
      wifiCrossVisible: true,
      wifiFixed: false,
      leverFixed: false,
      wireFixed: false,
      gearFixed: false,
      tapeTaken: false,
      oilTaken: false,
      gearTaken: false
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
    {/* {() => HouseStore.state.introStory && Arm({ animationDelay: 0 })} */}
    {/* {ArmWithLight()} */}
  </div>
)

const Hero = (
  <div
    $className={() => cx(style.hero, /* HouseStore.state.introStory && style.programming */ )}
    $style={() => ({
      transform: PlayerStore.state.direction === 'RIGHT'
        ? 'scaleX(-1) translate(50%, -50%)'
        : 'scaleX(1) translate(-50%, -50%)'
    })}
  >
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
const setTemporaryText = (temporaryText, time = 5000) => {
  Tips.state.temporaryText = temporaryText
  clearTimeout(temporaryTextTimeout)
  temporaryTextTimeout = setTimeout(() => {
    Tips.state.temporaryText = ''
  }, time)
}

const IntoZone = (
  <div
    state={{ active: false }}
    className={cx(styleHouse.interactionArea)}
    style={{ left: 1450, top: 120, width: 30, height: 300 }}
  />
)

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
    {() => HouseStore.state.wifiCrossVisible && <div className={styleHouse.wifiCross} />}
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

const InteractionAreas = [
  { left: 470, top: 120, width: 80, height: 300 },
  { left: 940, top: 555, width: 80, height: 300 },
  { left: 300, top: 555, width: 80, height: 300 },
  { left: 765, top: 1000, width: 80, height: 300 },
  { left: 1570, top: 555, width: 200, height: 300 },
  { left: 620, top: 555, width: 270, height: 300 },
  { left: 1170, top: 1000, width: 170, height: 300 },
  { left: 50, top: 1000, width: 350, height: 300 },
  { left: 1650, top: 120, width: 150, height: 300 }
].map(style => <div className={cx(styleHouse.interactionArea)} style={style}/>)

const Stair1FloorInteractionArea = InteractionAreas[0]
const Stair0Floor1InteractionArea = InteractionAreas[1]
const Stair0Floor2InteractionArea = InteractionAreas[2]
const Stairm1FloorInteractionArea = InteractionAreas[3]

const Oil = <div className={styleHouse.oil} innerHTML={oilSVG} />

const OilInteractionArea = InteractionAreas[4]
const WireInteractionArea = InteractionAreas[5]

// const Sparkle = (side, rotate, delay) => (
//   <div
//     className={styleHouse.sparkle}
//     style={{
//       transform: side === 'left' ?  `rotateZ(${rotate}deg)` : `rotateZ(${rotate}deg) scaleX(-1)`,
//       left: side === 'left' ? '715px' : '805px'
//     }}
//   >
//     <div style={{ animationDelay: `${delay}s` }}/>
//   </div>
// )

const Wire = (
  <div className={styleHouse.wireContainer}>
    {/* <div>
      <div />
      <div />
      <div />
      <div />
    </div> */}
    {
      () => !HouseStore.state.wireFixed ? (
        <$>
          {/* {Sparkle('left', -35, 0)}
          {Sparkle('left', 15, 0.2)}
          {Sparkle('left', -15, 0.4)}
          {Sparkle('right', -15, 0)}
          {Sparkle('right', 35, 0.2)}
          {Sparkle('right', 15, 0.4)} */}
        </$>
      ) : (
        <div className={styleHouse.fixingWire} />
      )
    }
  </div>
)

const Stairs = [
  { left: 484, top: 279 },
  { left: 311, top: 712 }
].map(style => <div className={styleHouse.static} innerHTML={stairsSVG} style={style} />)

const Windows = [
  { left: 857, top: 95 },
  { left: 426, top: 95 },
  { left: 112, top: 542 },
  { left: 1484, top: 542 }
].map(style => (
  <div className={styleHouse.static} innerHTML={windowSVG} style={style}></div>
))

const Doors = [
  { left: 421, top: 570 },
  { left: 1606, top: 1002 }
].map(style => (
  <div className={styleHouse.static} innerHTML={doorSVG} style={style}></div>
))

const Drawers = [
  { style: { left: 879, top: 268 }, type: drawers1SVG },
  { style: { left: 1313, top: 1133 }, type: drawers1SVG },
  { style: { left: 735, top: 268 }, type: drawers2SVG },
  { style: { left: 1486, top: 702 }, type: drawers2SVG },
].map(({ style, type }) => (
  <div className={styleHouse.static} innerHTML={type} style={style}></div>
))

const Tape = <div className={styleHouse.tape} innerHTML={tapeSVG}></div>

const TapeInteractionArea = InteractionAreas[6]

const StaticGear = (customStyle = {}) => (
  <div className={cx(styleHouse.gear, styleHouse.staticGear)} innerHTML={gearSVG} style={customStyle}></div>
)

const StaticGearInteractionArea = InteractionAreas[7]

const DynamicGear = (
  <div className={cx(styleHouse.gear, styleHouse.dynamicGear)} innerHTML={gearSVG} />
)

const DynamicGearInteractionArea = InteractionAreas[8]

const HouseBackground = (
  <div className={styleHouse.house} style={{
    left: `calc(${PlayerStore.state.left}px + ${window.innerWidth / 2}px)`,
    top: `calc(${PlayerStore.state.top}px + ${window.innerHeight / 2}px)`,
  }}>
    <div innerHTML={houseSVG} />
    {Stairs[0]}
    {Stairs[1]}
    {Windows[0]}
    {Windows[1]}
    {Windows[2]}
    {Windows[3]}
    {Doors[0]}
    {Doors[1]}
    {Drawers[0]}
    {Drawers[1]}
    {Drawers[2]}
    {Drawers[3]}
    {IntoZone}
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
    {() => HouseStore.state.gearFixed ? StaticGear({ left: 110 }): StaticGear({ left: 110, animationDuration: `0s` })}
    {StaticGearInteractionArea}
    {() => !HouseStore.state.gearTaken && DynamicGear}
    {DynamicGearInteractionArea}
  </div>
)

const ShadowScreen = (
  <div
    $className={() => cx(styleHouse.shadowScreen, HouseStore.state.shadowScreenText && styleHouse.shadowScreenOn)}
    $innerHTML={() => HouseStore.state.shadowScreenText}
  />
)

const startGame = () => {
  HouseStore.state.startScreen = false
  HouseStore.state.shadowScreenText = 'You\'ve been working as always at night...'
  setTimeout(() => {
    HouseStore.state.shadowScreenText = 'And suddenly you find yourself...'
    setTimeout(() => {
      HouseStore.state.shadowScreenText = 'DISCONNECTED'
      setTimeout(() => {
        HouseStore.state.shadowScreenText = ''
        PlayerStore.state.left = -1460
        PlayerStore.state.top = -311
        HouseStore.state.inIntroZone = true
      }, 3000)
    }, 3000)
  }, 3000)
}

const App = (
  <div>
    {
      () => (
        HouseStore.state.startScreen
          ? (
            <div className={styleHouse.startScreen}>
              <button onclick={startGame}>PLAY</button>
            </div>
          )
          : (
              <$>
                {HouseBackground}
                {Hero}
                {Tips}
                {ShadowScreen}
              </$>
            )
      )
    }
  </div>
)

Gruu.renderApp(document.querySelector('#root'), App)

const isInteractiveAreaActive = (Area) => {
  const bbox = Area._n.getBoundingClientRect()
  return (
    bbox.left < centerX && bbox.right > centerX && bbox.top < centerY && bbox.bottom > centerY
  )
}

const walkingLoop = () => {
  let start = Date.now()
  if (HouseStore.state.startScreen) {
    setTimeout(walkingLoop, 30)
    return
  }

  if (PlayerStore.state.isWalking) {
    switch (PlayerStore.state.direction) {
      case 'LEFT':
        if (PlayerStore.state.left < -30) PlayerStore.state.left += 3
        break
      case 'RIGHT':
        if (PlayerStore.state.left > -1770) PlayerStore.state.left -= 3
        break
      default:
        break
    }
  }

  let end = Date.now()
  setTimeout(walkingLoop, 30 - (end - start))
}

const walkAnim = () => {
  if (HouseBackground._n) {
    HouseBackground._n.style.left = `calc(${PlayerStore.state.left}px + ${window.innerWidth / 2}px)`
    HouseBackground._n.style.top = `calc(${PlayerStore.state.top}px + ${window.innerHeight / 2}px)`
  }
  requestAnimationFrame(walkAnim)
}

walkAnim()

const gameLoop = () => {
  if (HouseStore.state.startScreen) {
    setTimeout(gameLoop, 250)
    return
  }

  let tipsText = ''
  let tipsVisible = false

  if (isInteractiveAreaActive(IntoZone) && HouseStore.state.inIntroZone) {
    tipsVisible = true
    tipsText = 'Move using ← → and solve problem...'
  } else {
    HouseStore.state.inIntroZone = false
  }

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

  if (isInteractiveAreaActive(DynamicGearInteractionArea) && !HouseStore.state.gearTaken) {
    tipsVisible = true
    tipsText = 'I don\'t remember putting it here...\n\nPress E to pick gear'
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

  setTimeout(gameLoop, 250)
}

document.addEventListener('keydown', (e) => {
  if (HouseStore.state.wifiFixed || /* HouseStore.state.introStory || */ HouseStore.state.startScreen) return
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
        if (HouseStore.state.gearFixed && HouseStore.state.leverFixed && HouseStore.state.wireFixed) {
          HouseStore.state.wifiFixed = true
          HouseAnimations.state.wifi = styleHouse.wifiAnimation
          setTimeout(() => {
            HouseStore.state.wifiCrossVisible = false
            setTimeout(() => {
              HouseStore.state.shadowScreenText = '<span>THE END</span>'
            }, 1000)
            setTemporaryText('Yey!, it works!', 100000000)
          }, 1000)
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
      if (
        isInteractiveAreaActive(DynamicGearInteractionArea) &&
        !HouseStore.state.gearTaken
      ) {
        HouseStore.state.gearTaken = true
      }
      break
    case 40:
      if (isInteractiveAreaActive(Stair1FloorInteractionArea)) {
        PlayerStore.state.left = -970
        PlayerStore.state.top = -742
        PlayerStore.state.direction = 'RIGHT'
      }
      if (isInteractiveAreaActive(Stair0Floor2InteractionArea)) {
        PlayerStore.state.left = -800
        PlayerStore.state.top = -1175
        PlayerStore.state.direction = 'RIGHT'
      }
      break
    case 38:
      if (isInteractiveAreaActive(Stair0Floor1InteractionArea)) {
        PlayerStore.state.left = -500
        PlayerStore.state.top = -311
        PlayerStore.state.direction = 'LEFT'
      }
      if (isInteractiveAreaActive(Stairm1FloorInteractionArea)) {
        PlayerStore.state.left = -335
        PlayerStore.state.top = -742
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
walkingLoop()

let resizeTimeout
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    window.location.reload()
  }, 250)
})
