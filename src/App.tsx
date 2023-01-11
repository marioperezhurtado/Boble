import { Switch, Route } from 'wouter'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AuthRoute from './components/AuthRoute/AuthRoute'

import useDarkTheme from './hooks/useDarkTheme'

import Home from './pages/Home/Home'
import Chat from './pages/Chat/Chat'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import PageNotFound from './pages/PageNotFound/PageNotFound'

export default function App() {
  useDarkTheme()

  return (
    <div className="select-text text-zinc-700 dark:text-zinc-200">
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/chat">
          <ProtectedRoute>
            <Chat channelId="" />
          </ProtectedRoute>
        </Route>
        <Route path="/chat/:channelId">
          {(params) => (
            <ProtectedRoute>
              <Chat channelId={params.channelId} />
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
        <Route path="/forgot-password">
          <AuthRoute>
            <ForgotPassword />
          </AuthRoute>
        </Route>
        <Route path="/reset-password">
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        </Route>
        <Route path="/:rest*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  )
}
