/** @jsx jsx */
import { jsx } from '@emotion/core'
import { ComponentProps, FC } from 'react'
import { Route as RouterRoute, Redirect } from 'react-router-dom'
import { useAuth } from 'shared/contexts/AuthContext'
import { ErrorBoundary } from 'shared/components/ErrorBoundary'
import { defaultLoggedInRoute, defaultLoggedOutRoute } from 'routes'

const ErrorBoundaryWrappedRoute: FC<ComponentProps<typeof RouterRoute>> = ({
  children,
  ...props
}) => (
  <RouterRoute {...props}>
    <ErrorBoundary>{children}</ErrorBoundary>
  </RouterRoute>
)

const AlwaysVisibleRoute: FC<ComponentProps<typeof RouterRoute>> = props => (
  <ErrorBoundaryWrappedRoute {...props} />
)

const VisibleWhenLoggedOutRoute: FC<ComponentProps<typeof RouterRoute>> = props => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? (
    <Redirect to={defaultLoggedInRoute} />
  ) : (
    <ErrorBoundaryWrappedRoute {...props} />
  )
}

const VisibleWhenLoggedInRoute: FC<ComponentProps<typeof RouterRoute>> = props => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? (
    <ErrorBoundaryWrappedRoute {...props} />
  ) : (
    <Redirect to={defaultLoggedOutRoute} />
  )
}

type RouteVisibility =
  | 'always' // Accessible to everyone
  | 'loggedIn' // Only accessible to authenticated users
  | 'loggedOut' // Only accessible to un-authenticated users

interface RouteProps extends ComponentProps<typeof RouterRoute> {
  visibility?: RouteVisibility
}

export const Route: FC<RouteProps> = ({ visibility = 'loggedIn', ...props }) => {
  switch (visibility) {
    case 'always': {
      return <AlwaysVisibleRoute {...props} />
    }
    case 'loggedOut': {
      return <VisibleWhenLoggedOutRoute {...props} />
    }
    case 'loggedIn':
    default: {
      return <VisibleWhenLoggedInRoute {...props} />
    }
  }
}
