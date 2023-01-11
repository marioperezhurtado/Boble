import { Link } from 'wouter'
import { useTranslation } from 'react-i18next'

import BobleIcon from '../../assets/BobleIcon'
import ToggleDarkMode from '../../layout/ToggleDarkMode/ToggleDarkMode'
import ChangeLanguage from '../../layout/ChangeLanguage/ChangeLanguage'

export default function Home() {
  const { t } = useTranslation('global')

  return (
    <main className="min-h-screen text-center bg-zinc-50 dark:bg-zinc-800">
      <div className="flex items-center gap-1 pt-16 mx-auto w-fit">
        <BobleIcon />
        <h1 className="text-3xl font-bold">BOBLE</h1>
      </div>

      <p className="mt-5 text-lg">{t('home.description')}</p>
      <div className="flex gap-2 mx-auto mt-5 w-fit">
        <a
          href="https://github.com/marioperezhurtado/Boble"
          target="_blank"
          rel="noreferrer">
          <button className="bg-white border px-3 py-1.5 rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600">
            {t('home.about')}
          </button>
        </a>
        <Link to="/chat">
          <button className="bg-cyan-700 text-cyan-50 px-3 py-1.5 rounded-md shadow-md">
            {t('home.start')}
          </button>
        </Link>
      </div>
      <div className="m-10 mx-auto w-fit md:mt-20 flex gap-2">
        <ToggleDarkMode />
        <ChangeLanguage />
      </div>
    </main>
  )
}
