import type { Game } from '@equal-games/game-scanner'
import store from '../../store'

export interface ITrophy {
  game: Game
  owner: string
  tokenId: string
}

const setTrophies = (trophies: ITrophy[]) => {
  return store.set('trophies', trophies)
}

const getTrophies = (): ITrophy[] => {
  return (store.get('trophies') as ITrophy[]) || []
}

export default {
  setTrophies,
  getTrophies
}
