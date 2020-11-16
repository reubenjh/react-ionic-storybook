import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SupportedLanguage } from './i18nInstance'
import { DateTime } from 'luxon'
import { TOptions } from 'i18next'

// TODO: defaults should come from settings
const defaultLocale = 'en-NZ'
const defaultCurrencyCode = 'NZD'

const supportedLocales = ['en-NZ'] as const

export type SupportedLocale = typeof supportedLocales[number]

interface II18nContext {
  c: (num: number, currencyCode?: string) => string
  d: (dateTime: DateTime, formatOptions: Intl.DateTimeFormatOptions) => string
  n: (num: number) => string
  t: (key: string, options?: TOptions<{ [key: string]: any }>) => string
  locale: SupportedLocale
  setLocale: (locale: SupportedLocale) => void
  language: string
  setLanguage: (l: SupportedLanguage) => void
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const I18nContext = createContext<II18nContext>({} as II18nContext)

export const useI18n = (options?: { translationNamespace?: string } | undefined) => {
  const translationNamespace = options?.translationNamespace

  const ctx = useContext(I18nContext)
  // set default translation namespace
  if (translationNamespace) {
    return {
      ...ctx,
      // eslint-disable-next-line @typescript-eslint/no-shadow
      t: (key: string, options?: TOptions<{ [key: string]: any }>) =>
        ctx.t(key.includes(':') ? key : `${translationNamespace}:${key}`, options),
    }
  }
  return ctx
}

export const I18nProvider: FC = ({ children }) => {
  const { t: i18nT, i18n } = useTranslation()
  const [locale, setLocaleInternal] = useState<SupportedLocale>(defaultLocale)

  const setLocale = (loc: SupportedLocale) => {
    setLocaleInternal(loc)
  }

  const setLanguage = (l: SupportedLanguage) => {
    i18n.changeLanguage(l)
  }

  const d = (dateTime: DateTime, formatOptions: Intl.DateTimeFormatOptions) =>
    dateTime.setLocale(locale).toLocaleString(formatOptions)

  const n = (num: number) => num.toLocaleString(locale)

  const c = (num: number, currencyCode = defaultCurrencyCode) =>
    (num / 1.0).toLocaleString(locale, {
      minimumFractionDigits: 2,
      currency: currencyCode,
      currencyDisplay: 'symbol',
      style: 'currency',
    })

  const t = (key: string, options?: TOptions<{ [key: string]: any }>) => i18nT(key, options)

  useEffect(() => {
    i18n.options.saveMissing = true
    i18n.options.missingKeyHandler = (languages, namespace, key, fallback) => {
      const message = `Missing translation for key "${key}". Falling back to value "${fallback}"`
      const error = {
        message,
        data: {
          languages,
          namespace,
          key,
          fallback,
        },
      }
      // eslint-disable-next-line no-console
      console.error(error)
      // TODO: log error to production logs here
    }
  }, [i18n])

  return (
    <I18nContext.Provider
      value={{
        c,
        d,
        n,
        t,
        locale,
        setLocale,
        language: i18n.language,
        setLanguage,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}
