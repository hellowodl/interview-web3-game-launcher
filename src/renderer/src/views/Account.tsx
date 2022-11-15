// create an MUI Joy info card component & page, that displays the address from the Wallet store, and a button to copy the address to the clipboard

import styled from '@emotion/styled'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  IconButton as IconButtonJoy,
  Typography
} from '@mui/joy'
import PageTitle from '@renderer/components/PageTitle'
import { useWallet } from '@renderer/store/wallet/context'
import { observer } from 'mobx-react-lite'

const Account = observer(() => {
  const walletStore = useWallet()
  const { address } = walletStore

  const copy = () => {
    navigator.clipboard.writeText(address || '')
  }

  return (
    <>
      <PageTitle>Account</PageTitle>
      <Card row variant="outlined">
        <CardContent>
          <Typography level="h5" component="h2">
            Account
          </Typography>
          <Typography level="body2" component="p">
            {address}
          </Typography>
        </CardContent>
        <Divider />
        <CardOverflow sx={{ textAlign: 'center' }}>
          <AspectRatio
            variant="plain"
            ratio="1"
            sx={{ width: 92 }}
            onClick={copy}
          >
            <IconButton variant="outlined" size="lg" color="neutral">
              <FontAwesomeIcon size="2x" icon={faCopy} />
            </IconButton>
          </AspectRatio>
        </CardOverflow>
      </Card>
    </>
  )
})

const IconButton = styled(IconButtonJoy)`
  border-radius: 0px 12px 12px 0px;
`
export default Account
