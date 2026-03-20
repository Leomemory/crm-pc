import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'

import authLogo from '../../assets/figma/auth-carousel/auth-logo.svg'
import awardsScene from '../../assets/figma/auth-carousel/awards-scene.png'
import appCardLeft from '../../assets/figma/auth-carousel/app-card-left.png'
import appCardRight from '../../assets/figma/auth-carousel/app-card-right.png'
import appLoginScreen from '../../assets/figma/auth-carousel/app-login-screen.png'
import appShine from '../../assets/figma/auth-carousel/app-shine.png'
import loginChart from '../../assets/figma/auth-carousel/login-chart.svg'
import loginDeviceScreen from '../../assets/figma/auth-carousel/login-device-screen.png'
import loginDeviceShell from '../../assets/figma/auth-carousel/login-device-shell.png'
import loginRings from '../../assets/figma/auth-carousel/login-rings.svg'
import loginTrendIcon from '../../assets/figma/auth-carousel/login-trend-icon.svg'
import mallBottleFront from '../../assets/figma/auth-carousel/mall-bottle-front.png'
import mallDrone from '../../assets/figma/auth-carousel/mall-drone.png'
import mallIpad from '../../assets/figma/auth-carousel/mall-ipad.png'
import mallIphone from '../../assets/figma/auth-carousel/mall-iphone.png'
import mallPurpleBottle from '../../assets/figma/auth-carousel/mall-purple-bottle.png'
import mallShadow from '../../assets/figma/auth-carousel/mall-shadow.svg'
import mallStage from '../../assets/figma/auth-carousel/mall-stage.png'
import mallTallProduct from '../../assets/figma/auth-carousel/mall-tall-product.png'
import mallVitamin from '../../assets/figma/auth-carousel/mall-vitamin.png'
import mallWatch from '../../assets/figma/auth-carousel/mall-watch.png'
import mallWave from '../../assets/figma/auth-carousel/mall-wave.svg'
import mallWine from '../../assets/figma/auth-carousel/mall-wine.png'
import mallVacuum from '../../assets/figma/auth-carousel/mall-vacuum.png'
import researchScene from '../../assets/figma/auth-carousel/research-scene.png'
import mallArrow from '../../assets/figma/icons/mall-arrow.svg'
import { useLocale } from '../../lib/locale'

const LOGIN_MARKET_BARS = [
  16,
  27.556,
  23.111,
  14.222,
  32.889,
  23.111,
  9.778,
  9.778,
  17.778,
  27.556,
  23.111,
  14.222,
  14.222,
  9.778,
  17.778,
  27.556,
  32.889,
  25.778,
  34.667,
  29.333,
  23.111,
  27.556,
  23.111,
  32.889,
  25.778,
  17.778,
  23.111,
  29.333,
  23.111,
  23.111,
  17.778,
] as const

interface AuthVisualCarouselProps {
  initialSlideIndex: number
}

interface SlideConfig {
  key: string
  titleKey: string
  descriptionKey: string
  titleWidth: number
  copyWidth: number
}

const SLIDES: SlideConfig[] = [
  {
    key: 'trend',
    titleKey: 'auth.visual.trend.title',
    descriptionKey: 'auth.visual.trend.description',
    titleWidth: 445,
    copyWidth: 445,
  },
  {
    key: 'awards',
    titleKey: 'auth.visual.awards.title',
    descriptionKey: 'auth.visual.awards.description',
    titleWidth: 271,
    copyWidth: 271,
  },
  {
    key: 'research',
    titleKey: 'auth.visual.research.title',
    descriptionKey: 'auth.visual.research.description',
    titleWidth: 306,
    copyWidth: 306,
  },
  {
    key: 'mall',
    titleKey: 'auth.visual.mall.title',
    descriptionKey: 'auth.visual.mall.description',
    titleWidth: 382,
    copyWidth: 382,
  },
  {
    key: 'app',
    titleKey: 'auth.visual.app.title',
    descriptionKey: 'auth.visual.app.description',
    titleWidth: 360,
    copyWidth: 360,
  },
] as const

