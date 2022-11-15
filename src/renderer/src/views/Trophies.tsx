/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Grid } from '@mui/joy'
import PageTitle from '@renderer/components/PageTitle'
import Trophy from '@renderer/components/Trophy'
import { useTrophies } from '@renderer/store/trophies/context'
import { observer } from 'mobx-react-lite'

const Trophies = observer(() => {
  const trophiesStore = useTrophies()

  return (
    <>
      <PageTitle>Trophies</PageTitle>
      <Grid container spacing={2}>
        {trophiesStore.ownedTrophies.map((trophy) => (
          <>
            {/* @ts-ignore */}
            <Grid item key={trophy.game.id}>
              <Trophy name={trophy.game.name} />
            </Grid>
          </>
        ))}
      </Grid>
    </>
  )
})

export default Trophies
