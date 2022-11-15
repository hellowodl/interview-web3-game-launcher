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
import toast from 'react-hot-toast'

export interface ICreateWalletModalHandlers {
  open: () => void
}

interface ISelectModal {
  walletModalApi: IWalletModalAPI
}

const CreateWallet = forwardRef<ICreateWalletModalHandlers, ISelectModal>(
  ({ walletModalApi }, ref) => {
    const walletStore = useWallet()
    const [open, setOpen] = useState(false)
    const [password, setPassword] = useState('')

    useImperativeHandle(ref, () => ({
      open() {
        setOpen(true)
      }
    }))

    const close = () => {
      if (isLoading) return

      setOpen(false)

      walletModalApi.openSelectModal()
    }

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value)
    }

    const createWallet = async () => {
      if (!password) return

      return toast.promise(walletStore.createWallet(password), {
        loading: 'Creating wallet...',
        success: 'Wallet created!',
        error: 'Failed to create wallet'
      })
    }

    const { isLoading, mutate: createWalletMutation } = useMutation({
      mutationFn: createWallet,
      onSuccess: () => setOpen(false),
      onError(error) {
        console.error(error)
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
            Fill in the password for wallet encryption
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <Stack spacing={2}>
              <TextField
                label="Password"
                autoFocus
                required
                type="password"
                onChange={onPasswordChange}
              />
              <Button
                type="submit"
                onClick={() => createWalletMutation()}
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

CreateWallet.displayName = 'CreateWallet'

export default observer(CreateWallet)
