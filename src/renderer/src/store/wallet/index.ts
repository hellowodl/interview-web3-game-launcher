import { providers, Wallet } from 'ethers'
import { makeAutoObservable } from 'mobx'

export enum Status {
  ERROR = 'ERROR',
  LOADING = 'LOADING',
  PENDING_CREATION = 'PENDING_CREATION',
  PENDING_DECRYPTION = 'PENDING_DECRYPTION',
  READY = 'READY'
}

class WalletStore {
  wallet: Wallet | null = null
  status: Status = Status.LOADING

  constructor() {
    makeAutoObservable(this)

    this.#setStatus(this.getStatus())
  }

  getStatus() {
    try {
      const walletExists = !!window.api.wallet.getEncryptedWallet()

      return walletExists ? Status.PENDING_DECRYPTION : Status.PENDING_CREATION
    } catch (error) {
      return Status.ERROR
    }
  }

  get address(): null | undefined | string {
    return this.wallet?.address
  }

  createWallet = async (password: string): Promise<void> => {
    try {
      this.#setStatus(Status.LOADING)
      this.#setWallet(Wallet.createRandom())

      await this.#saveWallet(password)
    } catch (error) {
      this.#setStatus(Status.ERROR)

      throw error
    }
  }

  importWallet = async (privateKey: string, password: string) => {
    try {
      this.#setStatus(Status.LOADING)
      this.#setWallet(new Wallet(privateKey))

      await this.#saveWallet(password)
    } catch (error) {
      this.#setStatus(Status.ERROR)

      throw error
    }
  }

  loadWallet = async (password: string) => {
    try {
      this.#setStatus(Status.LOADING)

      const encryptedWallet = await window.api.wallet.getEncryptedWallet()

      this.#setWallet(await Wallet.fromEncryptedJson(encryptedWallet, password))
      this.#setStatus(Status.READY)
    } catch (error) {
      this.#setStatus(Status.ERROR)

      throw error
    }
  }

  #saveWallet = async (password: string) => {
    if (!this.wallet) throw new Error('No wallet configured')

    const encryptedWallet = await this.wallet.encrypt(password)

    await window.api.wallet.setEncryptedWallet(encryptedWallet)

    this.#setStatus(Status.READY)
  }

  #setWallet(wallet: Wallet) {
    this.wallet = wallet.connect(
      new providers.JsonRpcProvider(
        'https://ethereum-goerli-rpc.allthatnode.com'
      )
    )
  }

  #setStatus(status: Status) {
    this.status = status
  }
}

export default WalletStore
