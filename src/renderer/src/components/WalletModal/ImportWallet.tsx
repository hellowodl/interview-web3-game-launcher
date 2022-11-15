/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useImperativeHandle, forwardRef } from 'react'

import {
  Modal,
  ModalDialog,
  Typography,
  Stack,
  TextField,
  Button
} from '@mui/joy'

import { IWalletModalAPI } from '.'
import { observer } from 'mobx-react-lite'
import { useWallet } from '@renderer/store/wallet/context'
import { useMutation } from '@tanstack/react-query'

export interface IImportWalletModalHandlers {
  open: () => void
}

interface IImportWallet {
  walletModalApi: IWalletModalAPI
}

const ImportWallet = forwardRef<IImportWalletModalHandlers, IImportWallet>(
  ({ walletModalApi }, ref) => {
    const walletStore = useWallet()
    const [open, setOpen] = useState(false)
    const [password, setPassword] = useState('')
    const [privateKey, setPrivateKey] = useState('')

    useImperativeHandle(ref, () => ({
      open() {
        setOpen(true)
      }
    }))

    const close = () => {
      setOpen(false)

      walletModalApi.openSelectModal()
    }

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value)
    }

    const onPrivateKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPrivateKey(event.target.value)
    }

    const importWallet = async () => {
      if (!password || !privateKey) return

      return walletStore.importWallet(privateKey, password)
    }

    const { isLoading, mutate: importWalletMutation } = useMutation({
      mutationFn: importWallet,
      onSuccess: () => {
        setTimeout(() => console.log(walletStore.address), 1000)
        setOpen(false)
      }
    })

    return (
      <Modal open={open} onClose={close}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg'
          }}
        >
          <Typography
            id="basic-modal-dialog-title"
            component="h2"
            level="inherit"
            fontSize="1.25em"
            mb="0.25em"
          >
            Create Wallet
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            mt={0.5}
            mb={2}
            textColor="text.tertiary"
          >
            Fill in your private key and a password to import them into the
            launcher
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <Stack spacing={2}>
              <TextField
                label="Private Key"
                autoFocus
                required
                type="password"
                onChange={onPrivateKeyChange}
              />
              <TextField
                label="Password"
                autoFocus
                required
                type="password"
                onChange={onPasswordChange}
              />
              <Button
                type="submit"
                onClick={() => importWalletMutation()}
                loading={isLoading}
                variant="outlined"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    )
  }
)

ImportWallet.displayName = 'ImportWallet'

export default observer(ImportWallet)
