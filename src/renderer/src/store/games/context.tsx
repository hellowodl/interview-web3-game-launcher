import { createContext, PropsWithChildren } from 'react'
import { useContext } from 'react'

import GamesStore from '.'

let store: GamesStore | undefined

const GamesContext = createContext<GamesStore | null>(null)

export const GamesProvider = ({ children }: PropsWithChildren) => {
  if (!store) store = new GamesStore()

  return <GamesContext.Provider value={store}>{children}</GamesContext.Provider>
}

export const useGames = () => {
  const store = useContext(GamesContext)

  if (!store) {
    throw new Error('useWallet must be used within a WalletProvider')
  }

  return store
}
