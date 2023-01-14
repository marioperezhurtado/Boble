import { useTranslation } from 'react-i18next'
import useDarkTheme from '../../hooks/useDarkTheme'

export default function ToggleDarkMode() {
  const { t } = useTranslation('global')
  const { theme, toggleTheme } = useDarkTheme()

  if (theme === 'dark') {
    return (
      <button
        title={t('dark-mode.title')}
        onClick={toggleTheme}
        className="p-2.5 border rounded-md shadow-md lg:mx-0 w-fit bg-zinc-700 border-zinc-600 hover:bg-zinc-600">
        <img src="/dark.svg" alt="Toggle light mode" className="w-4 h-4" />
      </button>
    )
  }

  return (
    <button
      title={t('dark-mode.title')}
      onClick={toggleTheme}
      className="p-2 bg-white border rounded-md shadow-md w-fit lg:mx-0 hover:bg-zinc-100">
      <img src="/light.svg" alt="Toggle light mode" className="w-5 h-5" />
    </button>
  )
}
