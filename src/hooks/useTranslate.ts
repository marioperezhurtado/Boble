import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export default function useTranslate() {
  const { t, i18n } = useTranslation()

  const detectLanguage = () => {
    const language = (navigator.language || navigator.languages[0]).slice(0, 2)
    return language
  }

  const changeLanguage = (lang: 'en' | 'es') => {
    i18n.changeLanguage(lang).catch(() => {
      throw Error(t('translation.change-error') ?? 'Failed to change language.')
    })
  }

  useEffect(() => {
    // Set stored language or user configured language
    const storedLang = localStorage.getItem('lang')
    if (storedLang === 'en' || storedLang === 'es') {
      changeLanguage(storedLang)
      return
    }
    const defaultLang = detectLanguage()
    if (defaultLang === 'en' || defaultLang === 'es') {
      changeLanguage(defaultLang)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('lang', i18n.language)
  }, [i18n.language])
}
