import {
  ArrowUpOutlined,
  PushpinOutlined,
  SettingOutlined,
} from '@ant-design/icons'

import type { AccountCardItem } from '../../types/app'
import { AppButton } from '../ui/AppButton'

interface AccountCardProps {
  account: AccountCardItem
  compact?: boolean
}

export function AccountCard({ account, compact }: AccountCardProps) {
  return (
    <article className={`account-card${compact ? ' account-card--compact' : ''}`}>
      <div className="account-card__header">
        <div className="account-card__tags">
          <span className="account-card__id">{account.id}</span>
          <span className="account-card__tag">{account.platform}</span>
          <span className="account-card__tag">{account.type}</span>
          <span className="account-card__tag">{account.currency}</span>
          <span className="account-card__tag account-card__tag--success">
            {account.mode}
          </span>
        </div>
        <div className="account-card__server">
          <span>服务器：{account.server}</span>
          <PushpinOutlined />
          <SettingOutlined />
        </div>
      </div>

      <div className="account-card__body">
        <div className="account-card__metric">
          <span className="account-card__metric-label">余额</span>
          <strong>{account.balance}</strong>
        </div>
        <div className="account-card__metric">
          <span className="account-card__metric-label">净值</span>
          <strong>{account.equity}</strong>
        </div>
        <div className="account-card__metric">
          <span className="account-card__metric-label">杠杆</span>
          <strong>{account.leverage}</strong>
        </div>
        <div className="account-card__actions">
          <AppButton type="button" variant="secondary">
            出金
          </AppButton>
          <AppButton
            type="button"
            variant="primary"
            leadingIcon={<ArrowUpOutlined />}
          >
            入金
          </AppButton>
        </div>
      </div>
    </article>
  )
}
