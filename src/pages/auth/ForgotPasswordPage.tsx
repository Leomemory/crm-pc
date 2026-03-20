import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { APP_ROUTES } from '../../app/routes'
import { AuthLayout } from '../../layouts/AuthLayout'
import { useLocale } from '../../lib/locale'
import { useCountdown } from '../../lib/use-countdown'
import { AppButton } from '../../components/ui/AppButton'
import { FormCheckbox } from '../../components/ui/FormCheckbox'
import { FormField } from '../../components/ui/FormField'
import {
  createForgotPasswordSchema,
  type ForgotPasswordFormValues,
} from './auth-schemas'

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const { t } = useLocale()
  const codeTimer = useCountdown()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const schema = useMemo(() => createForgotPasswordSchema(t), [t])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
      agreeToLegal: false,
    },
    mode: 'onBlur',
  })

  const onSubmit = handleSubmit(async () => {
    navigate(APP_ROUTES.login, {
      state: { messageKey: 'auth.forgot.success' },
    })
  })

  return (
    <AuthLayout pageTitle={t('auth.forgot.title')} scene="forgotPassword">
      <form className="auth-form" onSubmit={onSubmit}>
        <div className="auth-form__fields">
          <FormField error={errors.email?.message} label={t('auth.forgot.emailLabel')} required>
            <input
              autoComplete="email"
              placeholder={t('auth.forgot.emailPlaceholder')}
              {...register('email')}
            />
          </FormField>

          <FormField error={errors.code?.message} label={t('auth.forgot.codeLabel')} required>
            <input placeholder={t('auth.forgot.codePlaceholder')} {...register('code')} />
            <button
              className="form-field__action auth-form__send-code"
              disabled={codeTimer.isRunning}
              onClick={codeTimer.start}
              type="button"
            >
              {codeTimer.isRunning ? `${codeTimer.seconds}s` : t('common.action.sendCode')}
            </button>
          </FormField>

          <FormField
            error={errors.password?.message}
            hint={t('auth.password.minHint')}
            label={t('auth.forgot.passwordLabel')}
            required
          >
            <input
              autoComplete="new-password"
              placeholder={t('auth.forgot.passwordPlaceholder')}
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
            />
            <button
              aria-label={showPassword ? t('auth.password.hide') : t('auth.password.show')}
              className="form-field__toggle"
              onClick={() => setShowPassword((value) => !value)}
              type="button"
            >
              {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </button>
          </FormField>

          <FormField
            error={errors.confirmPassword?.message}
            label={t('auth.forgot.confirmPasswordLabel')}
            required
          >
            <input
              autoComplete="new-password"
              placeholder={t('auth.forgot.confirmPasswordPlaceholder')}
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
            />
            <button
              aria-label={
                showConfirmPassword ? t('auth.password.hide') : t('auth.password.show')
              }
              className="form-field__toggle"
              onClick={() => setShowConfirmPassword((value) => !value)}
              type="button"
            >
              {showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </button>
          </FormField>
        </div>

        <div className="auth-form__row auth-form__row--stack">
          <FormCheckbox
            className="auth-form__checkbox"
            error={errors.agreeToLegal?.message}
            label={t('auth.legal.agree')}
            {...register('agreeToLegal')}
          />
        </div>

        <AppButton
          block
          className="auth-form__submit"
          disabled={isSubmitting}
          type="submit"
          variant="primary"
        >
          {t('auth.forgot.submit')}
        </AppButton>

        <p className="auth-form__switch">
          {t('auth.forgot.switchPrefix')}
          <Link to={APP_ROUTES.login}>{t('auth.forgot.switchAction')}</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
