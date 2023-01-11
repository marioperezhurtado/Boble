import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import useOnClickOutside from '../../hooks/useOnClickOutside'

import TranslateIcon from '../../assets/TranslateIcon'

export default function ChangeLanguage() {
  const ref = useRef<HTMLDivElement>(null)
  const [optionsOpen, setOptionsOpen] = useState(false)
  const { i18n } = useTranslation()

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

  const toggleOptionsOpen = () => setOptionsOpen((prev) => !prev)

  return (
    <div ref={ref} className="relative">
      <button
        title="Toggle dark mode"
        onClick={toggleOptionsOpen}
        className={`mx-auto bg-white border rounded-md shadow-md w-fit lg:mx-0 hover:bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 dark:hover:bg-zinc-600 p-1.5 ${
          optionsOpen ? 'shadow-none' : ''
        }`}>
        <TranslateIcon />
      </button>
      {optionsOpen && (
        <ul className="absolute top-0 flex overflow-hidden text-sm font-semibold bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600">
          <li>
            <button
              onClick={handleChangeToEnglish}
              className="hover:bg-zinc-100 py-1.5 px-2 border-r dark:border-zinc-600 dark:hover:bg-zinc-600">
              EN
            </button>
          </li>
          <li>
            <button
              onClick={handleChangeToSpanish}
              className="hover:bg-zinc-100 py-1.5 px-2 dark:hover:bg-zinc-600">
              ES
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
