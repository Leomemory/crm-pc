import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { APP_ROUTES } from '../../app/routes'
import chevronDown from '../../assets/figma/icons/chevron-down.svg'
import cnFlag from '../../assets/figma/icons/cn-flag.png'
import { AuthLayout } from '../../layouts/AuthLayout'
import { useLocale } from '../../lib/locale'
import { useCountdown } from '../../lib/use-countdown'
import { useSessionStore } from '../../lib/session-store'
import { AppButton } from '../../components/ui/AppButton'
import { FormCheckbox } from '../../components/ui/FormCheckbox'
import { FormField } from '../../components/ui/FormField'
import { createRegisterSchema, type RegisterFormValues } from './auth-schemas'

export function RegisterPage() {
  const navigate = useNavigate()
  const { t } = useLocale()
  const login = useSessionStore((state) => state.login)
  const codeTimer = useCountdown()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const schema = useMemo(() => createRegisterSchema(t), [t])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      code: '',
      phone: '',
      password: '',
      confirmPassword: '',
      inviteCode: '',
      agreeToLegal: false,
    },
    mode: 'onBlur',
  })

  const onSubmit = handleSubmit(async () => {
    login()
    navigate(APP_ROUTES.dashboard)
  })

  return (
    <AuthLayout pageTitle={t('auth.register.title')} scene="register">
      <form className="auth-form" onSubmit={onSubmit}>
        <div className="auth-form__fields">
          <FormField error={errors.email?.message} label={t('auth.register.emailLabel')} required>
            <input
              autoComplete="email"
              placeholder={t('auth.register.emailPlaceholder')}
              {...register('email')}
            />
          </FormField>

          <FormField error={errors.code?.message} label={t('auth.register.codeLabel')} required>
            <input placeholder={t('auth.register.codePlaceholder')} {...register('code')} />
            <button
              className="form-field__action auth-form__send-code"
              disabled={codeTimer.isRunning}
              onClick={codeTimer.start}
              type="button"
            >
              {codeTimer.isRunning ? `${codeTimer.seconds}s` : t('common.action.sendCode')}
            </button>
          </FormField>

          <FormField error={errors.phone?.message} label={t('auth.register.phoneLabel')} required>
            <span className="form-field__prefix">
              <img alt="" className="form-field__prefix-flag" src={cnFlag} />
              <span>+86</span>
              <img alt="" className="form-field__prefix-chevron" src={chevronDown} />
            </span>
            <input
              inputMode="numeric"
              placeholder={t('auth.register.phonePlaceholder')}
              {...register('phone')}
            />
          </FormField>

          <FormField
            error={errors.password?.message}
            hint={t('auth.password.minHint')}
            label={t('auth.register.passwordLabel')}
            required
          >
            <input
              autoComplete="new-password"
              placeholder={t('auth.register.passwordPlaceholder')}
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
            label={t('auth.register.confirmPasswordLabel')}
            required
          >
            <input
              autoComplete="new-password"
              placeholder={t('auth.register.confirmPasswordPlaceholder')}
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

          <FormField error={errors.inviteCode?.message} label={t('auth.register.inviteCodeLabel')}>
            <input
              placeholder={t('auth.register.inviteCodePlaceholder')}
              {...register('inviteCode')}
            />
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
          {t('auth.register.submit')}
        </AppButton>

        <p className="auth-form__switch">
          {t('auth.register.switchPrefix')}
          <Link to={APP_ROUTES.login}>{t('auth.register.switchAction')}</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
