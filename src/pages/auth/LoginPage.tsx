import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { APP_ROUTES } from '../../app/routes'
import { AuthLayout } from '../../layouts/AuthLayout'
import { useSessionStore } from '../../lib/session-store'
import { AppButton } from '../../components/ui/AppButton'
import { FormCheckbox } from '../../components/ui/FormCheckbox'
import { FormField } from '../../components/ui/FormField'
import { loginSchema, type LoginFormValues } from './auth-schemas'

type SuccessState = { message?: string } | null

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useSessionStore((state) => state.login)
  const [showPassword, setShowPassword] = useState(false)
  const successState = useMemo(
    () => (location.state as SuccessState) ?? null,
    [location.state],
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
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
      pageDescription="欢迎来到ACCM客户管理系统"
      pageTitle="欢迎回来"
      scene="login"
    >
      <form className="auth-form" onSubmit={onSubmit}>
        {successState?.message ? (
          <div className="auth-form__notice">{successState.message}</div>
        ) : null}

        <div className="auth-form__fields">
          <FormField
            error={errors.account?.message}
            label="邮箱/帐号"
            required={false}
          >
            <input
              autoComplete="username"
              placeholder="请输入邮箱/账号"
              {...register('account')}
            />
          </FormField>

          <FormField error={errors.password?.message} label="密码">
            <input
              autoComplete="current-password"
              placeholder="请输入密码"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
            />
            <button
              aria-label={showPassword ? '隐藏密码' : '显示密码'}
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
            label="记住我"
            {...register('remember')}
          />
          <Link className="auth-form__link" to={APP_ROUTES.forgotPassword}>
            忘记密码？
          </Link>
        </div>

        <AppButton block disabled={isSubmitting} type="submit" variant="primary">
          登录
        </AppButton>

        <p className="auth-form__switch">
          还没有账号，<Link to={APP_ROUTES.register}>去注册</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
