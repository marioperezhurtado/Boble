import { Route } from 'wouter'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import Header from './layout/Header/Header'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-100 text-zinc-700">
      <Header />
      <Route path="/">
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </div>
  )
}
