import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useSearchParams } from 'react-router-dom'

import accountCopyIcon from '../../assets/figma/home/account/copy.svg'
import accountPinIcon from '../../assets/figma/home/account/pin.svg'
import accountSettingsIcon from '../../assets/figma/home/account/settings.svg'
import assetClockImage from '../../assets/figma/home/banner/asset-clock.png'
import modalCloseIcon from '../../assets/figma/home/modal/close.svg'
import calendarIcon from '../../assets/figma/home/quick-entry/calendar.svg'
import communityIcon from '../../assets/figma/home/quick-entry/community.svg'
import depositIcon from '../../assets/figma/home/quick-entry/deposit.svg'
import downloadIcon from '../../assets/figma/home/quick-entry/download.svg'
import guideIcon from '../../assets/figma/home/quick-entry/guide.svg'
import helpIcon from '../../assets/figma/home/quick-entry/help.svg'
import holidayIcon from '../../assets/figma/home/quick-entry/holiday.svg'
import hoursIcon from '../../assets/figma/home/quick-entry/hours.svg'
import arrowDarkIcon from '../../assets/figma/home/right-rail/arrow-dark.svg'
import arrowLightIcon from '../../assets/figma/home/right-rail/arrow-light.svg'
import pointsBadgeImage from '../../assets/figma/home/right-rail/points-badge.png'
import pointsCardFrame from '../../assets/figma/home/right-rail/points-card.svg'
import researchDailyImage from '../../assets/figma/home/right-rail/research-daily.png'
import researchDialogueImage from '../../assets/figma/home/right-rail/research-dialogue.png'
import researchKnowledgeImage from '../../assets/figma/home/right-rail/research-knowledge.png'
import researchLiveImage from '../../assets/figma/home/right-rail/research-live.png'
import actionArrowIcon from '../../assets/figma/home/steps/action-arrow.svg'
import statusCompleteIcon from '../../assets/figma/home/steps/status-complete.svg'
import statusPendingIcon from '../../assets/figma/home/steps/status-pending.svg'
import stepApplyIcon from '../../assets/figma/home/steps/step-apply.svg'
import stepDepositIcon from '../../assets/figma/home/steps/step-deposit.svg'
import stepIdentityIcon from '../../assets/figma/home/steps/step-identity.svg'
import stepTradeIcon from '../../assets/figma/home/steps/step-trade.svg'
import {
  HOME_APPLICATIONS,
  HOME_QUICK_ENTRIES,
  HOME_RESEARCH_CARDS,
  HOME_SCENARIOS,
  HOME_SYSTEM_NOTICES,
  type HomeApplicationItem,
  type HomeNoticeItem,
  type HomeNoticeTab,
  type HomeQuickEntryItem,
  type HomeResearchCardItem,
  type HomeResearchTone,
  type HomeScenario,
  type HomeScenarioKey,
  type HomeStepItem,
} from '../../data/home'
import { MallShowcase } from '../../components/layout/Illustrations'
import { ConsoleLayout } from '../../layouts/ConsoleLayout'

function resolveScenarioKey(value: string | null, modal: string | null): HomeScenarioKey {
  if (value === 'unverified' || value === 'verified' || value === 'trading') {
    return value
  }

  if (modal === 'agreement') {
    return 'trading'
  }

  return 'verified'
}

function getQuickEntryIcon(key: HomeQuickEntryItem['key']) {
  switch (key) {
    case 'deposit':
      return depositIcon
    case 'community':
      return communityIcon
    case 'calendar':
      return calendarIcon
    case 'download':
      return downloadIcon
    case 'hours':
      return hoursIcon
    case 'holiday':
      return holidayIcon
    case 'guide':
      return guideIcon
    case 'help':
      return helpIcon
  }
}

function getStepIcon(key: HomeStepItem['key']) {
  switch (key) {
    case 'identity':
      return stepIdentityIcon
    case 'apply':
      return stepApplyIcon
    case 'deposit':
      return stepDepositIcon
    case 'trade':
      return stepTradeIcon
  }
}

