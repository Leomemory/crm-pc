import type { SidebarSection } from '../types/app'
import { APP_ROUTES } from '../app/routes'

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    key: 'main',
    items: [
      { key: 'dashboard', label: '首页', icon: 'home', path: APP_ROUTES.dashboard },
      {
        key: 'accounts',
        label: '账户管理',
        icon: 'accounts',
        path: APP_ROUTES.accounts,
      },
      { key: 'funds', label: '资金管理', icon: 'funds' },
      { key: 'trading', label: '交易管理', icon: 'trading' },
      {
        key: 'analytics',
        label: '技术指标',
        icon: 'analytics',
        children: [
          {
            key: 'apply-account',
            label: '申请账户',
            icon: 'analytics',
          },
        ],
      },
      { key: 'community', label: '跟单社区', icon: 'community' },
      { key: 'campaigns', label: '热门活动', icon: 'campaigns', isMuted: true },
      { key: 'mall', label: '积分商城', icon: 'mall' },
      { key: 'products', label: '产品信息', icon: 'products' },
    ],
  },
  {
    key: 'agent',
    items: [{ key: 'agents', label: '代理专区', icon: 'agents' }],
  },
]
