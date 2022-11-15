import { createContext, PropsWithChildren } from 'react'
import { useContext } from 'react'
import type WalletStore from '../wallet'
import TrophiesStore from './'

let store: TrophiesStore | undefined

const TrophiesContext = createContext<TrophiesStore | null>(null)

interface ITrophiesProvider {
  wallet: WalletStore
}

export const TrophiesProvider = ({
  children,
  wallet
}: PropsWithChildren<ITrophiesProvider>) => {
  if (!store) store = new TrophiesStore(wallet)

  return (
    <TrophiesContext.Provider value={store}>
      {children}
    </TrophiesContext.Provider>
  )
}

export const useTrophies = () => {
  const store = useContext(TrophiesContext)

  if (!store) {
    throw new Error('useWallet must be used within a WalletProvider')
  }

  return store
}
