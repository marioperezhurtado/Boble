import { Switch, Route } from 'wouter'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AuthRoute from './components/AuthRoute/AuthRoute'

import Home from './pages/Home/Home'
import Chat from './pages/Chat/Chat'
import Account from './pages/Account/Account'
import Invite from './pages/Invite/Invite'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import PageNotFound from './pages/PageNotFound/PageNotFound'

export default function App() {
  return (
    <div className="select-none text-zinc-700 dark:text-zinc-200">
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
        <Route path="/account">
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        </Route>
        <Route path="/invite/:userId">
          {(params) => (
            <ProtectedRoute>
              <Invite userId={params.userId} />
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
