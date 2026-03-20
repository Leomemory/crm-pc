import { z } from 'zod'

import type { Translator } from '../../lib/locale'

export function createLoginSchema(t: Translator) {
  return z.object({
    account: z.string().trim().min(1, t('auth.validation.accountRequired')),
    password: z.string().trim().min(6, t('auth.validation.passwordMin')),
    remember: z.boolean().optional(),
  })
}

export function createRegisterSchema(t: Translator) {
  return z
    .object({
      email: z.string().trim().email(t('auth.validation.emailInvalid')),
      code: z.string().trim().min(4, t('auth.validation.codeRequired')),
      phone: z
        .string()
        .trim()
        .regex(/^1\d{10}$/, t('auth.validation.phoneInvalid')),
      password: z.string().trim().min(6, t('auth.validation.passwordMin')),
      confirmPassword: z
        .string()
        .trim()
        .min(6, t('auth.validation.confirmPasswordRequired')),
      inviteCode: z.string().trim().optional(),
      agreeToLegal: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('auth.validation.passwordMismatch'),
      path: ['confirmPassword'],
    })
    .refine((data) => data.agreeToLegal, {
      message: t('auth.validation.agreeLegal'),
      path: ['agreeToLegal'],
    })
}

export function createForgotPasswordSchema(t: Translator) {
  return z
    .object({
      email: z.string().trim().email(t('auth.validation.emailInvalid')),
      code: z.string().trim().min(4, t('auth.validation.codeRequired')),
      password: z.string().trim().min(6, t('auth.validation.passwordMin')),
      confirmPassword: z
        .string()
        .trim()
        .min(6, t('auth.validation.confirmNewPasswordRequired')),
      agreeToLegal: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('auth.validation.passwordMismatch'),
      path: ['confirmPassword'],
    })
    .refine((data) => data.agreeToLegal, {
      message: t('auth.validation.agreeLegal'),
      path: ['agreeToLegal'],
    })
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>
export type RegisterFormValues = z.infer<ReturnType<typeof createRegisterSchema>>
export type ForgotPasswordFormValues = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>
