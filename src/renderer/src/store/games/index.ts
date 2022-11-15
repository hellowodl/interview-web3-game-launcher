import { makeAutoObservable } from 'mobx'
import type { Game } from '@equal-games/game-scanner'
import gameEvents from '@renderer/core/events/GameEvents'

type ExtendedGame = Game & {
  banner: string
}

class WalletStore {
  private _games: Game[] = []

  constructor() {
    makeAutoObservable(this)

    this.loadGames()
  }

  loadGames = () => {
    this._games = window.api.games.getGames()
  }

  startGame = (game: ExtendedGame) => {
    const unproxiedGame = JSON.parse(JSON.stringify(game)) as ExtendedGame

    gameEvents.dispatchEvent(
      new CustomEvent('game-started', { detail: unproxiedGame })
    )

    window.api.games.startGame(unproxiedGame)
  }

  get games(): ExtendedGame[] {
    return this._games.map((game) => ({
      ...game,
      banner: `https://steamcdn-a.akamaihd.net/steam/apps/${game.id}/header.jpg`
    }))
  }
}

export default WalletStore
