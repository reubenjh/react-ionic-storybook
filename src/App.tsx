/** @jsx jsx */
import { jsx } from '@emotion/core'
import { lazy, Suspense } from 'react'
import { Redirect } from 'react-router-dom'
import { Route } from 'shared/components/Route'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { routes, defaultLoggedOutRoute } from 'routes'

// Core CSS for platform specific style
import '@ionic/react/css/core.css'

// CSS reset
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'

// Custom css reset
import 'theme/reset.css'

const LoginPage = lazy(async () => import('features/login/Login'))
const SignUpPage = lazy(async () => import('features/sign_up/SignUp'))
const NotFoundPage = lazy(async () => import('features/not_found/NotFound'))
const SomethingWentWrongPage = lazy(
  async () => import('features/something_went_wrong/SomethingWentWrong')
)
const DashboardPage = lazy(async () => import('features/dashboard/Dashboard'))

const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Suspense fallback={'loading...'}>
          <IonRouterOutlet>
            {/* // Always visible routes */}
            <Route visibility="always" path={routes.somethingWentWrong}>
              <SomethingWentWrongPage />
            </Route>
            {/* // Only visible when logged out routes */}
            <Route visibility="loggedOut" path={routes.login}>
              <LoginPage />
            </Route>
            <Route visibility="loggedOut" path={routes.signUp}>
              <SignUpPage />
            </Route>
            {/* // Only visible when logged in routes */}
            <Route path={routes.notFound}>
              <NotFoundPage />
            </Route>
            <Route path={routes.dashboard}>
              <DashboardPage />
            </Route>
            {/* // Redirects */}
            <Redirect from={routes.root} to={defaultLoggedOutRoute} exact={true} />
            <Redirect to={routes.notFound} />
          </IonRouterOutlet>
        </Suspense>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