function getResearchImage(id: HomeResearchCardItem['id']) {
  switch (id) {
    case 'live':
      return researchLiveImage
    case 'daily':
      return researchDailyImage
    case 'dialogue':
      return researchDialogueImage
    case 'knowledge':
      return researchKnowledgeImage
    default:
      return researchLiveImage
  }
}

function getResearchArrow(tone: HomeResearchTone) {
  return tone === 'dark' ? arrowLightIcon : arrowDarkIcon
}

function HomeBannerVisual() {
  return (
    <div className="home-banner__visual" aria-hidden="true">
      <MallShowcase compact />
    </div>
  )
}

function HomeAssetCard({ scenario }: { scenario: HomeScenario }) {
  return (
    <article className="home-asset-card">
      <img className="home-asset-card__clock" src={assetClockImage} alt="" />
      <p className="home-asset-card__title">总资产</p>
      <div className="home-asset-card__values">
        <div>
          <span>余额</span>
          <strong>{scenario.balance}</strong>
        </div>
        <div>
          <span>净值</span>
          <strong>{scenario.equity}</strong>
        </div>
      </div>
      <div className="home-asset-card__actions">
        <button className="home-pill-button is-primary" type="button">
          账户入金
        </button>
        <button className="home-pill-button is-inverse" type="button">
          出金提现
        </button>
        <button className="home-pill-button is-inverse" type="button">
          资金划转
        </button>
      </div>
    </article>
  )
}

function HomeQuickEntryCard() {
  return (
    <article className="home-quick-card">
      <div className="home-quick-card__grid">
        {HOME_QUICK_ENTRIES.map((entry) => (
          <button className="home-quick-card__item" key={entry.key} type="button">
            <span className="home-quick-card__icon">
              <img src={getQuickEntryIcon(entry.key)} alt="" />
            </span>
            <span className="home-quick-card__label">{entry.label}</span>
          </button>
        ))}
      </div>
    </article>
  )
}

function HomeStepStatus({ step }: { step: HomeStepItem }) {
  if (step.status === 'action') {
    return (
      <button className="home-steps__action" type="button">
        <span>{step.actionLabel}</span>
        <img src={actionArrowIcon} alt="" />
      </button>
    )
  }

  return (
    <div className={clsx('home-steps__status', `is-${step.status}`)}>
      <img src={step.status === 'complete' ? statusCompleteIcon : statusPendingIcon} alt="" />
      <span>{step.status === 'complete' ? '已完成' : '待完成'}</span>
    </div>
  )
}

