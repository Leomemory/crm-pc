export type AuthSceneVariant = 'login' | 'register' | 'forgotPassword'

export type MenuIconKey =
  | 'home'
  | 'accounts'
  | 'funds'
  | 'trading'
  | 'analytics'
  | 'community'
  | 'campaigns'
  | 'mall'
  | 'products'
  | 'agents'

export interface SidebarMenuItem {
  key: string
  label: string
  icon: MenuIconKey
  path?: string
  children?: SidebarMenuItem[]
  isMuted?: boolean
}

export interface SidebarSection {
  key: string
  items: SidebarMenuItem[]
}

export type QuickEntryIconKey =
  | 'deposit'
  | 'community'
  | 'calendar'
  | 'download'
  | 'hours'
  | 'holiday'
  | 'guide'
  | 'help'

export interface QuickEntryItem {
  key: string
  label: string
  icon: QuickEntryIconKey
}

export interface NoticeItem {
  id: string
  category: string
  title: string
  date: string
}

export interface ResearchCardItem {
  id: string
  tag: string
  title: string
  accent: string
}

export type OnboardingStepStatus = 'complete' | 'pending' | 'action'

export interface OnboardingStepItem {
  key: string
  order: string
  title: string
  description: string
  status: OnboardingStepStatus
  actionLabel?: string
}

export interface AccountCardItem {
  id: string
  platform: string
  type: string
  currency: string
  mode: 'Live' | 'Demo'
  server: string
  balance: string
  equity: string
  leverage: string
}
