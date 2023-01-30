import { Redirect, useLocation } from 'wouter'
import { useAuth } from '@/contexts/AuthContext'

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { currentUser } = useAuth()

  const [location] = useLocation()

  const url = `/login${location}`

  if (!currentUser) return <Redirect to={url} />

  return <>{children}</>
}
