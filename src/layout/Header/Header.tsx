import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'wouter'

export default function Header() {
  const { currentUser, signOut } = useAuth()

  const { mutate: handleSignOut, isLoading } = useMutation(signOut)

  return (
    <header className="fixed z-20 w-full px-4 py-3 md:px-8 lg:px-12 bg-cyan-900 text-cyan-50">
      <div className="flex justify-between mx-auto max-w-screen-2xl">
        <Link to="/chat">
          <h1 className="text-xl font-bold cursor-pointer">BOBLE</h1>
        </Link>
        {currentUser && (
          <div className="flex items-center gap-5 ml-auto text-sm">
            <Link to="/profile">
              <button className="flex items-center gap-1 cursor-pointer">
                <span className="hidden md:block">{currentUser.email}</span>
                <img
                  src="/account.svg"
                  alt="account"
                  className="w-5 h-5 md:w-4 md:h-4"
                />
              </button>
            </Link>

            <button
              onClick={() => handleSignOut()}
              disabled={isLoading}
              className="flex items-center gap-1 cursor-pointer">
              <span className="hidden md:block">Logout</span>
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
