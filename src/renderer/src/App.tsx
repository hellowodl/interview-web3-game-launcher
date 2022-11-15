import { Toaster } from 'react-hot-toast'

import WalletModal from './components/WalletModal'
import { TrophiesProvider } from './store/trophies/context'
import Games from './views/Games'
import { useWallet } from './store/wallet/context'

function App(): JSX.Element {
  const walletStore = useWallet()

  return (
    <TrophiesProvider wallet={walletStore}>
      <Toaster />
      <Games />
      <WalletModal />
    </TrophiesProvider>
  )
}

export default App
