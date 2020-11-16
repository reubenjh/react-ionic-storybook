import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import { ThemeProvider } from 'theme/ThemeContext'
import 'i18n/i18nInstance'
import { I18nProvider } from 'i18n/I18nContext'
import { AuthProvider } from 'shared/contexts/AuthContext'

ReactDOM.render(
  <ThemeProvider>
    <I18nProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </I18nProvider>
  </ThemeProvider>,
  document.getElementById('root')
)
