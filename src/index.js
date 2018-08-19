import Gruu from 'gruujs'
import cx from 'classnames'

// import footSVG from './svg/foot.svg'
// import calfSVG from './svg/calf2.svg'
// import thighSVG from './svg/thigh.svg'
// import torsoSVG from './svg/torso.svg'
import houseSVG from './svg/house4.svg'

import style from './index.scss'
import styleHouse from './house.scss'

const PlayerStore = (
  <$
    state={{
      direction: 'NONE'
    }}
  />
)

const HouseStore = (
  <$
    state={{
      left: -1960,
      top: -681
    }}
  />
)

const Leg = (customStyle = {}, customLegPartStyle = {}) => (
  <div className={style.leg} style={customStyle}>
    <div className={cx(style.legPart, style.thigh)} style={customLegPartStyle}>
      {/* <div innerHTML={thighSVG} /> */}
      <div className={cx(style.legPart, style.calf)} style={customLegPartStyle}>
        {/* <div innerHTML={calfSVG} /> */}
        <div className={cx(style.legPart, style.foot)} style={customLegPartStyle}>
          {/* <div innerHTML={footSVG} /> */}
        </div>
      </div>
    </div>
  </div>
)

const Arm = (customStyle = {}, customArmPartStyle = {}) => (
  <div className={style.arm} style={customStyle}>
    <div className={cx(style.armPart, style.shoulder)}  style={customArmPartStyle}>
      <div className={cx(style.armPart, style.forearm)}  style={customArmPartStyle} />
    </div>
  </div>
)

const Head = (
  <div className={style.head} />
)

const Chest = (
  <div className={style.chest}>
    {Head}
    {/* <div innerHTML={torsoSVG} /> */}
    {Arm({ zIndex: 10 }, { animationDelay: 0 })}
    {Arm({ zIndex: 30 }, { animationDelay: '-1s' })}
  </div>
)

const Hero = (
  <div className={style.hero} $style={() => ({
    transform: PlayerStore.state.direction === 'RIGHT'
      ? 'scaleX(-1) translate(50%, -50%)'
      : 'scaleX(1) translate(-50%, -50%)'
  })}>
    {Chest}
    {Leg({ zIndex: 10 }, { animationDelay: 0 })}
    {Leg({ zIndex: 30 }, { animationDelay: '-1s' })}
  </div>
)

const Light = (
  <div className={style.light} $style={() => ({
    transform: PlayerStore.state.direction === 'RIGHT'
      ? 'scaleX(-1)'
      : 'scaleX(1)'
  })}>
    <div />
    <div>
      <div />
      <div />
      <div />
    </div>
    <div />
  </div>
)

const HouseBackground = (
  <div className={styleHouse.house} $style={() => ({
    left: `${HouseStore.state.left}px`,
    top: `${HouseStore.state.top}px`,
  })}>
    {/* <div className={styleHouse.computer}/> */}
    <div innerHTML={houseSVG} />
  </div>
)

const App = (
  <div>
    {HouseBackground}
    {Hero}
    {Light}
  </div>
)

Gruu.renderApp(document.querySelector('#root'), App)

const gameLoop = () => {
  switch (PlayerStore.state.direction) {
    case 'LEFT':
      HouseStore.state.left += 5
      break
    case 'RIGHT':
      HouseStore.state.left -= 5
      break
    default:
      break
  }
  setTimeout(gameLoop, 30)
}

document.addEventListener('keydown', (e) => {
  console.log(e.keyCode)
  switch (e.keyCode) {
    case 39:
      PlayerStore.state.direction = 'RIGHT'
      break
    case 37:
      PlayerStore.state.direction = 'LEFT'
      break
    default:
      break
  }
})

document.addEventListener('keyup', (e) => {
  PlayerStore.state.direction = 'NONE'
})

gameLoop()