function LoginArt() {
  return (
    <>
      <img
        alt=""
        className="auth-visual-slide__layer"
        src={loginRings}
        style={{ left: -20, top: 279, width: 800, height: 800 }}
      />

      <div
        className="auth-visual-slide__layer auth-visual-slide__shadow-card"
        style={{
          left: 222.667,
          top: 430.111,
          width: 312.889,
          height: 640,
          borderRadius: 35.556,
          background: '#171717',
          boxShadow: '7.111px 7.111px 26.667px rgba(0, 0, 0, 0.4)',
        }}
      />
      <img
        alt=""
        className="auth-visual-slide__layer"
        src={loginDeviceShell}
        style={{ left: 220.889, top: 430.111, width: 316.651, height: 639.63 }}
      />
      <img
        alt=""
        className="auth-visual-slide__layer"
        src={loginDeviceScreen}
        style={{
          left: 235.111,
          top: 443.444,
          width: 288,
          height: 623.262,
          borderRadius: 24.889,
        }}
      />

      <div
        className="auth-visual-slide__layer auth-login-slide__card"
        style={{ left: 111.556, top: 622.111, width: 160, height: 53.333 }}
      >
        <img
          alt=""
          className="auth-login-slide__card-logo"
          src={authLogo}
          style={{ width: 93.835, height: 24.652 }}
        />
      </div>

      <div
        className="auth-visual-slide__layer auth-login-slide__market"
        style={{ left: 420, top: 677.222, width: 270.222, height: 177.778 }}
      >
        <div className="auth-login-slide__market-head">
          <span className="auth-login-slide__market-tag">Trend</span>
          <span>Day 0.39%</span>
          <img alt="" src={loginTrendIcon} />
          <span>Week 0.41%</span>
          <img alt="" src={loginTrendIcon} />
        </div>

        <img
          alt=""
          className="auth-login-slide__market-line"
          src={loginChart}
          style={{ left: 14.222, top: 36.743, width: 241.778, height: 81.072 }}
        />

        <div
          className="auth-login-slide__market-bars"
          style={{ left: 14.222, top: 130.667, width: 242.667, height: 34.667 }}
        >
          {LOGIN_MARKET_BARS.map((height, index) => (
            <span
              key={`login-bar-${height}-${index}`}
              style={{ left: index * 8, height, top: 34.667 - height }}
            />
          ))}
        </div>
      </div>
    </>
  )
}

function AwardsArt() {
  return (
    <div
      className="auth-visual-slide__layer auth-visual-slide__overflow-hidden"
      style={{ left: 0, top: 241, width: 780, height: 671 }}
    >
      <img
        alt=""
        className="auth-visual-slide__layer"
        src={awardsScene}
        style={{ left: -452, top: 0, width: 1265.18, height: 831.04 }}
      />
    </div>
  )
}

function ResearchArt() {
  return (
    <img
      alt=""
      className="auth-visual-slide__layer"
      src={researchScene}
      style={{ left: 89, top: 321, width: 602, height: 602 }}
    />
  )
}

