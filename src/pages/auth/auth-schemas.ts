import { z } from 'zod'

export const loginSchema = z.object({
  account: z.string().trim().min(1, '请输入邮箱/账号'),
  password: z.string().trim().min(6, '密码至少6位'),
  remember: z.boolean().optional(),
})

export const registerSchema = z
  .object({
    email: z.string().trim().email('请输入正确的邮箱'),
    code: z.string().trim().min(4, '请输入验证码'),
    phone: z
      .string()
      .trim()
      .regex(/^1\d{10}$/, '请输入正确的手机号'),
    password: z.string().trim().min(6, '密码至少6位'),
    confirmPassword: z.string().trim().min(6, '请再次输入密码'),
    inviteCode: z.string().trim().optional(),
    agreeToLegal: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  })
  .refine((data) => data.agreeToLegal, {
    message: '请先同意法律文件',
    path: ['agreeToLegal'],
  })

export const forgotPasswordSchema = z
  .object({
    email: z.string().trim().email('请输入正确的邮箱'),
    code: z.string().trim().min(4, '请输入验证码'),
    password: z.string().trim().min(6, '密码至少6位'),
    confirmPassword: z.string().trim().min(6, '请再次输入新密码'),
    agreeToLegal: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  })
  .refine((data) => data.agreeToLegal, {
    message: '请先同意法律文件',
    path: ['agreeToLegal'],
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
