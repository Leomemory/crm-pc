import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { APP_ROUTES } from '../../app/routes'
import { AuthLayout } from '../../layouts/AuthLayout'
import { useCountdown } from '../../lib/use-countdown'
import { AppButton } from '../../components/ui/AppButton'
import { FormCheckbox } from '../../components/ui/FormCheckbox'
import { FormField } from '../../components/ui/FormField'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from './auth-schemas'

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const codeTimer = useCountdown()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
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
      state: { message: '密码已更新，请使用新密码登录。' },
    })
  })

  return (
    <AuthLayout pageTitle="忘记密码" scene="forgotPassword">
      <form className="auth-form" onSubmit={onSubmit}>
        <div className="auth-form__fields">
          <FormField error={errors.email?.message} label="邮箱" required>
            <input
              autoComplete="email"
              placeholder="请输入邮箱"
              {...register('email')}
            />
          </FormField>

          <FormField error={errors.code?.message} label="验证码" required>
            <input placeholder="请输入验证码" {...register('code')} />
            <button
              className="form-field__action"
              disabled={codeTimer.isRunning}
              onClick={codeTimer.start}
              type="button"
            >
              {codeTimer.isRunning ? `${codeTimer.seconds}s` : '发送验证码'}
            </button>
          </FormField>

          <FormField
            error={errors.password?.message}
            hint="最低6位"
            label="新密码"
            required
          >
            <input
              autoComplete="new-password"
              placeholder="请输入新密码"
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

          <FormField
            error={errors.confirmPassword?.message}
            label="确认新密码"
            required
          >
            <input
              autoComplete="new-password"
              placeholder="请再次输入新密码"
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
            />
            <button
              aria-label={showConfirmPassword ? '隐藏密码' : '显示密码'}
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
            label="我同意法律文件"
            {...register('agreeToLegal')}
          />
        </div>

        <AppButton block disabled={isSubmitting} type="submit" variant="primary">
          提交
        </AppButton>

        <p className="auth-form__switch">
          已有账号，<Link to={APP_ROUTES.login}>去登录</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
