import type { AuthSceneVariant } from '../types/app'

interface AuthSceneConfig {
  title: string
  subtitle: string
  highlight?: string
  description?: string
  dotIndex: number
}

export const AUTH_SCENES: Record<AuthSceneVariant, AuthSceneConfig> = {
  login: {
    title: '超越趋势，引领博弈',
    subtitle: '老牌差价合约经纪商，全球百万投资人的交易之选',
    dotIndex: 0,
  },
  register: {
    title: '屡获大奖',
    subtitle: '成立18年，专业实力见证市场口碑',
    dotIndex: 1,
  },
  forgotPassword: {
    title: 'ACCM积分商城',
    highlight: '积分',
    subtitle: '您的全球消费金，澳洲直邮商品触手可及',
    dotIndex: 3,
  },
}

export const RISK_WARNING =
  'High Risk Investment Warning: CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. The vast majority of retail investor accounts lose money when trading CFDs. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money. However, it is emphasized that as soon as the Company completes its 12 months of operations, then it shall proceed with the calculation of the percentage of its retail clients’ accounts that lost money when trading CFDs.'