function HomeAccountsPanel({ scenario }: { scenario: HomeScenario }) {
  return (
    <section className="home-accounts">
      <header className="home-accounts__header">
        <h3>我的账户</h3>
        {scenario.showApplyAccount ? (
          <button className="home-accounts__link" type="button">
            + 申请账户
          </button>
        ) : null}
      </header>

      <div className="home-steps">
        {scenario.steps.map((step) => (
          <article
            className={clsx('home-steps__item', `is-${step.status}`)}
            key={step.key}
          >
            <div className="home-steps__icon">
              <img src={getStepIcon(step.key)} alt="" />
            </div>
            <div className="home-steps__copy">
              <div className="home-steps__title-row">
                <span className="home-steps__order">{step.order}</span>
                <h4>{step.title}</h4>
              </div>
              <p>{step.description}</p>
            </div>
            <HomeStepStatus step={step} />
          </article>
        ))}
      </div>

      {scenario.accounts.length ? (
        <div className="home-accounts__cards">
          {scenario.accounts.map((account) => (
            <article className="home-account-card" key={account.id}>
              <div className="home-account-card__header">
                <div className="home-account-card__tags">
                  <span className="home-account-card__dot" />
                  <strong className="home-account-card__id">{account.id}</strong>
                  <span className="home-account-card__badge is-orange">{account.platform}</span>
                  <span className="home-account-card__badge is-orange">{account.type}</span>
                  <span className="home-account-card__badge is-orange">{account.currency}</span>
                  <span className="home-account-card__badge is-green">{account.mode}</span>
                </div>

                <div className="home-account-card__tools">
                  <div className="home-account-card__server">
                    <span>服务器：{account.server}</span>
                    <button type="button">
                      <img src={accountCopyIcon} alt="" />
                    </button>
                  </div>
                  <button
                    className={clsx(
                      'home-account-card__icon-button',
                      account.pinned && 'is-pinned',
                    )}
                    type="button"
                  >
                    <img src={accountPinIcon} alt="" />
                  </button>
                  <button className="home-account-card__icon-button" type="button">
                    <img src={accountSettingsIcon} alt="" />
                  </button>
                </div>
              </div>

              <div className="home-account-card__body">
                <div className="home-account-card__metrics">
                  <div>
                    <span>余额</span>
                    <strong>{account.balance}</strong>
                  </div>
                  <div>
                    <span>净值</span>
                    <strong>{account.equity}</strong>
                  </div>
                  <div>
                    <span>杠杆</span>
                    <strong>{account.leverage}</strong>
                  </div>
                </div>

                <div className="home-account-card__actions">
                  <button className="home-pill-button is-muted" type="button">
                    出金
                  </button>
                  <button className="home-pill-button is-primary" type="button">
                    入金
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {scenario.showAllAccounts ? (
        <button className="home-accounts__more" type="button">
          <span>全部账户</span>
          <img src={arrowDarkIcon} alt="" />
        </button>
      ) : null}
    </section>
  )
}

function HomePointsCard() {
  return (
    <section className="home-points-card">
      <img className="home-points-card__frame" src={pointsCardFrame} alt="" />
      <img className="home-points-card__badge" src={pointsBadgeImage} alt="" />
      <div className="home-points-card__content">
        <div>
          <p>我的积分</p>
          <strong>9,834</strong>
        </div>
        <div className="home-points-card__meta">
          <div className="home-points-card__level">
            <span>水晶会员</span>
            <small>1.0倍返积分</small>
          </div>
          <div className="home-points-card__progress-copy">
            <span>还需166成长值升级，1.5倍返积分</span>
            <div className="home-points-card__progress">
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HomeSystemNoticeList({ notices }: { notices: HomeNoticeItem[] }) {
  return (
    <div className="home-rail__list">
      {notices.map((notice) => (
        <article className="home-rail__notice" key={notice.id}>
          <span className="home-rail__tag">{notice.tag}</span>
          <p>{notice.title}</p>
          <time>{notice.date}</time>
        </article>
      ))}
    </div>
  )
}

function HomeApplicationList({ applications }: { applications: HomeApplicationItem[] }) {
  return (
    <div className="home-rail__list is-applications">
      {applications.map((item) => (
        <article className="home-rail__application" key={item.id}>
          <div className="home-rail__application-head">
            <p>{item.title}</p>
            <span className={clsx('home-rail__status-tag', `is-${item.tone}`)}>
              {item.status}
            </span>
          </div>
          <div className="home-rail__application-meta">
            <span>账户：{item.account}</span>
            <span>金额：{item.amount}</span>
            <time>{item.date}</time>
          </div>
        </article>
      ))}
    </div>
  )
}

function HomeResearchSection() {
  return (
    <section className="home-rail__research">
      <h3>投研中心</h3>
      <div className="home-research-grid">
        {HOME_RESEARCH_CARDS.map((card) => (
          <article className={clsx('home-research-card', `is-${card.tone}`)} key={card.id}>
            <h4>{card.title}</h4>
            <img className="home-research-card__art" src={getResearchImage(card.id)} alt="" />
            <span className="home-research-card__arrow">
              <img src={getResearchArrow(card.tone)} alt="" />
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}

function AgreementModal({ onClose }: { onClose: () => void }) {
  const [agreed, setAgreed] = useState(true)

  return (
    <div className="home-agreement" role="presentation">
      <div
        aria-labelledby="home-agreement-title"
        aria-modal="true"
        className="home-agreement__dialog"
        role="dialog"
      >
        <button className="home-agreement__close" onClick={onClose} type="button">
          <img src={modalCloseIcon} alt="" />
        </button>

        <div className="home-agreement__copy">
          <div className="home-agreement__intro">
            <p id="home-agreement-title">尊敬的合作伙伴，</p>
            <div>
              <p>欢迎加入我们的 Introducing Broker (IB) 计划。</p>
              <p>
                为保障合作的合规性与透明性，请您在继续使用系统前仔细阅读并确认《IB合作协议》。
              </p>
            </div>
          </div>

          <button
            className={clsx('home-agreement__checkbox', agreed && 'is-checked')}
            onClick={() => setAgreed((value) => !value)}
            type="button"
          >
            <span className="home-agreement__checkbox-box" />
            <span>
              我已阅读并同意《<em>IB合作协议</em>》的全部条款。
            </span>
          </button>
        </div>

        <button
          className="home-agreement__confirm"
          disabled={!agreed}
          onClick={onClose}
          type="button"
        >
          确认
        </button>
      </div>
    </div>
  )
}

export function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const modal = searchParams.get('modal')
  const scenarioKey = resolveScenarioKey(searchParams.get('state'), modal)
  const scenario = HOME_SCENARIOS[scenarioKey]
  const [scrollY, setScrollY] = useState(() =>
    typeof window === 'undefined' ? 0 : window.scrollY,
  )
  const noticeTabParam = searchParams.get('tab')
  const noticeTab: HomeNoticeTab =
    noticeTabParam === 'system' || noticeTabParam === 'applications'
      ? noticeTabParam
      : scenario.noticeTab
  const isScrolled = searchParams.get('scroll') === 'collapsed' || scrollY > 32
  const showAgreementModal = modal === 'agreement'

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function updateSearchParam(key: string, value?: string) {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (value) {
      nextSearchParams.set(key, value)
    } else {
      nextSearchParams.delete(key)
    }

    setSearchParams(nextSearchParams, { replace: true })
  }

  return (
    <ConsoleLayout
      stickyTopbar={isScrolled}
      topbarLeading={
        <p className={clsx('console-topbar__page-title', isScrolled && 'is-visible')}>
          欢迎来到 ACCM
        </p>
      }
    >
      <div className={clsx('home-page', isScrolled && 'is-scrolled')}>
        <div className="home-page__grid">
          <div className="home-page__main">
            <header className="home-page__hero">
              <h1>欢迎来到 ACCM</h1>

              <section className="home-banner">
                <div className="home-banner__copy">
                  <h2>积分商城 · 用积分添彩生活</h2>
                  <p>
                    <span>积分</span> 您的全球消费基金，澳洲直邮商品触手可及
                  </p>
                </div>
                <HomeBannerVisual />
              </section>
            </header>

            <section className="home-page__overview">
              <HomeAssetCard scenario={scenario} />
              <HomeQuickEntryCard />
            </section>

            <HomeAccountsPanel scenario={scenario} />
          </div>

          <aside className="home-page__rail">
            <div className="home-rail">
              <HomePointsCard />

              <section className="home-rail__notices">
                <div className="home-rail__tabs">
                  <button
                    className={clsx(noticeTab === 'system' && 'is-active')}
                    onClick={() => updateSearchParam('tab', 'system')}
                    type="button"
                  >
                    系统公告
                  </button>
                  <button
                    className={clsx(noticeTab === 'applications' && 'is-active')}
                    onClick={() => updateSearchParam('tab', 'applications')}
                    type="button"
                  >
                    我的申请
                  </button>
                </div>

                {noticeTab === 'system' ? (
                  <HomeSystemNoticeList notices={HOME_SYSTEM_NOTICES} />
                ) : (
                  <HomeApplicationList applications={HOME_APPLICATIONS} />
                )}

                <button className="home-rail__more" type="button">
                  <span>查看更多</span>
                  <img src={arrowDarkIcon} alt="" />
                </button>
              </section>

              <HomeResearchSection />
            </div>
          </aside>
        </div>

        {showAgreementModal ? (
          <AgreementModal onClose={() => updateSearchParam('modal')} />
        ) : null}
      </div>
    </ConsoleLayout>
  )
}
