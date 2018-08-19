import Gruu from 'gruujs'
import cx from 'classnames'

// import footSVG from './svg/foot.svg'
// import calfSVG from './svg/calf2.svg'
// import thighSVG from './svg/thigh.svg'
// import torsoSVG from './svg/torso.svg'
import style from './index.scss'

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
  <div className={style.hero}>
    {Chest}
    {Leg({ zIndex: 10 }, { animationDelay: 0 })}
    {Leg({ zIndex: 30 }, { animationDelay: '-1s' })}
  </div>
)

const Light = (
  <div className={style.light}>
    <div />
    <div>
      <div />
      <div />
      <div />
    </div>
    <div />
  </div>
)

const App = (
  <div>
    {Hero}
    {Light}
  </div>
)

Gruu.renderApp(document.querySelector('#root'), App)
