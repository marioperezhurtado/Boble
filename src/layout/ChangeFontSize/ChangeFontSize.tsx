import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useUserConfig } from '../../contexts/UserConfigContext'
import useOnClickOutside from '../../hooks/useOnClickOutside'

import FontSizeIcon from '../../assets/FontSizeIcon'

export default function ChangeFontSize() {
  const { t } = useTranslation()
  const { fontSize, changeFontSize } = useUserConfig()
  const ref = useRef<HTMLDivElement>(null)
  const [optionsOpen, setOptionsOpen] = useState(false)

  useOnClickOutside({ ref, handler: () => setOptionsOpen(false) })

  const handleChangeToMedium = () => {
    changeFontSize('normal')
    setOptionsOpen(false)
  }

  const handleChangeToLarge = () => {
    changeFontSize('large')
    setOptionsOpen(false)
  }

  const handleChangeToExtraLarge = () => {
    changeFontSize('xlarge')
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
        <FontSizeIcon />
      </button>
      {optionsOpen && (
        <ul className="absolute top-0 flex overflow-hidden font-semibold bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600 z-10">
          <li>
            <button
              onClick={handleChangeToMedium}
              className={`px-3 py-1.5 border-r hover:bg-zinc-100 dark:border-zinc-500 dark:hover:bg-zinc-600 text-md h-full
              ${fontSize === 'normal' ? 'bg-zinc-100 dark:bg-zinc-500' : ''}`}>
              Aa
            </button>
          </li>
          <li>
            <button
              onClick={handleChangeToLarge}
              className={`px-3 border-r hover:bg-zinc-100 dark:border-zinc-500 dark:hover:bg-zinc-600 text-lg h-full
              ${fontSize === 'large' ? 'bg-zinc-100 dark:bg-zinc-500' : ''}`}>
              Aa
            </button>
          </li>
          <li>
            <button
              onClick={handleChangeToExtraLarge}
              className={`px-3 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-600 text-xl h-full
              ${fontSize === 'xlarge' ? 'bg-zinc-100 dark:bg-zinc-500' : ''}`}>
              Aa
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
