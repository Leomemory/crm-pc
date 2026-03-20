import {
  ArrowRightOutlined,
  BookOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'

import { AccountCard } from '../../components/layout/AccountCard'
import { MallShowcase } from '../../components/layout/Illustrations'
import { OnboardingSteps } from '../../components/layout/OnboardingSteps'
import { AppButton } from '../../components/ui/AppButton'
import { ConsoleLayout } from '../../layouts/ConsoleLayout'
import {
  ACCOUNT_CARDS,
  DASHBOARD_STEPS,
  NOTICES,
  QUICK_ENTRIES,
  RESEARCH_CARDS,
} from '../../data/dashboard'
import type { QuickEntryIconKey } from '../../types/app'

function getEntryIcon(icon: QuickEntryIconKey) {
  switch (icon) {
    case 'deposit':
      return <RocketOutlined />
    case 'community':
      return <UsergroupAddOutlined />
    case 'calendar':
      return <CalendarOutlined />
    case 'download':
      return <DownloadOutlined />
    case 'hours':
      return <ClockCircleOutlined />
    case 'holiday':
      return <CalendarOutlined />
    case 'guide':
      return <BookOutlined />
    case 'help':
      return <QuestionCircleOutlined />
  }
}

function DashboardSidePanel() {
  return (
    <div className="dashboard-side">
      <section className="dashboard-side__points">
        <div className="dashboard-side__points-glow" />
        <p className="dashboard-side__eyebrow">我的积分</p>
        <strong>9,834</strong>
        <p className="dashboard-side__accent">水晶会员</p>
        <p className="dashboard-side__hint">还需166成长值升级，下月可达钻石等级</p>
        <div className="dashboard-side__progress">
          <span />
        </div>
      </section>

      <section className="dashboard-side__notices">
        <div className="dashboard-side__tabs">
          <span className="is-active">系统公告</span>
          <span>我的申请</span>
        </div>
        <div className="dashboard-side__notice-list">
          {NOTICES.map((notice) => (
            <article className="dashboard-side__notice" key={notice.id}>
              <span className="dashboard-side__notice-tag">{notice.category}</span>
              <p>{notice.title}</p>
              <time>{notice.date}</time>
            </article>
          ))}
        </div>
        <button className="dashboard-side__link" type="button">
          查看更多
          <ArrowRightOutlined />
        </button>
      </section>

      <section className="dashboard-side__research">
        <header className="dashboard-side__section-title">投研中心</header>
        <div className="dashboard-side__research-grid">
          {RESEARCH_CARDS.map((card) => (
            <article
              className="dashboard-side__research-card"
              key={card.id}
              style={{ background: card.accent }}
            >
              <span>{card.tag}</span>
              <strong>{card.title}</strong>
              <button type="button">
                <ArrowRightOutlined />
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export function DashboardPage() {
  return (
    <ConsoleLayout sidePanel={<DashboardSidePanel />}>
      <div className="dashboard-page">
        <header className="dashboard-page__hero">
          <h1>欢迎来到 ACCM</h1>
          <div className="dashboard-page__banner">
            <div className="dashboard-page__banner-copy">
              <h2>积分商城 · 用积分添彩生活</h2>
              <p>
                <span>积分</span> 您的全球消费金，澳洲直邮商品触手可及
              </p>
            </div>
            <MallShowcase compact />
          </div>
        </header>

        <section className="dashboard-page__overview">
          <article className="dashboard-card dashboard-card--asset">
            <h3>总资产</h3>
            <div className="dashboard-card__asset-grid">
              <div>
                <span>余额</span>
                <strong>$0.00</strong>
              </div>
              <div>
                <span>净值</span>
                <strong>$0.00</strong>
              </div>
            </div>
            <div className="dashboard-card__actions">
              <AppButton type="button" variant="primary">
                账户入金
              </AppButton>
              <AppButton type="button" variant="ghost">
                出金提现
              </AppButton>
              <AppButton type="button" variant="ghost">
                资金划转
              </AppButton>
            </div>
          </article>

          <article className="dashboard-card dashboard-card--quick">
            <div className="dashboard-card__quick-grid">
              {QUICK_ENTRIES.map((entry) => (
                <button className="dashboard-card__quick-item" key={entry.key} type="button">
                  <span className="dashboard-card__quick-icon">
                    {getEntryIcon(entry.icon)}
                  </span>
                  <span>{entry.label}</span>
                </button>
              ))}
            </div>
          </article>
        </section>

        <section className="dashboard-card dashboard-card--accounts">
          <div className="dashboard-card__section-head">
            <h3>我的账户</h3>
            <button className="dashboard-card__section-link" type="button">
              + 申请账户
            </button>
          </div>
          <OnboardingSteps steps={DASHBOARD_STEPS} />
          <div className="dashboard-card__account-list">
            <AccountCard account={ACCOUNT_CARDS[0]} />
          </div>
        </section>
      </div>
    </ConsoleLayout>
  )
}
