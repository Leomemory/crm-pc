export type HomeScenarioKey = 'unverified' | 'verified' | 'trading'
export type HomeNoticeTab = 'system' | 'applications'
export type HomeStepStatus = 'complete' | 'pending' | 'action'
export type HomeResearchTone = 'dark' | 'light' | 'soft'

export interface HomeQuickEntryItem {
  key:
    | 'deposit'
    | 'community'
    | 'calendar'
    | 'download'
    | 'hours'
    | 'holiday'
    | 'guide'
    | 'help'
  label: string
}

export interface HomeNoticeItem {
  id: string
  tag: string
  title: string
  date: string
}

export interface HomeApplicationItem {
  id: string
  title: string
  status: string
  account: string
  amount: string
  date: string
  tone: 'pending' | 'rejected' | 'approved'
}

export interface HomeResearchCardItem {
  id: string
  title: string
  tone: HomeResearchTone
}

export interface HomeStepItem {
  key: 'identity' | 'apply' | 'deposit' | 'trade'
  order: '01' | '02' | '03' | '04'
  title: string
  description: string
  status: HomeStepStatus
  actionLabel?: string
}

export interface HomeAccountItem {
  id: string
  platform: string
  type: string
  currency: string
  mode: 'Live' | 'Demo'
  server: string
  balance: string
  equity: string
  leverage: string
  pinned?: boolean
}

export interface HomeScenario {
  key: HomeScenarioKey
  balance: string
  equity: string
  steps: HomeStepItem[]
  accounts: HomeAccountItem[]
  showApplyAccount: boolean
  showAllAccounts: boolean
  noticeTab: HomeNoticeTab
}

export const HOME_QUICK_ENTRIES: HomeQuickEntryItem[] = [
  { key: 'deposit', label: '入金' },
  { key: 'community', label: '跟单社区' },
  { key: 'calendar', label: '财经日历' },
  { key: 'download', label: '下载专区' },
  { key: 'hours', label: '产品交易时间' },
  { key: 'holiday', label: '假期时间表' },
  { key: 'guide', label: '用户指南' },
  { key: 'help', label: '帮助中心' },
]

export const HOME_SYSTEM_NOTICES: HomeNoticeItem[] = [
  { id: 'notice-1', tag: '活动', title: '这里是活动消息这里是活动消息这里是活动消息', date: '2025.7.1' },
  { id: 'notice-2', tag: '消息', title: '经济日报：财政政策要精准提升效能', date: '2025.6.30' },
  { id: 'notice-3', tag: '通知', title: '交易时间通知', date: '2025.6.26' },
  { id: 'notice-4', tag: '通知', title: '经济日报：财政政策要精准提升效能', date: '2025.6.26' },
  { id: 'notice-5', tag: '通知', title: '经济日报：财政政策要精准提升效能', date: '2025.6.26' },
]

export const HOME_APPLICATIONS: HomeApplicationItem[] = [
  {
    id: 'application-1',
    title: '出金申请',
    status: '待审核',
    account: '738272',
    amount: '-$23,303.09',
    date: '2025.7.1',
    tone: 'pending',
  },
  {
    id: 'application-2',
    title: '出金申请',
    status: '已拒绝',
    account: '738272',
    amount: '-$23,303.09',
    date: '2025.7.1',
    tone: 'rejected',
  },
  {
    id: 'application-3',
    title: '出金申请',
    status: '已通过',
    account: '738272',
    amount: '-$23,303.09',
    date: '2025.7.1',
    tone: 'approved',
  },
]

export const HOME_RESEARCH_CARDS: HomeResearchCardItem[] = [
  { id: 'live', title: '直播间', tone: 'dark' },
  { id: 'daily', title: '每日汇评', tone: 'light' },
  { id: 'dialogue', title: '高端对话', tone: 'soft' },
  { id: 'knowledge', title: '知识库', tone: 'dark' },
]

const VERIFIED_ACCOUNT: HomeAccountItem = {
  id: '7283782',
  platform: 'MT4',
  type: 'ECN',
  currency: 'USD',
  mode: 'Live',
  server: 'ACCM Markets-Live1',
  balance: '$4,162.99',
  equity: '$1,629.09',
  leverage: '1:500',
  pinned: true,
}

const TRADING_ACCOUNT: HomeAccountItem = {
  id: '7283782',
  platform: 'MT4',
  type: 'ECN',
  currency: 'USD',
  mode: 'Live',
  server: 'ACCM Markets-Live1',
  balance: '$4,162.99',
  equity: '$1,629.09',
  leverage: '1:500',
}

export const HOME_SCENARIOS: Record<HomeScenarioKey, HomeScenario> = {
  unverified: {
    key: 'unverified',
    balance: '$0.00',
    equity: '$0.00',
    showApplyAccount: false,
    showAllAccounts: false,
    noticeTab: 'system',
    accounts: [],
    steps: [
      {
        key: 'identity',
        order: '01',
        title: '身份认证',
        description: '完善身份信息、签署合规协议',
        status: 'action',
        actionLabel: '前往认证',
      },
      {
        key: 'apply',
        order: '02',
        title: '申请账户',
        description: '选择账户类型申请交易账号',
        status: 'pending',
      },
      {
        key: 'deposit',
        order: '03',
        title: '入金',
        description: '支持多种渠道和方式入金',
        status: 'pending',
      },
      {
        key: 'trade',
        order: '04',
        title: '交易',
        description: '安装MT，开始交易',
        status: 'pending',
      },
    ],
  },
  verified: {
    key: 'verified',
    balance: '$0.00',
    equity: '$0.00',
    showApplyAccount: true,
    showAllAccounts: false,
    noticeTab: 'system',
    accounts: [VERIFIED_ACCOUNT],
    steps: [
      {
        key: 'identity',
        order: '01',
        title: '身份认证',
        description: '完善身份信息、签署合规协议',
        status: 'complete',
      },
      {
        key: 'apply',
        order: '02',
        title: '申请账户',
        description: '选择账户类型申请交易账号',
        status: 'complete',
      },
      {
        key: 'deposit',
        order: '03',
        title: '入金',
        description: '支持多种渠道和方式入金',
        status: 'action',
        actionLabel: '入金',
      },
      {
        key: 'trade',
        order: '04',
        title: '交易',
        description: '安装MT，开始交易',
        status: 'pending',
      },
    ],
  },
  trading: {
    key: 'trading',
    balance: '$823,430.93',
    equity: '$3,888.69',
    showApplyAccount: true,
    showAllAccounts: true,
    noticeTab: 'applications',
    accounts: [
      { ...TRADING_ACCOUNT, pinned: true },
      { ...TRADING_ACCOUNT, id: '7283783' },
    ],
    steps: [
      {
        key: 'identity',
        order: '01',
        title: '身份认证',
        description: '完善身份信息、签署合规协议',
        status: 'complete',
      },
      {
        key: 'apply',
        order: '02',
        title: '申请账户',
        description: '选择账户类型申请交易账号',
        status: 'complete',
      },
      {
        key: 'deposit',
        order: '03',
        title: '入金',
        description: '支持多种渠道和方式入金',
        status: 'complete',
      },
      {
        key: 'trade',
        order: '04',
        title: '交易',
        description: '安装MT，开始交易',
        status: 'complete',
      },
    ],
  },
}
