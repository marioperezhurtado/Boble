import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export type Language = 'en' | 'es' | 'fr'

const availableLanguages = ['en', 'es', 'fr']

export default function useTranslate() {
  const { t, i18n } = useTranslation()

  const language = i18n.language as Language

  const detectLanguage = () => {
    const language = (navigator.language || navigator.languages[0]).slice(0, 2)
    return language as Language
  }

  const changeLanguage = (lang: Language) => {
    if (!availableLanguages.includes(lang)) return
    i18n.changeLanguage(lang).catch(() => {
      throw Error(t('translation.change-error') ?? 'Failed to change language.')
    })
  }

  useEffect(() => {
    // Set stored language or user configured language
    const storedLang = localStorage.getItem('lang') as Language
    if (storedLang) {
      changeLanguage(storedLang)
      return
    }
    const defaultLang = detectLanguage()
    if (!defaultLang) return
    changeLanguage(defaultLang)
  }, [])

  useEffect(() => {
    localStorage.setItem('lang', language)
  }, [language])

  return { language, changeLanguage }
}
