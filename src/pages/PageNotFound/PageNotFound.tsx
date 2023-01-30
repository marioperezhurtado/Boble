import { Link } from 'wouter'
import { useTranslation } from 'react-i18next'

import Header from '@/layout/Header/Header'

export default function PageNotFound() {
  const { t } = useTranslation('global')
  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 text-center bg-zinc-100 dark:bg-zinc-800">
        <h1 className="text-3xl font-bold">{t('page-not-found.title')}</h1>
        <h2 className="mt-10 text-xl">{t('page-not-found.description')}</h2>
        <p className="mt-3">{t('page-not-found.recommendation')}</p>
        <Link to="/">
          <button className="px-3 py-1.5 mt-5 rounded-md bg-cyan-700 text-cyan-50 shadow-md">
            {t('page-not-found.back')}
          </button>
        </Link>
      </div>
    </>
  )
}
