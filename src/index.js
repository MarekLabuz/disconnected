import Gruu from 'gruujs'

import houseSVG from './minified_svg/house.svg'
import oilSVG from './minified_svg/oil.svg'
import tapeSVG from './minified_svg/tape.svg'
import gearSVG from './minified_svg/gear.svg'
import stairsSVG from './minified_svg/stairs.svg'
import stairsPropSVG from './minified_svg/stairs_prop.svg'
import windowSVG from './minified_svg/window.svg'
import windowSillSVG from './minified_svg/window_sill.svg'
import doorSVG from './minified_svg/door.svg'
import drawers1SVG from './minified_svg/drawers1.svg'
import drawers2SVG from './minified_svg/drawers2.svg'
import wireSVG from './minified_svg/wire.svg'
import tableSVG from './minified_svg/table.svg'

import style from './sass/index.scss'
import styleHouse from './sass/house.scss'

const centerX = window.innerWidth / 2
const centerY = window.innerHeight / 2

let left = -1460
let top = -311

const PlayerStore = (
  <$
    state={{
      direction: 'LEFT',
      isWalking: false,
      floor: 1
    }}
  />
)

const HouseStore = (
  <$
    state={{
      startScreen: true,
      shadowScreenText: '',
      introStory: false,
      inIntroZone: true,
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
      $className={() => `${style.legPart} ${style.thigh} ${(
        PlayerStore.state.isWalking
          ? style.thighMoveAnimation
          : style.thighStandAnimation
      )}`}
      style={customLegPartStyle}
    >
      <div
        $className={() => `${style.legPart} ${style.calf} ${(
          PlayerStore.state.isWalking
            ? style.calfMoveAnimation
            : style.calfStandAnimation
        )}`}
        style={customLegPartStyle}
      />
    </div>
  </div>
)

const Arm = (
  <div className={style.arm}>
    <div
      $className={() => `${style.armPart} ${style.shoulder} ${(
        PlayerStore.state.isWalking
          ? style.shoulderMoveAnimation
          : style.shoulderStandAnimation
      )}`}
    >
      <div
        $className={() => `${style.armPart} ${style.forearm} ${(
          PlayerStore.state.isWalking
            ? style.forearmMoveAnimation
            : style.forearmStandAnimation
        )}`}
      />
    </div>
  </div>
)

const ArmWithLight = (
  <div className={style.arm}>
    <div className={`${style.armPart} ${style.shoulder} ${style.shoulderWithLightAnimation}`}>
      <div className={`${style.armPart} ${style.forearm} ${style.forearmWithLightAnimation}`}>
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
    $className={() => `${style.chest} ${(
      PlayerStore.state.isWalking
        ? style.chestMoveAnimation
        : style.chestStandAnimation
    )}`}
  >
    {Head}
    {Arm}
    {ArmWithLight}
  </div>
)

const Hero = (
  <div
    className={style.hero}
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
      return `${styleHouse.tips} ${this.state.visible && styleHouse.tipsVisible}`
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
    className={styleHouse.interactionArea}
    style={{ left: 1450, top: 120, width: 30 }}
  />
)

const Lever = (
  <div $className={() => `${styleHouse.lever} ${HouseAnimations.state.lever}`}>
    <div />
  </div>
)

const LeverInteractionArea = (
  <div
    state={{ active: false }}
    className={styleHouse.interactionArea}
    style={{ left: 50, top: 120, width: 320 }}
  />
)

const Computer = (
  <$>
    {
      () => PlayerStore.state.floor === 1 && (
        <div $className={() => `${styleHouse.wifiContainer} ${HouseAnimations.state.wifi}`}>
          {() => HouseStore.state.wifiCrossVisible && <div className={styleHouse.wifiCross} />}
          <div className={styleHouse.wifi} />
        </div>
      )
    }
  </$>
)

const ComputerInteractionArea = (
  <div
    state={{ active: false }}
    className={styleHouse.interactionArea}
    style={{ left: 1120, top: 120, width: 300 }}
  />
)

const InteractionAreas = [
  { left: 470, top: 120, width: 80 }, // Stair1FloorInteractionArea
  { left: 940, top: 555, width: 80 }, // Stair0Floor1InteractionArea
  { left: 300, top: 555, width: 80 }, // Stair0Floor2InteractionArea
  { left: 765, top: 1000, width: 80 }, // Stairm1FloorInteractionArea
  { left: 1570, top: 555, width: 200 }, // OilInteractionArea
  { left: 620, top: 555, width: 270 }, // WireInteractionArea
  { left: 1170, top: 1000, width: 170 }, // TapeInteractionArea
  { left: 50, top: 1000, width: 350 }, // StaticGearInteractionArea
  { left: 1650, top: 120, width: 150 } // DynamicGearInteractionArea
].map(style => <div className={styleHouse.interactionArea} style={style}/>)

const Oil = <div className={styleHouse.oil} innerHTML={oilSVG} />

const Wire = (
  <div>
    {
      () => PlayerStore.state.floor === 0 && (
        <$>
          {
            () => !HouseStore.state.wireFixed
              ? <div className={styleHouse.static} innerHTML={wireSVG} style={{ left: 728, top: 762 }} />
              : <div className={styleHouse.fixingWire} />
          }
        </$>
      )
    }
  </div>
)

const Stairs = [
  [{ left: 484, top: 279 }, () => PlayerStore.state.floor >= 0],
  [{ left: 311, top: 712 }, () => PlayerStore.state.floor <= 0],
].map(([style, show]) => (
  <$>
    {
      () => show() && (
        <div className={styleHouse.static} innerHTML={stairsSVG} style={style} />
      )
    }
  </$>
))

const StairsProps = [
  [{ left: 531, top: 314 }, () => PlayerStore.state.floor >= 0],
  [{ left: 579, top: 362 }, () => PlayerStore.state.floor >= 0],
  [{ left: 627, top: 410 }, () => PlayerStore.state.floor >= 0],
  [{ left: 675, top: 458 }, () => PlayerStore.state.floor === 0],
  [{ left: 723, top: 506 }, () => PlayerStore.state.floor === 0],
  [{ left: 771, top: 554 }, () => PlayerStore.state.floor === 0],
  [{ left: 819, top: 602 }, () => PlayerStore.state.floor === 0],
  [{ left: 867, top: 650 }, () => PlayerStore.state.floor === 0],

  [{ left: 358, top: 747 }, () => PlayerStore.state.floor <= 0],
  [{ left: 406, top: 795 }, () => PlayerStore.state.floor <= 0],
  [{ left: 454, top: 843 }, () => PlayerStore.state.floor <= 0],
  [{ left: 502, top: 891 }, () => PlayerStore.state.floor === -1],
  [{ left: 550, top: 939 }, () => PlayerStore.state.floor === -1],
  [{ left: 598, top: 987 }, () => PlayerStore.state.floor === -1],
  [{ left: 646, top: 1035 }, () => PlayerStore.state.floor === -1],
  [{ left: 694, top: 1083 }, () => PlayerStore.state.floor === -1],
].map(([style, show]) => (
  <$>
    {
      () => show() && (
        <div className={styleHouse.static} innerHTML={stairsPropSVG} style={style} />
      )
    }
  </$>
))

const Windows = [
  [{ left: 857, top: 95 }, true, () => PlayerStore.state.floor === 1],
  [{ left: 426, top: 95 }, true, () => PlayerStore.state.floor === 1],
  [{ left: 112, top: 542 }, true, () => PlayerStore.state.floor === 0],
  [{ left: 1484, top: 542 }, false, () => PlayerStore.state.floor === 0],
].map(([style, windowSill, show]) => (
  <$>
    {
      () => show() && (
        <div>
          <div className={styleHouse.static} innerHTML={windowSVG} style={style}></div>
          {windowSill && <div className={styleHouse.static} innerHTML={windowSillSVG} style={{ left: style.left - 20, top: style.top + 132 }}></div>}
        </div>
      )
    }
  </$>
))

const Doors = [
  [{ left: 421, top: 570 }, () => PlayerStore.state.floor === 0],
  [{ left: 1606, top: 1002 }, () => PlayerStore.state.floor === -1],
].map(([style, show]) => (
  <$>
    {() => show() && (
      <div className={styleHouse.static} innerHTML={doorSVG} style={style}></div>
    )}
  </$>
))

const Drawers = [
  [{ left: 879, top: 268 }, drawers1SVG, () => PlayerStore.state.floor === 1],
  [{ left: 1313, top: 1133 }, drawers1SVG, () => PlayerStore.state.floor === -1],
  [{ left: 735, top: 268 }, drawers2SVG, () => PlayerStore.state.floor === 1],
  [{ left: 1486, top: 702 }, drawers2SVG, () => PlayerStore.state.floor === 0],
].map(([style, type, show]) => (
  <$>
    {() => show() && (
      <div className={styleHouse.static} innerHTML={type} style={style}></div>
    )}
  </$>
))

const Tables = [
  [{ left: 1160, top: 257 }, () => PlayerStore.state.floor === 1],
  [{ left: 1108, top: 1121 }, () => PlayerStore.state.floor === -1],
].map(([style, show]) => (
  <$>
    {() => show() && (
      <div className={styleHouse.static} innerHTML={tableSVG} style={style}></div>
    )}
  </$>
))

const Tape = <div className={styleHouse.tape} innerHTML={tapeSVG}></div>

const StaticGear = (customStyle = {}) => (
  <$>
    {
      () => PlayerStore.state.floor === -1 && (
        <div className={`${styleHouse.gear} ${styleHouse.staticGear}`} innerHTML={gearSVG} style={customStyle}></div>
      )
    }
  </$>
)

const DynamicGear = (
  <div className={`${styleHouse.gear} ${styleHouse.dynamicGear}`} innerHTML={gearSVG} />
)

const HouseBackground = (
  <div className={styleHouse.house} style={{
    left: `${left + centerX}px`,
    top: `${top + centerY}px`,
  }}>
    <div innerHTML={houseSVG} />
    {() => Stairs}
    {() => StairsProps}
    {() => Windows}
    {() => Doors}
    {() => Drawers}
    {() => Tables}
    {IntoZone}
    {Lever}
    {() => InteractionAreas}
    {LeverInteractionArea}
    {Computer}
    {ComputerInteractionArea}
    {() => !HouseStore.state.oilTaken && Oil}
    {Wire}
    {() => !HouseStore.state.tapeTaken && Tape}
    {StaticGear()}
    {() => HouseStore.state.gearFixed ? StaticGear({ left: 160, animationDirection: 'reverse', animationDelay: '-0.5s' }) : <div className={styleHouse.emptyGear} />}
    {() => HouseStore.state.gearFixed ? StaticGear({ left: 110 }): StaticGear({ left: 110, animationDuration: `0s` })}
    {() => !HouseStore.state.gearTaken && DynamicGear}
  </div>
)

const ShadowScreen = (
  <div
    $className={() => `${styleHouse.shadowScreen} ${HouseStore.state.shadowScreenText && styleHouse.shadowScreenOn}`}
    $innerHTML={() => HouseStore.state.shadowScreenText}
  />
)

const startGame = () => {
  HouseStore.state.startScreen = false
  HouseStore.state.shadowScreenText = `You've been working as always at night...`
  setTimeout(() => {
    HouseStore.state.shadowScreenText = 'And suddenly you find yourself...'
    setTimeout(() => {
      HouseStore.state.shadowScreenText = 'DISCONNECTED'
      setTimeout(() => {
        HouseStore.state.shadowScreenText = ''
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
  const bbox = Area && Area._n && Area._n.getBoundingClientRect()
  return (
    bbox && (bbox.left < centerX && bbox.right > centerX && bbox.top < centerY && bbox.bottom > centerY)
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
        if (left < -30) left += 3
        break
      case 'RIGHT':
        if (left > -1770) left -= 3
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
    HouseBackground._n.style.left = `${left + centerX}px`
    HouseBackground._n.style.top = `${top + centerY}px`
  }
  setTimeout(walkAnim, 30)
}

walkAnim()

const gameLoop = () => {
  if (HouseStore.state.startScreen) {
    setTimeout(gameLoop, 500)
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
      tipsText = `It looks like I've lost connection...\n\nPress E to interact`
    }
  }

  if (isInteractiveAreaActive(InteractionAreas[0]) || isInteractiveAreaActive(InteractionAreas[2])) {
    tipsVisible = true
    tipsText = 'Press ↓ to go downstairs'
  }

  if (isInteractiveAreaActive(InteractionAreas[1]) || isInteractiveAreaActive(InteractionAreas[3])) {
    tipsVisible = true
    tipsText = 'Press ↑ to go upstairs'
  }

  if (isInteractiveAreaActive(InteractionAreas[4]) && !HouseStore.state.oilTaken) {
    tipsVisible = true
    tipsText = 'Hmm... I might use it somewhere\n\nPress E to pick oil'
  }

  if (isInteractiveAreaActive(InteractionAreas[5])) {
    tipsVisible = true
    if (!HouseStore.state.wireFixed) {
      tipsText = 'Ouch! It looks bad...\n\nPress E to interact'
    } else {
      tipsText = `Well... That's definitely better`
    }
  }

  if (isInteractiveAreaActive(InteractionAreas[6]) && !HouseStore.state.tapeTaken) {
    tipsVisible = true
    tipsText = 'That may be useful...\n\nPress E to pick tape'
  }

  if (isInteractiveAreaActive(InteractionAreas[7])) {
    tipsVisible = true
    if (!HouseStore.state.gearFixed) {
      tipsText = `There's something missing here...\n\nPress E to interact`
    } else {
      tipsText = 'I seems to be working now...'
    }
  }

  if (isInteractiveAreaActive(InteractionAreas[8]) && !HouseStore.state.gearTaken) {
    tipsVisible = true
    tipsText = `I don't remember putting it here...\n\nPress E to pick gear`
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

let currentKey = null
document.addEventListener('keydown', (e) => {
  if (currentKey === e.keyCode) return
  currentKey = e.keyCode
  if (HouseStore.state.wifiFixed || HouseStore.state.startScreen) return
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
            setTemporaryText(`Hmm..., it won't go any further...\nI wish I had something to oil it`)
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
              HouseStore.state.shadowScreenText = 'THE END'
            }, 1000)
            setTemporaryText('Yey!, it works!', 10000)
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
        isInteractiveAreaActive(InteractionAreas[4]) &&
        !HouseStore.state.oilTaken
      ) {
        HouseStore.state.oilTaken = true
      }
      if (
        isInteractiveAreaActive(InteractionAreas[5]) &&
        !HouseStore.state.wireFixed
      ) {
        if (HouseStore.state.tapeTaken) {
          HouseStore.state.wireFixed = true
        } else {
          setTemporaryText(`I'd better not touch it\nI have to find something to fix it`)
        }
      }
      if (
        isInteractiveAreaActive(InteractionAreas[6]) &&
        !HouseStore.state.tapeTaken
      ) {
        HouseStore.state.tapeTaken = true
      }
      if (
        isInteractiveAreaActive(InteractionAreas[7]) &&
        !HouseStore.state.gearFixed
      ) {
        if (HouseStore.state.gearTaken) {
          HouseStore.state.gearFixed = true
        } else {
          setTemporaryText(`Without necessary tools I can't do anything...`)
        }
      }
      if (
        isInteractiveAreaActive(InteractionAreas[8]) &&
        !HouseStore.state.gearTaken
      ) {
        HouseStore.state.gearTaken = true
      }
      break
    case 40:
      if (isInteractiveAreaActive(InteractionAreas[0])) {
        left = -970
        top = -742
        PlayerStore.state.direction = 'RIGHT'
        PlayerStore.state.floor = 0
      }
      if (isInteractiveAreaActive(InteractionAreas[2])) {
        left = -800
        top = -1175
        PlayerStore.state.direction = 'RIGHT'
        PlayerStore.state.floor = -1
      }
      break
    case 38:
      if (isInteractiveAreaActive(InteractionAreas[1])) {
        left = -500
        top = -311
        PlayerStore.state.direction = 'LEFT'
        PlayerStore.state.floor = 1
      }
      if (isInteractiveAreaActive(InteractionAreas[3])) {
        left = -335
        top = -742
        PlayerStore.state.direction = 'LEFT'
        PlayerStore.state.floor = 0
      }
      break
    default:
      break
  }
})

document.addEventListener('keyup', (e) => {
  currentKey = null
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
