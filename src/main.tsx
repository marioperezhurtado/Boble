import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'
import { UserConfigProvider } from './contexts/UserConfigContext'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'

import global_en from './translations/en/global.json'
import global_es from './translations/es/global.json'
import global_fr from './translations/fr/global.json'

const queryClient = new QueryClient()

await i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: { global: global_en },
    es: { global: global_es },
    fr: { global: global_fr }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <I18nextProvider i18n={i18next}>
        <UserConfigProvider>
          <App />
        </UserConfigProvider>
      </I18nextProvider>
    </AuthProvider>
  </QueryClientProvider>
  // </React.StrictMode>
)
