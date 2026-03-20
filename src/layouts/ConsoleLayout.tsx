import type { ReactNode } from 'react'
import {
  AppstoreOutlined,
  BellOutlined,
  DownOutlined,
  FireOutlined,
  FundProjectionScreenOutlined,
  GiftOutlined,
  GlobalOutlined,
  HomeFilled,
  LineChartOutlined,
  PieChartOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons'
import clsx from 'clsx'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import { APP_ROUTES } from '../app/routes'
import { SIDEBAR_SECTIONS } from '../data/navigation'
import { useSessionStore } from '../lib/session-store'
import type { MenuIconKey, SidebarMenuItem } from '../types/app'
import { BrandMark } from '../components/ui/BrandMark'

interface ConsoleLayoutProps {
  children: ReactNode
  sidePanel?: ReactNode
  pageClassName?: string
}

function getMenuIcon(icon: MenuIconKey) {
  switch (icon) {
    case 'home':
      return <HomeFilled />
    case 'accounts':
      return <WalletOutlined />
    case 'funds':
      return <SafetyCertificateOutlined />
    case 'trading':
      return <FundProjectionScreenOutlined />
    case 'analytics':
      return <LineChartOutlined />
    case 'community':
      return <TeamOutlined />
    case 'campaigns':
      return <FireOutlined />
    case 'mall':
      return <GiftOutlined />
    case 'products':
      return <AppstoreOutlined />
    case 'agents':
      return <PieChartOutlined />
  }
}

function SidebarItem({
  item,
  pathname,
}: {
  item: SidebarMenuItem
  pathname: string
}) {
  const isActive = item.path ? pathname.startsWith(item.path) : false

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
        <span className="console-sidebar__icon">{getMenuIcon(item.icon)}</span>
        <span>{item.label}</span>
      </NavLink>
    )
  }

  return (
    <div className="console-sidebar__group">
      <button className={clsx('console-sidebar__item', item.isMuted && 'is-muted')} type="button">
        <span className="console-sidebar__icon">{getMenuIcon(item.icon)}</span>
        <span>{item.label}</span>
        {item.children?.length ? <DownOutlined className="console-sidebar__arrow" /> : null}
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

  return (
    <div className="console-shell">
      <aside className="console-sidebar">
        <div className="console-sidebar__brand">
          <BrandMark variant="light" />
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
            <button className="console-topbar__chip" type="button">
              <GlobalOutlined />
              <DownOutlined />
            </button>
            <button className="console-topbar__profile" type="button">
              <UserOutlined />
              <span>georgia.young</span>
              <DownOutlined />
            </button>
            <button
              className="console-topbar__chip"
              onClick={() => {
                logout()
                navigate(APP_ROUTES.login)
              }}
              type="button"
            >
              <BellOutlined />
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
          <span className="console-support__avatar">G</span>
          <span className="console-support__label">客户经理</span>
          <span className="console-support__badge">1</span>
        </button>
        <div className="console-support__help">
          <span>专业客服帮你解答问题</span>
        </div>
        <button className="console-support__service" type="button">
          <TeamOutlined />
        </button>
      </div>
    </div>
  )
}
