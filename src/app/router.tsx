import { Suspense } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { APP_ROUTES } from './routes'
import { useSessionStore } from '../lib/session-store'
import { LoginPage } from '../pages/auth/LoginPage'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage'
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import { AccountsPage } from '../pages/accounts/AccountsPage'

function AuthOnlyRoute() {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate replace to={APP_ROUTES.dashboard} />
  }

  return <Outlet />
}

function ProtectedRoute() {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate replace to={APP_ROUTES.login} />
  }

  return <Outlet />
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Navigate replace to={APP_ROUTES.login} />} path={APP_ROUTES.root} />

          <Route element={<AuthOnlyRoute />}>
            <Route element={<LoginPage />} path={APP_ROUTES.login} />
            <Route element={<RegisterPage />} path={APP_ROUTES.register} />
            <Route
              element={<ForgotPasswordPage />}
              path={APP_ROUTES.forgotPassword}
            />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardPage />} path={APP_ROUTES.dashboard} />
            <Route element={<AccountsPage />} path={APP_ROUTES.accounts} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
