import { ArrowRightOutlined, FileSearchOutlined, PlusOutlined } from '@ant-design/icons'

import { AccountCard } from '../../components/layout/AccountCard'
import { OnboardingSteps } from '../../components/layout/OnboardingSteps'
import { AppButton } from '../../components/ui/AppButton'
import { ConsoleLayout } from '../../layouts/ConsoleLayout'
import {
  ACCOUNT_CARDS,
  ACCOUNT_PAGE_STEPS,
} from '../../data/dashboard'

function AccountsSidePanel() {
  return (
    <div className="accounts-side">
      <section className="accounts-side__card">
        <span className="accounts-side__label">账户助手</span>
        <h3>下一步建议</h3>
        <p>优先完成入金与终端安装，随后即可进入真实交易流程。</p>
        <AppButton trailingIcon={<ArrowRightOutlined />} type="button" variant="pill">
          查看开户流程
        </AppButton>
      </section>

      <section className="accounts-side__card">
        <span className="accounts-side__label">最近活动</span>
        <div className="accounts-side__timeline">
          <article>
            <strong>新真实账户已激活</strong>
            <p>ACCM Markets-Live2</p>
          </article>
          <article>
            <strong>资料审核通过</strong>
            <p>已完成身份认证与协议签署</p>
          </article>
          <article>
            <strong>等待首次入金</strong>
            <p>建议本周内完成风险偏好配置</p>
          </article>
        </div>
      </section>
    </div>
  )
}

export function AccountsPage() {
  return (
    <ConsoleLayout pageClassName="console-shell__body--accounts" sidePanel={<AccountsSidePanel />}>
      <div className="accounts-page">
        <header className="accounts-page__hero">
          <div>
            <p className="accounts-page__eyebrow">账户管理</p>
            <h1>账户总览与开户进度</h1>
            <p className="accounts-page__intro">
              统一查看真实账户、模拟账户与待处理申请，后续业务页面可继续沿用这套模板扩展。
            </p>
          </div>
          <div className="accounts-page__hero-actions">
            <AppButton leadingIcon={<PlusOutlined />} type="button" variant="primary">
              申请账户
            </AppButton>
            <AppButton leadingIcon={<FileSearchOutlined />} type="button" variant="secondary">
              查看申请记录
            </AppButton>
          </div>
        </header>

        <section className="accounts-page__stats">
          <article className="accounts-page__stat-card">
            <span>活跃账户</span>
            <strong>02</strong>
            <p>其中真实账户 2 个，模拟账户 1 个</p>
          </article>
          <article className="accounts-page__stat-card">
            <span>账户总净值</span>
            <strong>$33,229.71</strong>
            <p>较昨日 +2.38%</p>
          </article>
          <article className="accounts-page__stat-card">
            <span>待处理事项</span>
            <strong>03</strong>
            <p>入金、终端下载与风险偏好配置</p>
          </article>
        </section>

        <section className="dashboard-card dashboard-card--accounts">
          <div className="dashboard-card__section-head">
            <h3>开户进度</h3>
            <button className="dashboard-card__section-link" type="button">
              查看全部流程
            </button>
          </div>
          <OnboardingSteps steps={ACCOUNT_PAGE_STEPS} />
        </section>

        <section className="accounts-page__filters">
          <button className="is-active" type="button">
            全部账户
          </button>
          <button type="button">真实 Live</button>
          <button type="button">模拟 Demo</button>
          <button type="button">USD</button>
          <button type="button">高杠杆</button>
        </section>

        <section className="accounts-page__list">
          {ACCOUNT_CARDS.map((account) => (
            <AccountCard account={account} compact key={account.id} />
          ))}
        </section>
      </div>
    </ConsoleLayout>
  )
}