function MallArt() {
  return (
    <>
      <img
        alt=""
        className="auth-visual-slide__layer"
        src={mallWave}
        style={{ left: -44, top: 648.439, width: 804.425, height: 307.709 }}
      />
      <img
        alt=""
        className="auth-visual-slide__layer"
        src={mallShadow}
        style={{ left: 135.952, top: 720.3, width: 527.4, height: 95.4 }}
      />
      <img
        alt=""
        className="auth-visual-slide__layer"
        src={mallStage}
        style={{ left: 110.752, top: 629.4, width: 589.536, height: 250.848 }}
      />
      <img
        alt=""
        className="auth-visual-slide__layer"
        src={mallIpad}
        style={{ left: 166.192, top: 524.28, width: 216, height: 216 }}
      />
      <img
        alt=""
        className="auth-visual-slide__layer"
        src={mallDrone}
        style={{ left: 120.832, top: 327, width: 276.48, height: 276.48 }}
      />
      <img
        alt=""
        className="auth-visual-slide__layer"
        src={mallTallProduct}
        style={{ left: 405.232, top: 458.04, width: 80.64, height: 263.52 }}
      />
      <img
        alt=""
        className="auth-visual-slide__layer"
        src={mallWine}
        style={{ left: 338.992, top: 542.28, width: 85.68, height: 167.04 }}
      />
      <img
        alt=""
        className="auth-visual-slide__layer"
        src={mallVacuum}
        style={{ left: 532.672, top: 491.88, width: 106.749, height: 232.56 }}
      />

      <img
        alt=""
        className="auth-visual-slide__layer"
        src={mallBottleFront}
        style={{ left: 369.232, top: 590.52, width: 98.64, height: 133.2 }}
      />
      <div
        className="auth-visual-slide__layer auth-visual-slide__overflow-hidden"
        style={{ left: 369.232, top: 708.6, width: 98.64, height: 133.2 }}
      >
        <img
          alt=""
          className="auth-visual-slide__layer"
          src={mallBottleFront}
          style={{ left: 0, top: 0, width: 98.64, height: 133.2, opacity: 0.96, transform: 'scaleY(-1)' }}
        />
      </div>

      <img
        alt=""
        className="auth-visual-slide__layer"
        src={mallIphone}
        style={{ left: 440.512, top: 573.96, width: 128.16, height: 155.52 }}
      />
      <div
        className="auth-visual-slide__layer auth-visual-slide__overflow-hidden"
        style={{ left: 440.512, top: 715.08, width: 128.16, height: 155.52 }}
      >
        <img
          alt=""
          className="auth-visual-slide__layer"
          src={mallIphone}
          style={{ left: 0, top: 0, width: 128.16, height: 155.52, opacity: 0.92, transform: 'scaleY(-1)' }}
        />
      </div>

      <img
        alt=""
        className="auth-visual-slide__layer"
        src={mallWatch}
        style={{ left: 510.352, top: 543.72, width: 74.16, height: 72 }}
      />
      <div
        className="auth-visual-slide__layer"
        style={{
          left: 185.632,
          top: 608.52,
          width: 169.2,
          height: 169.2,
          transform: 'rotate(-90deg)',
          boxShadow: '1.44px 0.72px 1.44px rgba(0, 0, 0, 0.1)',
        }}
      >
        <img alt="" className="auth-visual-slide__fill" src={mallVitamin} />
      </div>

      <img
        alt=""
        className="auth-visual-slide__layer"
        src={mallPurpleBottle}
        style={{ left: 305.152, top: 591.24, width: 77.04, height: 133.92 }}
      />
      <div
        className="auth-visual-slide__layer auth-visual-slide__overflow-hidden"
        style={{ left: 305.152, top: 717.96, width: 77.04, height: 133.92 }}
      >
        <img
          alt=""
          className="auth-visual-slide__layer"
          src={mallPurpleBottle}
          style={{ left: 0, top: 0, width: 77.04, height: 133.92, opacity: 0.9, transform: 'scaleY(-1)' }}
        />
      </div>
    </>
  )
}

