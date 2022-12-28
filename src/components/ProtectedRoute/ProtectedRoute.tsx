import { Redirect } from 'wouter'
import { useAuth } from '../../contexts/AuthContext'

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { currentUser } = useAuth()

  if (currentUser === undefined) return <Redirect to="/login" />

  return <>{children}</>
}
