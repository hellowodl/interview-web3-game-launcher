import gameScanner from '@equal-games/game-scanner'

const getGames = () => {
  return gameScanner.steam.games().filter((val) => val.state.installed)
}

const startGame = (game: gameScanner.Game) => {
  gameScanner.manager.launch_game({ ...game })
}

export default {
  getGames,
  startGame
}
