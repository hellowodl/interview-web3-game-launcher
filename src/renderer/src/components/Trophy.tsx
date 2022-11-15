import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Card,
  CardOverflow,
  AspectRatio,
  CardContent,
  Typography,
  Divider
} from '@mui/joy'

interface ITrophy {
  name: string
}

const Trophy = ({ name }: ITrophy) => (
  <Card row variant="outlined" sx={{ width: 300, bgcolor: 'background.body' }}>
    <CardOverflow>
      <AspectRatio ratio="1" sx={{ width: 90 }}>
        <div>
          <FontAwesomeIcon icon={faTrophy} size="3x" />
        </div>
      </AspectRatio>
    </CardOverflow>
    <CardContent sx={{ px: 2 }}>
      <Typography fontWeight="md" textColor="success.plainColor" mb={0.5}>
        {name}
      </Typography>
      <Typography level="body2">First game launch</Typography>
    </CardContent>
    <Divider />
    <CardOverflow
      variant="soft"
      color="warning"
      sx={{
        px: 0.2,
        writingMode: 'vertical-rl',
        textAlign: 'center',
        fontSize: 'xs2',
        fontWeight: 'xl2',
        letterSpacing: '1px',
        textTransform: 'uppercase'
      }}
    >
      Trophy
    </CardOverflow>
  </Card>
)

export default Trophy
