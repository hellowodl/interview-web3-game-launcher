import store from '../../store'

const setEncryptedWallet = (encryptedWallet: string) => {
  return store.set('wallet', encryptedWallet)
}

const getEncryptedWallet = () => {
  return store.get('wallet') as string
}

export default {
  getEncryptedWallet,
  setEncryptedWallet
}
