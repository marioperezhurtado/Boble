import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useUserConfig } from '@/contexts/UserConfigContext'
import useOnClickOutside from '@/hooks/useOnClickOutside'

import FontSizeIcon from '@/assets/FontSizeIcon'

export default function ChangeFontSize() {
  const { t } = useTranslation('global')
  const { fontSize, changeFontSize } = useUserConfig()
  const ref = useRef<HTMLDivElement>(null)
  const [optionsOpen, setOptionsOpen] = useState(false)

  useOnClickOutside({ ref, handler: () => setOptionsOpen(false) })

  const handleChangeToNormal = () => {
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
        title={t('font-size.title')}
        onClick={toggleOptionsOpen}
        className={`bg-white border rounded-md shadow-md w-fit lg:mx-0 hover:bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 dark:hover:bg-zinc-600 p-2 ${
          optionsOpen ? 'shadow-none' : ''
        }`}>
        <FontSizeIcon />
      </button>
      {optionsOpen && (
        <ul className="absolute top-0 z-10 flex overflow-hidden font-semibold bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600">
          <li>
            <button
              onClick={handleChangeToNormal}
              title={t('font-size.normal')}
              className={`px-3 py-1.5 border-r hover:bg-zinc-100 dark:border-zinc-500 dark:hover:bg-zinc-600 text-md h-full
              ${fontSize === 'normal' ? 'bg-zinc-100 dark:bg-zinc-500' : ''}`}>
              Aa
            </button>
          </li>
          <li>
            <button
              onClick={handleChangeToLarge}
              title={t('font-size.large')}
              className={`px-3 border-r hover:bg-zinc-100 dark:border-zinc-500 dark:hover:bg-zinc-600 text-lg h-full
              ${fontSize === 'large' ? 'bg-zinc-100 dark:bg-zinc-500' : ''}`}>
              Aa
            </button>
          </li>
          <li>
            <button
              onClick={handleChangeToExtraLarge}
              title={t('font-size.extra-large')}
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
