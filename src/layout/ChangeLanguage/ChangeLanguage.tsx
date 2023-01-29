import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useUserConfig } from '../../contexts/UserConfigContext'
import useOnClickOutside from '../../hooks/useOnClickOutside'

import TranslateIcon from '../../assets/TranslateIcon'

export default function ChangeLanguage() {
  const { t } = useTranslation('global')
  const { language, changeLanguage } = useUserConfig()
  const ref = useRef<HTMLDivElement>(null)
  const [optionsOpen, setOptionsOpen] = useState(false)

  useOnClickOutside({ ref, handler: () => setOptionsOpen(false) })

  const handleChangeToEnglish = async () => {
    await changeLanguage('en')
    setOptionsOpen(false)
  }

  const handleChangeToSpanish = async () => {
    await changeLanguage('es')
    setOptionsOpen(false)
  }

  const handleChangeToFrench = async () => {
    await changeLanguage('fr')
    setOptionsOpen(false)
  }

  const toggleOptionsOpen = () => setOptionsOpen((prev) => !prev)

  return (
    <div ref={ref} className="relative">
      <button
        title={t('translation.title')}
        onClick={toggleOptionsOpen}
        className={`bg-white border rounded-md shadow-md w-fit lg:mx-0 hover:bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 dark:hover:bg-zinc-600 p-2 ${
          optionsOpen ? 'shadow-none' : ''
        }`}>
        <TranslateIcon />
      </button>
      {optionsOpen && (
        <ul className="absolute top-0 z-10 flex overflow-hidden font-semibold bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600">
          <li>
            <button
              onClick={handleChangeToEnglish}
              className={`px-3 py-1.5 border-r hover:bg-zinc-100 dark:border-zinc-500 dark:hover:bg-zinc-600
              ${language === 'en' ? 'bg-zinc-100 dark:bg-zinc-500' : ''}`}>
              En
            </button>
          </li>
          <li>
            <button
              onClick={handleChangeToSpanish}
              className={`px-3 py-1.5 border-r hover:bg-zinc-100 dark:border-zinc-500 dark:hover:bg-zinc-600
              ${language === 'es' ? 'bg-zinc-100 dark:bg-zinc-500' : ''}`}>
              Es
            </button>
          </li>
          <li>
            <button
              onClick={handleChangeToFrench}
              className={`px-3 py-1.5 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-600
              ${language === 'fr' ? 'bg-zinc-100 dark:bg-zinc-500' : ''}`}>
              Fr
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
