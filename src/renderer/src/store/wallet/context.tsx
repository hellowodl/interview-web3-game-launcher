import { createContext, PropsWithChildren } from 'react'
import { useContext } from 'react'

import WalletStore from './'

let store: WalletStore | undefined

const WalletContext = createContext<WalletStore | null>(null)

export const WalletProvider = ({ children }: PropsWithChildren) => {
  if (!store) store = new WalletStore()

  return (
    <WalletContext.Provider value={store}>{children}</WalletContext.Provider>
  )
}

export const useWallet = () => {
  const store = useContext(WalletContext)

  if (!store) {
    throw new Error('useWallet must be used within a WalletProvider')
  }

  return store
}
