import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

import languageChevron from '../assets/figma/icons/language-chevron.svg'
import languageGlobe from '../assets/figma/icons/language-globe.svg'
import { AuthVisualCarousel } from '../components/layout/AuthVisualCarousel'
import { AUTH_SCENES } from '../data/auth-scenes'
import { useLocale } from '../lib/locale'
import type { AuthSceneVariant } from '../types/app'
import type { AppLocale } from '../types/app'

interface AuthLayoutProps {
  scene: AuthSceneVariant
  pageTitle: string
  pageDescription?: string
  children: ReactNode
}

export function AuthLayout({
  scene,
  pageTitle,
  pageDescription,
  children,
}: AuthLayoutProps) {
  const { locale, setLocale, t } = useLocale()
  const [isLocaleOpen, setIsLocaleOpen] = useState(false)
  const localeRef = useRef<HTMLDivElement | null>(null)
  const sceneConfig = AUTH_SCENES[scene]

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!localeRef.current?.contains(event.target as Node)) {
        setIsLocaleOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [])

  return (
    <div className="auth-layout">
      <div className="auth-layout__frame">
        <section className="auth-layout__visual">
          <AuthVisualCarousel initialSlideIndex={sceneConfig.initialSlideIndex} />
        </section>

        <section className="auth-layout__panel">
          <div className="auth-layout__locale-wrap" ref={localeRef}>
            <button
              aria-expanded={isLocaleOpen}
              className={clsx('auth-layout__locale', isLocaleOpen && 'is-open')}
              onClick={() => setIsLocaleOpen((open) => !open)}
              type="button"
            >
              <span className="auth-layout__locale-main">
                <img alt="" className="auth-layout__locale-icon" src={languageGlobe} />
                <span>{t(`common.locale.${locale}`)}</span>
              </span>
              <img
                alt=""
                className="auth-layout__locale-chevron"
                src={languageChevron}
              />
            </button>

            {isLocaleOpen ? (
              <div className="auth-layout__locale-menu">
                {(['zh_CN', 'en_US'] as AppLocale[]).map((option) => (
                  <button
                    className={clsx(
                      'auth-layout__locale-option',
                      option === locale && 'is-active',
                    )}
                    key={option}
                    onClick={() => {
                      setLocale(option)
                      setIsLocaleOpen(false)
                    }}
                    type="button"
                  >
                    {t(`common.locale.${option}`)}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div
            className={clsx(
              'auth-layout__panel-inner',
              `auth-layout__panel-inner--${scene}`,
            )}
            style={{ paddingTop: sceneConfig.panelTopOffset }}
          >
            <header className="auth-layout__panel-header">
              <h1>{pageTitle}</h1>
              {pageDescription ? <p>{pageDescription}</p> : null}
            </header>
            {children}
          </div>
        </section>
      </div>

      <p className="auth-layout__risk">{t('auth.riskWarning')}</p>
    </div>
  )
}
