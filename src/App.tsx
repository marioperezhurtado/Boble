import { Switch, Route } from 'wouter'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AuthRoute from './components/AuthRoute/AuthRoute'

import Home from './pages/Home/Home'
import Chat from './pages/Chat/Chat'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import PageNotFound from './pages/PageNotFound/PageNotFound'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-200 text-zinc-700">
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/chat">
          <ProtectedRoute>
            <Chat userId="" />
          </ProtectedRoute>
        </Route>
        <Route path="/chat/:userId">
          {(params) => (
            <ProtectedRoute>
              <Chat userId={params.userId} />
            </ProtectedRoute>
          )}
        </Route>
        <Route path="/login">
          <AuthRoute>
            <Login />
          </AuthRoute>
        </Route>
        <Route path="/signup">
          <AuthRoute>
            <Signup />
          </AuthRoute>
        </Route>
        <Route path="/:rest*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  )
}
