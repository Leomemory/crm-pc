import type {
  AccountCardItem,
  NoticeItem,
  OnboardingStepItem,
  QuickEntryItem,
  ResearchCardItem,
} from '../types/app'

export const QUICK_ENTRIES: QuickEntryItem[] = [
  { key: 'deposit', label: '入金', icon: 'deposit' },
  { key: 'community', label: '跟单社区', icon: 'community' },
  { key: 'calendar', label: '财经日历', icon: 'calendar' },
  { key: 'download', label: '下载专区', icon: 'download' },
  { key: 'hours', label: '产品交易时间', icon: 'hours' },
  { key: 'holiday', label: '假期时间表', icon: 'holiday' },
  { key: 'guide', label: '用户指南', icon: 'guide' },
  { key: 'help', label: '帮助中心', icon: 'help' },
]

export const NOTICES: NoticeItem[] = [
  {
    id: 'notice-1',
    category: '活动',
    title: '这里是活动消息这里是活动消息这里是活动消息',
    date: '2025.7.1',
  },
  {
    id: 'notice-2',
    category: '通知',
    title: '经济日报：财政政策要精准提升效能',
    date: '2025.6.30',
  },
  {
    id: 'notice-3',
    category: '通知',
    title: '交易时间通知',
    date: '2025.6.26',
  },
  {
    id: 'notice-4',
    category: '通知',
    title: '经济日报：财政政策要精准提升效能',
    date: '2025.6.26',
  },
  {
    id: 'notice-5',
    category: '通知',
    title: '经济日报：财政政策要精准提升效能',
    date: '2025.6.26',
  },
]

export const RESEARCH_CARDS: ResearchCardItem[] = [
  {
    id: 'research-live',
    tag: '直播间',
    title: '实时行情追踪与研判',
    accent: 'linear-gradient(135deg, #4d5478 0%, #2a2e42 100%)',
  },
  {
    id: 'research-daily',
    tag: '每日汇评',
    title: '跟上每日宏观和盘面节奏',
    accent: 'linear-gradient(135deg, #5e6480 0%, #2f364d 100%)',
  },
  {
    id: 'research-deep',
    tag: '高端对话',
    title: '交易策略与模型复盘',
    accent: 'linear-gradient(135deg, #545a7f 0%, #32384d 100%)',
  },
]

export const DASHBOARD_STEPS: OnboardingStepItem[] = [
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
]

export const ACCOUNT_CARDS: AccountCardItem[] = [
  {
    id: '7283782',
    platform: 'MT4',
    type: 'ECN',
    currency: 'USD',
    mode: 'Live',
    server: 'ACCM Markets-Live1',
    balance: '$4,162.99',
    equity: '$1,629.09',
    leverage: '1:500',
  },
  {
    id: '8392044',
    platform: 'MT5',
    type: 'Standard',
    currency: 'USD',
    mode: 'Live',
    server: 'ACCM Markets-Live2',
    balance: '$7,802.14',
    equity: '$7,991.72',
    leverage: '1:200',
  },
  {
    id: '5281601',
    platform: 'MT4',
    type: 'Demo',
    currency: 'USD',
    mode: 'Demo',
    server: 'ACCM Demo-Server',
    balance: '$25,000.00',
    equity: '$24,608.90',
    leverage: '1:100',
  },
]

export const ACCOUNT_PAGE_STEPS: OnboardingStepItem[] = [
  {
    key: 'identity',
    order: '01',
    title: '身份认证',
    description: '已完成KYC与协议签署',
    status: 'complete',
  },
  {
    key: 'account-open',
    order: '02',
    title: '账户开通',
    description: '当前有2个真实账户可交易',
    status: 'complete',
  },
  {
    key: 'funding',
    order: '03',
    title: '资金准备',
    description: '建议优先处理入金与风险偏好',
    status: 'action',
    actionLabel: '继续处理',
  },
  {
    key: 'trade-ready',
    order: '04',
    title: '交易就绪',
    description: '准备完成后即可切换终端',
    status: 'pending',
  },
]
