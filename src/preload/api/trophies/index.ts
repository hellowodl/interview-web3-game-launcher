import type { Game } from '@equal-games/game-scanner'
import store from '../../store'

export interface ITrophy {
  game: Game
  owner: string
  tokenId: string
}

export type Trophies = ITrophy[]

const setTrophies = (trophies: Trophies) => {
  return store.set('trophies', trophies)
}

const getTrophies = () => {
  return store.get('trophies') as string
}

export default {
  setTrophies,
  getTrophies
}
