import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { Link } from 'wouter'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const { t } = useTranslation('global')
  const { currentUser, signOut } = useAuth()

  const { mutate: handleSignOut, isLoading } = useMutation(signOut)

  return (
    <header className="fixed z-20 w-full px-6 md:px-8 lg:px-12 bg-cyan-900 text-cyan-50">
      <div className="flex justify-between mx-auto max-w-screen-2xl">
        <Link to="/chats">
          <div className="flex items-center gap-1 cursor-pointer py-3">
            <img src="/boble-light.svg" alt="boble logo" className="w-5 h-5" />
            <h1 className="text-xl font-semibold">BOBLE</h1>
          </div>
        </Link>
        {currentUser && (
          <div className="flex items-center gap-2 ml-auto text-sm md:gap-3">
            <Link to="/account">
              <button
                title={t('header.account')}
                className="flex items-center gap-1 p-2 rounded-md shadow-md cursor-pointer bg-cyan-700 hover:bg-cyan-600 transition md:px-3 md:py-1.5">
                <span className="hidden md:block">{currentUser.email}</span>
                <img
                  src="/account.svg"
                  alt="account"
                  className="w-5 h-5 md:w-4 md:h-4"
                />
              </button>
            </Link>

            <button
              title={t('header.logout')}
              onClick={() => handleSignOut()}
              disabled={isLoading}
              className="flex items-center gap-1 p-2 rounded-md shadow-md cursor-pointer bg-cyan-700 hover:bg-cyan-600 transition md:px-3 md:py-1.5">
              <span className="hidden md:block">{t('header.logout')}</span>
              <img
                src="/logout.svg"
                alt="logout"
                className="w-5 h-5 md:w-4 md:h-4"
              />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
