import type { ReactNode } from 'react'
import {
  DownOutlined,
  GlobalOutlined,
} from '@ant-design/icons'

import { AUTH_SCENES, RISK_WARNING } from '../data/auth-scenes'
import type { AuthSceneVariant } from '../types/app'
import { BrandMark } from '../components/ui/BrandMark'
import {
  LoginIllustration,
  MallShowcase,
  RegisterIllustration,
} from '../components/layout/Illustrations'

interface AuthLayoutProps {
  scene: AuthSceneVariant
  pageTitle: string
  pageDescription?: string
  children: ReactNode
}

function SceneVisual({ scene }: { scene: AuthSceneVariant }) {
  if (scene === 'login') {
    return <LoginIllustration />
  }

  if (scene === 'register') {
    return <RegisterIllustration />
  }

  return <MallShowcase />
}

export function AuthLayout({
  scene,
  pageTitle,
  pageDescription,
  children,
}: AuthLayoutProps) {
  const visual = AUTH_SCENES[scene]

  return (
    <div className="auth-layout">
      <div className="auth-layout__frame">
        <section className={`auth-layout__visual auth-layout__visual--${scene}`}>
          <BrandMark className="auth-layout__brand" variant="light" />
          <header className="auth-layout__visual-copy">
            <h2>{visual.title}</h2>
            <p>
              {visual.highlight ? <span>{visual.highlight}</span> : null}
              {visual.highlight ? ' ' : null}
              {visual.subtitle}
            </p>
          </header>
          <div className="auth-layout__visual-art">
            <SceneVisual scene={scene} />
          </div>
          <div className="auth-layout__dots" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                className={index === visual.dotIndex ? 'is-active' : undefined}
                key={`${scene}-${index}`}
              />
            ))}
          </div>
        </section>

        <section className="auth-layout__panel">
          <button className="auth-layout__locale" type="button">
            <GlobalOutlined />
            <span>中文</span>
            <DownOutlined />
          </button>

          <div className="auth-layout__panel-inner">
            <header className="auth-layout__panel-header">
              <h1>{pageTitle}</h1>
              {pageDescription ? <p>{pageDescription}</p> : null}
            </header>
            {children}
          </div>
        </section>
      </div>

      <p className="auth-layout__risk">{RISK_WARNING}</p>
    </div>
  )
}
