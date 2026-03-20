import { CheckCircleFilled, RightOutlined } from '@ant-design/icons'
import clsx from 'clsx'

import type { OnboardingStepItem } from '../../types/app'
import { AppButton } from '../ui/AppButton'

interface OnboardingStepsProps {
  steps: OnboardingStepItem[]
}

export function OnboardingSteps({ steps }: OnboardingStepsProps) {
  return (
    <div className="onboarding-steps">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1

        return (
          <div
            className={clsx(
              'onboarding-steps__item',
              `is-${step.status}`,
              isLast && 'is-last',
            )}
            key={step.key}
          >
            <div className="onboarding-steps__icon">{step.order}</div>
            {!isLast ? <div className="onboarding-steps__line" /> : null}
            <div className="onboarding-steps__content">
              <div className="onboarding-steps__title-row">
                <span className="onboarding-steps__title">{step.title}</span>
              </div>
              <p className="onboarding-steps__description">{step.description}</p>
              {step.status === 'complete' ? (
                <span className="onboarding-steps__status">
                  <CheckCircleFilled />
                  已完成
                </span>
              ) : null}
              {step.status === 'pending' ? (
                <span className="onboarding-steps__status is-pending">
                  <CheckCircleFilled />
                  待完成
                </span>
              ) : null}
              {step.status === 'action' ? (
                <AppButton
                  className="onboarding-steps__action"
                  trailingIcon={<RightOutlined />}
                  variant="pill"
                  type="button"
                >
                  {step.actionLabel}
                </AppButton>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}
