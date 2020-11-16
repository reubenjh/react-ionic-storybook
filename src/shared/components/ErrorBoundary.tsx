import React, { Component, FC } from 'react'
import { Redirect, useRouteMatch } from 'react-router-dom'
import { routes } from 'routes'

interface ErrorBoundaryProps {
  path: string
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundaryInternal extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    hasError: false,
  }

  static getDerivedStateFromError = () => {
    return { hasError: true }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-unused-vars-experimental
  componentDidCatch = (error: unknown) => {
    // TODO: log error here
  }

  render = () => {
    const { hasError } = this.state
    const { children, path } = this.props

    if (hasError) {
      return (
        <Redirect
          to={{
            pathname: routes.somethingWentWrong,
            state: { previousPath: path },
          }}
        />
      )
    }

    return children
  }
}

export const ErrorBoundary: FC = props => {
  const { path } = useRouteMatch()
  return <ErrorBoundaryInternal path={path} {...props} />
}
