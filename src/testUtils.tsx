import React, { ReactElement, FC } from 'react'
import { render } from '@testing-library/react'
import { I18nContext } from 'i18n/I18nContext'
import { ThemeProvider } from 'theme/ThemeContext'
import { createMemoryHistory } from 'history'
import { MemoryRouter, Router } from 'react-router-dom'
import { DateTime } from 'luxon'

const MockRouter: FC<{ route?: string }> = ({ children, route }) => {
  if (route) {
    // Allows testing components that implement "useLocation" and "useParams"
    const history = createMemoryHistory()
    history.push(route)
    return <Router history={history}>{children}</Router>
  }

  // Default test router
  return <MemoryRouter>{children}</MemoryRouter>
}

const MockI18nProvider: FC = ({ children }) => (
  <I18nContext.Provider
    value={{
      t: (key: string) => key,
      c: (num: number) => String(num),
      d: (date: DateTime) => String(date),
      n: (num: number) => String(num),
      locale: 'en-NZ',
      setLocale: () => undefined,
      language: 'en-NZ',
      setLanguage: () => undefined,
    }}
  >
    {children}
  </I18nContext.Provider>
)

export const testRender = (component: ReactElement, options?: { route?: string }) => {
  // Deliberately not returning render result. Use 'screen' to query the DOM.
  render(component, {
    wrapper: ({ children }) => (
      <MockRouter route={options?.route}>
        <MockI18nProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </MockI18nProvider>
      </MockRouter>
    ),
  })
}

export * from '@testing-library/react'
export { testRender as render }
export { default as userEvent } from '@testing-library/user-event'
