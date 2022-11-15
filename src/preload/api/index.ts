import wallet from './wallet'
import games from './games'
import trophies from './trophies'

const api = {
  wallet,
  games,
  trophies
}

export default api

export type API = typeof api
