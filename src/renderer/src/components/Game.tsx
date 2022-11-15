import Card from '@mui/joy/Card'
import CardCover from '@mui/joy/CardCover'
import CardContent from '@mui/joy/CardContent'
import Typography from '@mui/joy/Typography'
import { styled } from '@mui/joy'

interface IGame {
  title: string
  banner: string
  onClick: () => void
}

const Game = ({ title, banner, onClick }: IGame) => (
  <CustomCard sx={{ minWidth: 300, flexGrow: 1 }} onClick={onClick}>
    <CardCover>
      <img src={banner} loading="lazy" alt="" id="banner" />
    </CardCover>
    <CardContent>
      <Typography
        level="h3"
        fontWeight="lg"
        textColor="#fff"
        mt={{ xs: 12, sm: 18 }}
      >
        {title}
      </Typography>
    </CardContent>
  </CustomCard>
)

export default Game

const CustomCard = styled(Card)`
  overflow: hidden;
  transform: scale(1);

  #banner {
    transition: transform 0.3s ease;
  }

  &:hover {
    #banner {
      transform: scale(1.1);
    }
  }
`
