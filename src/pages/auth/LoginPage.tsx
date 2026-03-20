import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { APP_ROUTES } from '../../app/routes'
import { AuthLayout } from '../../layouts/AuthLayout'
import { useLocale } from '../../lib/locale'
import { useSessionStore } from '../../lib/session-store'
import { AppButton } from '../../components/ui/AppButton'
import { FormCheckbox } from '../../components/ui/FormCheckbox'
import { FormField } from '../../components/ui/FormField'
import { createLoginSchema, type LoginFormValues } from './auth-schemas'

type SuccessState = { messageKey?: string } | null

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useLocale()
  const login = useSessionStore((state) => state.login)
  const [showPassword, setShowPassword] = useState(false)
  const schema = useMemo(() => createLoginSchema(t), [t])
  const successState = useMemo(
    () => (location.state as SuccessState) ?? null,
    [location.state],
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      account: '',
      password: '',
      remember: true,
    },
    mode: 'onBlur',
  })

  const onSubmit = handleSubmit(async () => {
    login()
    navigate(APP_ROUTES.dashboard)
  })

  return (
    <AuthLayout
      pageDescription={t('auth.login.description')}
      pageTitle={t('auth.login.title')}
      scene="login"
    >
      <form className="auth-form" onSubmit={onSubmit}>
        {successState?.messageKey ? (
          <div className="auth-form__notice">{t(successState.messageKey)}</div>
        ) : null}

        <div className="auth-form__fields">
          <FormField
            error={errors.account?.message}
            label={t('auth.login.accountLabel')}
            required={false}
          >
            <input
              autoComplete="username"
              placeholder={t('auth.login.accountPlaceholder')}
              {...register('account')}
            />
          </FormField>

          <FormField error={errors.password?.message} label={t('auth.login.passwordLabel')}>
            <input
              autoComplete="current-password"
              placeholder={t('auth.login.passwordPlaceholder')}
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
        </div>

        <div className="auth-form__row">
          <FormCheckbox
            className="auth-form__checkbox"
            label={t('auth.login.remember')}
            {...register('remember')}
          />
          <Link className="auth-form__link" to={APP_ROUTES.forgotPassword}>
            {t('auth.login.forgot')}
          </Link>
        </div>

        <AppButton
          block
          className="auth-form__submit"
          disabled={isSubmitting}
          type="submit"
          variant="primary"
        >
          {t('auth.login.submit')}
        </AppButton>

        <p className="auth-form__switch">
          {t('auth.login.switchPrefix')}
          <Link to={APP_ROUTES.register}>{t('auth.login.switchAction')}</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
