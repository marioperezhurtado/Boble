import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'wouter'

export default function Header() {
  const { currentUser, signOut } = useAuth()

  const { mutate: handleSignOut, isLoading } = useMutation({
    mutationFn: signOut
  })

  return (
    <header className="px-12 py-3 bg-cyan-900 text-cyan-50">
      <div className="flex justify-between mx-auto max-w-screen-2xl">
        <Link to="/">
          <h1 className="text-xl cursor-pointer">BOBLE</h1>
        </Link>
        {currentUser && (
          <div className="flex items-center gap-5 ml-auto text-sm">
            <Link to="/profile">
              <button className="flex items-center gap-1">
                <p className="cursor-pointer">{currentUser.email}</p>
                <img src="/account.svg" alt="account" className="w-4 h-4" />
              </button>
            </Link>

            <button
              onClick={() => handleSignOut()}
              disabled={isLoading}
              className="flex items-center gap-1">
              <p className="cursor-pointer">Logout</p>
              <img src="/logout.svg" alt="logout" className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
