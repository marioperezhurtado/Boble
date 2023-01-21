import { Link } from 'wouter'
import { useTranslation } from 'react-i18next'

import Bubbles from '../../layout/Bubbles/Bubbles'
import ToggleDarkMode from '../../layout/ToggleDarkMode/ToggleDarkMode'
import ChangeLanguage from '../../layout/ChangeLanguage/ChangeLanguage'
import ChattingIcon from '../../assets/ChattingIcon'
import ImagesIcon from '../../assets/ImagesIcon'
import CustomizeIcon from '../../assets/CustomizeIcon'
import SecureIcon from '../../assets/SecureIcon'
import FastIcon from '../../assets/FastIcon'

export default function Home() {
  const { t } = useTranslation('global')

  return (
    <main className="min-h-screen px-4 md:px-12 bg-zinc-50 dark:bg-zinc-800">
      <div className="flex max-w-screen-lg gap-4 pt-10 mx-auto sm:pt-16">
        <Bubbles />
        <div>
          <h1 className="mb-2 text-3xl font-bold">BOBLE</h1>
          <h2 className="text-xl md:text-3xl">{t('home.description')}</h2>
          <div className="flex flex-wrap mt-5 gap-x-2 gap-y-4 w-fit">
            <Link to="/chat">
              <button className="bg-cyan-700 text-cyan-50 px-3 py-1.5 rounded-md shadow-md">
                {t('home.start')}
              </button>
            </Link>
            <a
              href="https://github.com/marioperezhurtado/Boble"
              target="_blank"
              rel="noreferrer">
              <button className="bg-white border px-3 py-1.5 rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600">
                {t('home.about')}
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mx-auto mt-5 sm:mt-10 w-fit">
        <ToggleDarkMode />
        <ChangeLanguage />
      </div>
      <section className="grid max-w-screen-lg gap-4 py-5 mx-auto sm:py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600">
          <ChattingIcon />
          <p className="pt-2 mb-2 text-lg">
            {t('home.overview.chat.title')}
            <span className="font-semibold">
              {t('home.overview.chat.bold')}
            </span>
          </p>
          <p>{t('home.overview.chat.description')}</p>
        </div>
        <div className="p-4 bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600">
          <ImagesIcon />
          <p className="pt-2 mb-2 text-lg">
            {t('home.overview.share.title')}
            <span className="font-semibold">
              {t('home.overview.share.bold')}
            </span>
            {t('home.overview.share.title2')}
          </p>
          <p>{t('home.overview.share.description')}</p>
        </div>
        <div className="p-4 bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600">
          <CustomizeIcon />
          <p className="pt-2 mb-2 text-lg">
            <span className="font-semibold">
              {t('home.overview.customize.bold')}
            </span>
            {t('home.overview.customize.title')}
          </p>
          <p>{t('home.overview.customize.description')}</p>
        </div>
        <div className="p-4 bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600">
          <SecureIcon />
          <p className="pt-2 mb-2 text-lg">
            {t('home.overview.secure.title')}
            <span className="font-semibold">
              {t('home.overview.secure.bold')}
            </span>
          </p>
          <p>{t('home.overview.secure.description')}</p>
        </div>
        <div className="p-4 bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600">
          <FastIcon />
          <p className="pt-2 mb-2 text-lg">
            {t('home.overview.fast.title')}
            <span className="font-semibold">
              {t('home.overview.fast.bold')}
            </span>
          </p>
          <p>{t('home.overview.fast.description')}</p>
        </div>
      </section>
    </main>
  )
}
