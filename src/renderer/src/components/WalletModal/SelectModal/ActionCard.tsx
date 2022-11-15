import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Typography,
  IconButton as IconButtonJoy,
  styled,
  Divider
} from '@mui/joy'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface IActionCard {
  title: string
  description: string
  icon: IconDefinition
  disabled?: boolean
  onClick?: () => void | undefined
}

const ActionCard = ({
  title,
  description,
  icon,
  disabled = false,
  onClick = () => undefined
}: IActionCard) => (
  <Card
    row
    variant="outlined"
    sx={{
      height: '60px',
      '&:hover': !disabled
        ? {
            boxShadow: 'md',
            borderColor: 'neutral.outlinedHoverBorder',
            cursor: 'pointer'
          }
        : {}
    }}
    onClick={onClick}
  >
    <CardContent>
      <Typography level="h2" fontSize="lg" id="card-title" mb={0.5}>
        {title}
      </Typography>
      <Typography level="body2" fontSize="sm" id="card-description">
        {description}
      </Typography>
    </CardContent>
    <Divider />
    <CardOverflow sx={{ textAlign: 'center' }}>
      <AspectRatio variant="plain" ratio="1" sx={{ width: 92 }}>
        <IconButton
          variant="outlined"
          size="lg"
          color="neutral"
          disabled={disabled}
        >
          <FontAwesomeIcon size="2x" icon={icon} />
        </IconButton>
      </AspectRatio>
    </CardOverflow>
  </Card>
)

export default ActionCard

const IconButton = styled(IconButtonJoy)`
  border-radius: 0px 12px 12px 0px;
`
