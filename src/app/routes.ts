export const APP_ROUTES = {
  root: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  dashboard: '/dashboard',
  accounts: '/accounts',
} as const

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES]
