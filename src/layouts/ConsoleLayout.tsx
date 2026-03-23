import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import { APP_ROUTES } from '../app/routes'
import topbarChevronIcon from '../assets/figma/icons/language-chevron.svg'
import avatarImage from '../assets/figma/home/shell/avatar.svg'
import languageIcon from '../assets/figma/home/shell/language.svg'
import logoutIcon from '../assets/figma/home/shell/logout.svg'
import logoImage from '../assets/figma/home/shell/logo.svg'
import menuAccountsIcon from '../assets/figma/home/shell/menu-accounts.svg'
import menuAgentsIcon from '../assets/figma/home/shell/menu-agents.svg'
import menuAnalyticsIcon from '../assets/figma/home/shell/menu-analytics.svg'
import menuCampaignsIcon from '../assets/figma/home/shell/menu-campaigns.svg'
import menuChevronIcon from '../assets/figma/home/shell/menu-chevron.svg'
import menuCommunityIcon from '../assets/figma/home/shell/menu-community.svg'
import menuFundsIcon from '../assets/figma/home/shell/menu-funds.svg'
import menuHomeIcon from '../assets/figma/home/shell/menu-home.svg'
import menuMallIcon from '../assets/figma/home/shell/menu-mall.svg'
import menuProductsIcon from '../assets/figma/home/shell/menu-products.svg'
import menuTradingIcon from '../assets/figma/home/shell/menu-trading.svg'
import managerImage from '../assets/figma/home/support/manager.png'
import serviceIcon from '../assets/figma/home/support/service.svg'
import { SIDEBAR_SECTIONS } from '../data/navigation'
import { useLocale } from '../lib/locale'
import { useSessionStore } from '../lib/session-store'
import type { AppLocale, MenuIconKey, SidebarMenuItem } from '../types/app'

interface ConsoleLayoutProps {
  children: ReactNode
  sidePanel?: ReactNode
  pageClassName?: string
}

const MENU_ICON_MAP: Record<MenuIconKey, string> = {
  home: menuHomeIcon,
  accounts: menuAccountsIcon,
  funds: menuFundsIcon,
  trading: menuTradingIcon,
  analytics: menuAnalyticsIcon,
  community: menuCommunityIcon,
  campaigns: menuCampaignsIcon,
  mall: menuMallIcon,
  products: menuProductsIcon,
  agents: menuAgentsIcon,
}

function SidebarItem({
  item,
  pathname,
}: {
  item: SidebarMenuItem
  pathname: string
}) {
  const isActive = item.path ? pathname.startsWith(item.path) : item.key === 'analytics'
  const showsChevron = !item.path || item.key === 'accounts'

  if (item.path) {
    return (
      <NavLink
        className={({ isActive: isNavActive }) =>
          clsx(
            'console-sidebar__item',
            (isNavActive || isActive) && 'is-active',
            item.isMuted && 'is-muted',
          )
        }
        to={item.path}
      >
        <img alt="" className="console-sidebar__icon" src={MENU_ICON_MAP[item.icon]} />
        <span>{item.label}</span>
        {showsChevron ? (
          <img alt="" className="console-sidebar__arrow" src={menuChevronIcon} />
        ) : null}
      </NavLink>
    )
  }

  return (
    <div className="console-sidebar__group">
      <button className={clsx('console-sidebar__item', item.isMuted && 'is-muted')} type="button">
        <img alt="" className="console-sidebar__icon" src={MENU_ICON_MAP[item.icon]} />
        <span>{item.label}</span>
        <img alt="" className="console-sidebar__arrow" src={menuChevronIcon} />
      </button>
      {item.children?.length ? (
        <div className="console-sidebar__children">
          {item.children.map((child) => (
            <span className="console-sidebar__child" key={child.key}>
              {child.label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function ConsoleLayout({
  children,
  sidePanel,
  pageClassName,
}: ConsoleLayoutProps) {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const logout = useSessionStore((state) => state.logout)
  const { locale, setLocale } = useLocale()
  const [isLocaleOpen, setIsLocaleOpen] = useState(false)
  const localeRef = useRef<HTMLDivElement | null>(null)

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
    <div className="console-shell">
      <aside className="console-sidebar">
        <div className="console-sidebar__brand">
          <img alt="ACCM" src={logoImage} />
        </div>
        <div className="console-sidebar__sections">
          {SIDEBAR_SECTIONS.map((section) => (
            <div className="console-sidebar__section" key={section.key}>
              {section.items.map((item) => (
                <SidebarItem item={item} key={item.key} pathname={pathname} />
              ))}
            </div>
          ))}
        </div>
        <button className="console-sidebar__legal" type="button">
          法律文件
        </button>
      </aside>

      <div className="console-shell__content">
        <header className="console-topbar">
          <div className="console-topbar__spacer" />
          <div className="console-topbar__actions">
            <div className="console-topbar__locale-wrap" ref={localeRef}>
              <button
                className="console-topbar__chip"
                onClick={() => setIsLocaleOpen((open) => !open)}
                type="button"
              >
                <img alt="" className="console-topbar__chip-icon" src={languageIcon} />
                <img alt="" className="console-topbar__chip-chevron" src={topbarChevronIcon} />
              </button>
              {isLocaleOpen ? (
                <div className="console-topbar__locale-menu">
                  {(['zh_CN', 'en_US'] as AppLocale[]).map((option) => (
                    <button
                      className={clsx(
                        'console-topbar__locale-option',
                        option === locale && 'is-active',
                      )}
                      key={option}
                      onClick={() => {
                        setLocale(option)
                        setIsLocaleOpen(false)
                      }}
                      type="button"
                    >
                      {option === 'zh_CN' ? '中文' : 'English'}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <button className="console-topbar__profile" type="button">
              <img alt="" className="console-topbar__avatar" src={avatarImage} />
              <span>georgia.young</span>
              <img alt="" className="console-topbar__chip-chevron" src={topbarChevronIcon} />
            </button>

            <button
              className="console-topbar__chip"
              onClick={() => {
                logout()
                navigate(APP_ROUTES.login)
              }}
              type="button"
            >
              <img alt="" className="console-topbar__chip-icon" src={logoutIcon} />
            </button>
          </div>
        </header>

        <div
          className={clsx(
            'console-shell__body',
            sidePanel && 'has-side-panel',
            pageClassName,
          )}
        >
          <main className="console-shell__main">{children}</main>
          {sidePanel ? <aside className="console-shell__side">{sidePanel}</aside> : null}
        </div>
      </div>

      <div className="console-support">
        <button className="console-support__manager" type="button">
          <span className="console-support__manager-avatar">
            <img alt="" src={managerImage} />
          </span>
          <span className="console-support__label">客户经理</span>
          <span className="console-support__badge">1</span>
        </button>
        <div className="console-support__help">
          <span>专业客服帮你解答问题</span>
        </div>
        <button className="console-support__service" type="button">
          <img alt="" src={serviceIcon} />
        </button>
      </div>
    </div>
  )
}
