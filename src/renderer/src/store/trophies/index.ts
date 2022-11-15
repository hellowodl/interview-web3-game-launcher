import { makeAutoObservable } from 'mobx'
import { KosiumPioneer__factory } from 'hardhat-project/typechain-types'
import toast from 'react-hot-toast'

import WalletStore from '../wallet'
import type { Game } from '@equal-games/game-scanner'
import gameEvents from '@renderer/core/events/GameEvents'
import { defaultAbiCoder } from 'ethers/lib/utils'

interface ITrophy {
  game: Game
  owner: string
  tokenId: string
}

class TrophiesStore {
  wallet: WalletStore
  trophies: ITrophy[] = []

  constructor(wallet: WalletStore) {
    this.wallet = wallet

    makeAutoObservable(this)

    this.trophies = this.getTrophies() as ITrophy[]

    gameEvents.addEventListener('game-started', (event) => {
      this.onGameStarted(event.detail)
    })
  }

  onGameStarted = async (game: Game) => {
    if (this.contract) {
      const isEligible = this.isEligible(game)

      if (!isEligible) return

      const tx = await this.contract.mintPioneer(1)
      const receipt = await toast.promise(tx.wait(), {
        loading: 'Minting trophy...',
        success: 'Successfuly minted a trophy :D',
        error: 'Failed to mint a trophy :('
      })

      const tokenId = defaultAbiCoder
        .decode(['uint256'], receipt.logs[0].topics[3])[0]
        .toString()
      const owner = receipt.from

      const trophy = {
        game,
        owner,
        tokenId
      }

      this.trophies.push(trophy)

      this.saveTrophies()
    }
  }

  isEligible = (game: Game) => {
    const user = this.wallet.address

    return !this.trophies.find((trophy) => {
      const isOwner = trophy.owner === user
      const isGame = trophy.game.id === game.id

      return isOwner && isGame
    })
  }

  get contract() {
    if (!this.wallet.wallet) return null

    const contract = KosiumPioneer__factory.connect(
      '0x03A3ae807AD2eB94fC11786Eea8d4f2C7395486B',
      this.wallet.wallet
    )
    return contract
  }

  saveTrophies() {
    window.api.trophies.setTrophies(JSON.parse(JSON.stringify(this.trophies)))
  }

  getTrophies() {
    const data = window.api.trophies.getTrophies()

    return data || []
  }
}

export default TrophiesStore
