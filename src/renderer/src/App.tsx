/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import WalletModal from './components/WalletModal'
import { TrophiesProvider } from './store/trophies/context'
import Games from './views/Games'
import { useWallet } from './store/wallet/context'
import { Grid } from '@mui/joy'
import Sidebar from './components/Sidebar'
import Trophies from './views/Trophies'
import Account from './views/Account'

function App(): JSX.Element {
  const walletStore = useWallet()

  return (
    <BrowserRouter>
      <TrophiesProvider wallet={walletStore}>
        <Grid container>
          {/* @ts-ignore I'm still convinced this is a bug on MUI's end */}
          <Grid item xs={1}>
            <Sidebar />
          </Grid>
          {/* @ts-ignore I'm still convinced this is a bug on MUI's end */}
          <Grid item xs={10}>
            <Routes>
              <Route path="/" element={<Games />} />
              <Route path="/trophies" element={<Trophies />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </Grid>
        </Grid>

        <WalletModal />
        <Toaster
          position="bottom-right"
          containerStyle={{
            zIndex: 1000000,
            fontFamily: '"Public Sans", var(--joy-fontFamily-fallback)'
          }}
        />
      </TrophiesProvider>
    </BrowserRouter>
  )
}

export default App
