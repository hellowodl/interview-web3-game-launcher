import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
import { WalletProvider } from './store/wallet/context'
import { CssVarsProvider } from '@mui/joy'
import { getInitColorSchemeScript } from '@mui/joy/styles'
import QueryClientProvider from './core/QueryClientProvider'
import { GamesProvider } from './store/games/context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {getInitColorSchemeScript({ defaultMode: 'dark' })}

    <CssVarsProvider defaultMode="dark">
      <WalletProvider>
        <GamesProvider>
          <QueryClientProvider>
            <App />
          </QueryClientProvider>
        </GamesProvider>
      </WalletProvider>
    </CssVarsProvider>
  </React.StrictMode>
)