function AppArt() {
  return (
    <div
      className="auth-visual-slide__layer"
      style={{ left: 92.4, top: 421, width: 595.2, height: 528 }}
    >
      <div
        className="auth-visual-slide__layer"
        style={{ left: 48, top: 0, width: 242.143, height: 485.619 }}
      >
        <div
          className="auth-visual-slide__layer"
          style={{
            left: 35.892,
            top: 31.089,
            width: 206.251,
            height: 454.53,
            borderRadius: 25.6,
            background: '#24262b',
            filter: 'blur(16px)',
            opacity: 0.4,
          }}
        />
        <img
          alt=""
          className="auth-visual-slide__layer"
          src={appCardLeft}
          style={{ left: 12.8, top: 9.6, width: 211.2, height: 457.6, borderRadius: 23 }}
        />
        <img
          alt=""
          className="auth-visual-slide__layer"
          src={appShine}
          style={{ left: 0, top: 0, width: 236.235, height: 478.336 }}
        />
      </div>

      <div
        className="auth-visual-slide__layer"
        style={{ left: 302.658, top: 38.915, width: 236.235, height: 478.336 }}
      >
        <div
          className="auth-visual-slide__layer"
          style={{
            left: 27.892,
            top: 15.089,
            width: 206.251,
            height: 454.53,
            borderRadius: 25.6,
            background: '#0f1723',
            filter: 'blur(16px)',
            opacity: 0.2,
          }}
        />
        <img
          alt=""
          className="auth-visual-slide__layer"
          src={appCardRight}
          style={{ left: 13.342, top: 10.685, width: 210.733, height: 456.307, borderRadius: 32 }}
        />
        <img
          alt=""
          className="auth-visual-slide__layer"
          src={appLoginScreen}
          style={{ left: 12.542, top: 10.685, width: 211.2, height: 457.6, borderRadius: 17 }}
        />
        <img
          alt=""
          className="auth-visual-slide__layer"
          src={appShine}
          style={{ left: 0, top: 0, width: 236.235, height: 478.336 }}
        />
      </div>
    </div>
  )
}

function renderSlideArt(slideKey: SlideConfig['key']) {
  switch (slideKey) {
    case 'trend':
      return <LoginArt />
    case 'awards':
      return <AwardsArt />
    case 'research':
      return <ResearchArt />
    case 'mall':
      return <MallArt />
    case 'app':
      return <AppArt />
    default:
      return null
  }
}

export function AuthVisualCarousel({
  initialSlideIndex,
}: AuthVisualCarouselProps) {
  const { t } = useLocale()
  const [activeIndex, setActiveIndex] = useState(initialSlideIndex)

  useEffect(() => {
    setActiveIndex(initialSlideIndex)
  }, [initialSlideIndex])

  const activeSlide = useMemo(() => SLIDES[activeIndex] ?? SLIDES[0], [activeIndex])

  return (
    <div className="auth-visual-carousel">
      <div
        className="auth-visual-carousel__track"
        style={{ transform: `translateX(-${activeIndex * 780}px)` }}
      >
        {SLIDES.map((slide) => (
          <section className="auth-visual-slide" key={slide.key}>
            <div className="auth-visual-slide__copy" style={{ width: slide.copyWidth }}>
              <img alt="" className="auth-visual-slide__logo" src={authLogo} />

              <div className="auth-visual-slide__copy-body">
                <h2 style={{ width: slide.titleWidth }}>{t(slide.titleKey)}</h2>
                {slide.key === 'mall' ? (
                  <p className="auth-visual-slide__subtitle auth-visual-slide__subtitle--with-accent">
                    <span>{t('auth.visual.mall.accent')}</span>
                    <img alt="" src={mallArrow} />
                    <span>{t(slide.descriptionKey)}</span>
                  </p>
                ) : (
                  <p className="auth-visual-slide__subtitle">{t(slide.descriptionKey)}</p>
                )}
              </div>
            </div>

            {renderSlideArt(slide.key)}
          </section>
        ))}
      </div>

      <div className="auth-visual-carousel__dots" role="tablist">
        {SLIDES.map((slide, index) => (
          <button
            aria-label={t(slide.titleKey)}
            className={clsx(
              'auth-visual-carousel__dot',
              index === activeIndex && 'is-active',
            )}
            key={slide.key}
            onClick={() => setActiveIndex(index)}
            role="tab"
            type="button"
          />
        ))}
      </div>

      <span className="auth-visual-carousel__sr-only" aria-live="polite">
        {t(activeSlide.titleKey)}
      </span>
    </div>
  )
}
