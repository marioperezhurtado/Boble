import { Switch, Route } from 'wouter'
import ProtectedRoute from './components/Routes/ProtectedRoute/ProtectedRoute'
import AuthRoute from './components/Routes/AuthRoute/AuthRoute'

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
    <div className="w-screen overflow-hidden select-none text-zinc-600 dark:text-zinc-200">
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/chat">
          <ProtectedRoute>
            <Chat channelId="" type="chat" />
          </ProtectedRoute>
        </Route>
        <Route path="/chats">
          <ProtectedRoute>
            <Chat channelId="" type="chat" />
          </ProtectedRoute>
        </Route>
        <Route path="/groups">
          <ProtectedRoute>
            <Chat channelId="" type="group" />
          </ProtectedRoute>
        </Route>
        <Route path="/chats/:channelId">
          {(params) => (
            <ProtectedRoute>
              <Chat channelId={params.channelId ?? ''} type="chat" />
            </ProtectedRoute>
          )}
        </Route>
        <Route path="/groups/:channelId">
          {(params) => (
            <ProtectedRoute>
              <Chat channelId={params.channelId ?? ''} type="group" />
            </ProtectedRoute>
          )}
        </Route>
        <Route path="/groups/:channelId/info">
          {(params) => (
            <ProtectedRoute>
              <Chat
                channelId={params.channelId ?? ''}
                type="group"
                info={true}
              />
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
              <Invite userId={params.userId ?? ''} />
            </ProtectedRoute>
          )}
        </Route>
        <Route path="/login/:rest*">
          {(params) => (
            <AuthRoute redirectTo={params.rest}>
              <Login />
            </AuthRoute>
          )}
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
