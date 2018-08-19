import Gruu from 'gruujs'
import cx from 'classnames'

import footSVG from './svg/foot.svg'
import calfSVG from './svg/calf.svg'
import style from './index.scss'

const Leg = (customStyle = {}) => (
  <div className={style.leg}>
    <div className={cx(style.legPart, style.thigh)} style={customStyle}>
      <div className={cx(style.legPart, style.calf)} style={customStyle}>
        <div innerHTML={calfSVG} />
        <div className={cx(style.legPart, style.foot)} style={customStyle}>
          <div innerHTML={footSVG} />
        </div>
      </div>
    </div>
  </div>
)

const Hero = (
  <div className={style.hero}>
    {Leg({ animationDelay: 0 })}
    {Leg({ animationDelay: '-1s' })}
  </div>
)

const App = (
  <div>
    {Hero}
  </div>
)

Gruu.renderApp(document.querySelector('#root'), App)
