import { Link } from 'wouter'
import { useTranslation } from 'react-i18next'

import Bubbles from '@/layout/Bubbles/Bubbles'
import ToggleDarkMode from '@/layout/ToggleDarkMode/ToggleDarkMode'
import ChangeLanguage from '@/layout/ChangeLanguage/ChangeLanguage'
import ChangeFontSize from '@/layout/ChangeFontSize/ChangeFontSize'

import ChattingIcon from '@/assets/ChattingIcon'
import ImagesIcon from '@/assets/ImagesIcon'
import CustomizeIcon from '@/assets/CustomizeIcon'
import SecureIcon from '@/assets/SecureIcon'
import FastIcon from '@/assets/FastIcon'

import './Home.css'

export default function Home() {
  const { t } = useTranslation('global')

  return (
    <main className="min-h-screen px-4 sm:px-8 md:px-12 bg-zinc-50 dark:bg-zinc-800 overflow-x-hidden">
      <div className="flex max-w-screen-lg gap-4 pt-10 mx-auto sm:pt-16 title">
        <Bubbles />
        <div>
          <h1 className="mb-2 text-3xl font-bold">BOBLE</h1>
          <h2 className="text-xl md:text-3xl">{t('home.description')}</h2>
          <div className="flex flex-wrap mt-5 gap-x-2 gap-y-4 w-fit">
            <Link to="/chats">
              <button className="bg-cyan-700 text-cyan-50 px-3 py-1.5 rounded-md shadow-md hover:bg-cyan-600">
                {t('home.start')}
              </button>
            </Link>
            <a
              href="https://github.com/marioperezhurtado/Boble"
              target="_blank"
              rel="noreferrer">
              <button className="bg-white border px-3 py-1.5 rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600 hover:bg-zinc-100">
                {t('home.about')}
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mx-auto mt-5 sm:mt-10 w-fit buttons">
        <ToggleDarkMode />
        <ChangeLanguage />
        <ChangeFontSize />
      </div>
      <ul className="grid max-w-screen-lg gap-4 py-5 mx-auto sm:py-10 sm:grid-cols-2 lg:grid-cols-3 overview">
        <li className="p-4 transition-transform bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600 -skew-x-2 -skew-y-2 hover:skew-x-0 hover:skew-y-0">
          <ChattingIcon />
          <p className="pt-2 mb-2 text-lg">
            {t('home.overview.chat.title')}
            <span className="font-semibold">
              {t('home.overview.chat.bold')}
            </span>
          </p>
          <p>{t('home.overview.chat.description')}</p>
        </li>
        <li className="p-4 transition-transform bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600 -skew-x-2 -skew-y-2 hover:skew-x-0 hover:skew-y-0">
          <ImagesIcon />
          <p className="pt-2 mb-2 text-lg">
            {t('home.overview.share.title')}
            <span className="font-semibold">
              {t('home.overview.share.bold')}
            </span>
            {t('home.overview.share.title2')}
          </p>
          <p>{t('home.overview.share.description')}</p>
        </li>
        <li className="p-4 transition-transform bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600 -skew-x-2 -skew-y-2 hover:skew-x-0 hover:skew-y-0">
          <CustomizeIcon />
          <p className="pt-2 mb-2 text-lg">
            <span className="font-semibold">
              {t('home.overview.customize.bold')}
            </span>
            {t('home.overview.customize.title')}
          </p>
          <p>{t('home.overview.customize.description')}</p>
        </li>
        <li className="p-4 transition-transform bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600 -skew-x-2 -skew-y-2 hover:skew-x-0 hover:skew-y-0">
          <SecureIcon />
          <p className="pt-2 mb-2 text-lg">
            {t('home.overview.secure.title')}
            <span className="font-semibold">
              {t('home.overview.secure.bold')}
            </span>
          </p>
          <p>{t('home.overview.secure.description')}</p>
        </li>
        <li className="p-4 transition-transform bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600 -skew-x-2 -skew-y-2 hover:skew-x-0 hover:skew-y-0">
          <FastIcon />
          <p className="pt-2 mb-2 text-lg">
            {t('home.overview.fast.title')}
            <span className="font-semibold">
              {t('home.overview.fast.bold')}
            </span>
          </p>
          <p>{t('home.overview.fast.description')}</p>
        </li>
        <li className="p-4 transition-transform bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600 -skew-x-2 -skew-y-2 hover:skew-x-0 hover:skew-y-0">
          <img src="/opensource.svg" alt="Open Source" className="w-6 h-6" />
          <p className="pt-2 mb-2 text-lg font-semibold">
            {t('home.overview.open-source.title')}
          </p>
          <p>{t('home.overview.open-source.description')}</p>
        </li>
      </ul>
      <section className="grid max-w-screen-lg gap-4 pt-5 mx-auto text-center pb-14 lg:pt-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 actions">
        <div>
          <p className="mb-5 text-xl">{t('home.ready')}</p>
          <Link to="/chat">
            <button className="bg-cyan-700 text-cyan-50 px-3 py-1.5 rounded-md shadow-md flex mx-auto gap-2 items-center hover:bg-cyan-600">
              <img src="/boble-light.svg" alt="Boble logo" className="w-5" />
              {t('home.start')}
            </button>
          </Link>
        </div>
        <div>
          <p className="mb-5 text-xl">{t('home.more-info')}</p>
          <a
            href="https://github.com/marioperezhurtado/Boble"
            target="_blank"
            rel="noreferrer">
            <button className="bg-zinc-800 text-zinc-50 border px-3 py-1.5 rounded-md shadow-md border-zinc-800 flex gap-2 items-center mx-auto dark:border-zinc-500 hover:bg-zinc-700 hover:border-zinc-700">
              <img src="/github.svg" alt="Github logo" className="w-5" />
              {t('home.details')}
            </button>
          </a>
        </div>
        <div>
          <p className="mb-5 text-xl">{t('home.questions')}</p>
          <a href="mailto:marioph10@gmail.com">
            <button className="bg-white border px-3 py-1.5 rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600 hover:bg-zinc-100">
              {t('home.contact')}
            </button>
          </a>
        </div>
      </section>
    </main>
  )
}
