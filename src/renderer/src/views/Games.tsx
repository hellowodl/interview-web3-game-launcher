import { useGames } from '@renderer/store/games/context'
import { observer } from 'mobx-react-lite'
import Box from '@mui/joy/Box'
import Game from '@renderer/components/Game'

const Games = observer(() => {
  const gamesStore = useGames()

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
      {gamesStore.games.map((game) => (
        <Game
          title={game.name}
          banner={game.banner}
          key={game.id}
          onClick={() => gamesStore.startGame(game)}
        />
      ))}
    </Box>
  )
})

export default Games
