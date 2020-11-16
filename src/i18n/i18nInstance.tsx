import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import enNz from './translations/enNz'

const resources = {
  'en-NZ': enNz,
}

export type SupportedLanguage = keyof typeof resources

i18next.use(initReactI18next).init({
  resources,
  fallbackLng: 'en-NZ',
})
