/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import enUSMessages from '../locales/en_US.json'
import zhCNMessages from '../locales/zh_CN.json'

export type AppLocale = 'zh_CN' | 'en_US'
export type Translator = (key: string) => string

interface LocaleContextValue {
  locale: AppLocale
  setLocale: (locale: AppLocale) => void
  t: Translator
}

const LOCALE_STORAGE_KEY = 'accm-locale'
const DEFAULT_LOCALE: AppLocale = 'zh_CN'

const messages: Record<AppLocale, Record<string, string>> = {
  zh_CN: zhCNMessages,
  en_US: enUSMessages,
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function getInitialLocale(): AppLocale {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE
  }

  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY)

  if (storedLocale === 'zh_CN' || storedLocale === 'en_US') {
    return storedLocale
  }

  return DEFAULT_LOCALE
}

export function LocaleProvider({ children }: PropsWithChildren) {
  const [locale, setLocaleState] = useState<AppLocale>(getInitialLocale)

  const setLocale = useCallback((nextLocale: AppLocale) => {
    setLocaleState(nextLocale)
    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale)
  }, [])

  const t = useCallback<Translator>(
    (key) => messages[locale][key] ?? messages[DEFAULT_LOCALE][key] ?? key,
    [locale],
  )

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, setLocale, t],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }

  return context
}
