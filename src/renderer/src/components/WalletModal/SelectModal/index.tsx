/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useImperativeHandle, forwardRef } from 'react'

import { Modal, ModalDialog, Grid } from '@mui/joy'
import ActionCard from './ActionCard'
import {
  faFileImport,
  faHardDrive,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import { useWallet } from '@renderer/store/wallet/context'
import { observer } from 'mobx-react-lite'
import { Status } from '@renderer/store/wallet'
import { IWalletModalAPI } from '..'

export interface ISelectModalHandlers {
  open: () => void
}

interface ISelectModal {
  walletModalApi: IWalletModalAPI
}

const SelectModal = forwardRef<ISelectModalHandlers, ISelectModal>(
  ({ walletModalApi }, ref) => {
    const walletStore = useWallet()

    const [open, setOpen] = useState(false)

    const canClose = walletStore.status === Status.READY
    const canImportWallet = walletStore.status === Status.PENDING_DECRYPTION

    useImperativeHandle(ref, () => ({
      open() {
        setOpen(true)
      }
    }))

    const close = () => {
      if (!canClose) return

      setOpen(false)
    }

    const openModal = (modal: keyof IWalletModalAPI) => {
      setOpen(false)
      walletModalApi[modal]()
    }

    return (
      <Modal open={open} onClose={close}>
        <ModalDialog
          sx={{
            maxWidth: 800,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg'
          }}
        >
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            {/* @ts-ignore Error not in line with MUI Joy documentation */}
            <Grid item xs={12} lg={6}>
              <ActionCard
                title="Import Wallet"
                description="Import an existing wallet's private key"
                icon={faFileImport}
                onClick={() => openModal('openImportWalletModal')}
              />
            </Grid>
            {/* @ts-ignore Error not in line with MUI Joy documentation */}
            <Grid item xs={12} lg={6}>
              <ActionCard
                title="Create Wallet"
                description="Generate a new wallet"
                icon={faPlus}
                onClick={() => openModal('openCreateWalletModal')}
              />
            </Grid>
            {/* @ts-ignore Error not in line with MUI Joy documentation */}
            <Grid item xs={12}>
              <ActionCard
                title="Use existing wallet"
                description="Use previously imported/created wallet"
                icon={faHardDrive}
                disabled={!canImportWallet}
                onClick={() => openModal('openLoadWalletModal')}
              />
            </Grid>
          </Grid>
        </ModalDialog>
      </Modal>
    )
  }
)

SelectModal.displayName = 'SelectModal'

export default observer(SelectModal)
