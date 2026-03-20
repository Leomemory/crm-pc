import { FIGMA_ASSETS } from '../../data/assets'

export function LoginIllustration() {
  return (
    <div className="login-illustration">
      <div className="login-illustration__rings" />
      <div className="login-illustration__phone">
        <img src={FIGMA_ASSETS.loginScreen} alt="" />
      </div>
      <div className="login-illustration__brand-card">ACCM</div>
      <div className="login-illustration__market-card">
        <div className="login-illustration__market-head">
          <span>Trend</span>
          <span>Day +0.39%</span>
          <span>Week +0.41%</span>
        </div>
        <div className="login-illustration__chart" />
      </div>
    </div>
  )
}

export function RegisterIllustration() {
  return (
    <div className="hero-visual hero-visual--register">
      <img src={FIGMA_ASSETS.registerHero} alt="" />
    </div>
  )
}

interface MallShowcaseProps {
  compact?: boolean
}

export function MallShowcase({ compact }: MallShowcaseProps) {
  return (
    <div className={`mall-showcase${compact ? ' mall-showcase--compact' : ''}`}>
      <img className="mall-showcase__podium" src={FIGMA_ASSETS.mallPodium} alt="" />
      <img className="mall-showcase__tablet" src={FIGMA_ASSETS.mallTablet} alt="" />
      <img
        className="mall-showcase__pack mall-showcase__pack--front"
        src={FIGMA_ASSETS.mallPackageFront}
        alt=""
      />
      <img
        className="mall-showcase__pack mall-showcase__pack--bottle"
        src={FIGMA_ASSETS.mallTallBottle}
        alt=""
      />
      <img
        className="mall-showcase__pack mall-showcase__pack--side"
        src={FIGMA_ASSETS.mallSideDevice}
        alt=""
      />
      <img
        className="mall-showcase__pack mall-showcase__pack--glass"
        src={FIGMA_ASSETS.mallBottle}
        alt=""
      />
      <img className="mall-showcase__phone" src={FIGMA_ASSETS.mallPhone} alt="" />
      <img className="mall-showcase__watch" src={FIGMA_ASSETS.mallWatch} alt="" />
      <img className="mall-showcase__glow" src={FIGMA_ASSETS.mallGlow} alt="" />
    </div>
  )
}
