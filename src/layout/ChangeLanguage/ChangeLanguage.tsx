import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import useOnClickOutside from '../../hooks/useOnClickOutside'

import TranslateIcon from '../../assets/TranslateIcon'

export default function ChangeLanguage() {
  const ref = useRef<HTMLDivElement>(null)
  const [optionsOpen, setOptionsOpen] = useState(false)
  const { t, i18n } = useTranslation('global')

  useOnClickOutside({
    ref,
    handler: () => setOptionsOpen(false)
  })

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng)
  }

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
        className={`mx-auto bg-white border rounded-md shadow-md w-fit lg:mx-0 hover:bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 dark:hover:bg-zinc-600 p-2 ${
          optionsOpen ? 'shadow-none' : ''
        }`}>
        <TranslateIcon />
      </button>
      {optionsOpen && (
        <ul className="absolute top-0 flex overflow-hidden font-semibold bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600">
          <li>
            <button
              onClick={handleChangeToEnglish}
              className="px-3 py-1.5 border-r hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-600">
              En
            </button>
          </li>
          <li>
            <button
              onClick={handleChangeToSpanish}
              className="px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-600 border-r dark:border-zinc-600">
              Es
            </button>
          </li>
          <li>
            <button
              onClick={handleChangeToFrench}
              className="px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-600">
              Fr
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
