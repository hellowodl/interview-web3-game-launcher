/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useImperativeHandle, forwardRef, useRef } from 'react'

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
import ModalForm, { IModalFormHandlers } from '../ModalForm'

interface ISelectModal {
  walletModalApi: IWalletModalAPI
}

const LoadWallet = forwardRef<IModalFormHandlers, ISelectModal>(
  ({ walletModalApi }, ref) => {
    const walletStore = useWallet()
    const formRef = useRef<typeof ModalForm>(null)
    formRef.current.close()
    useImperativeHandle(ref, () => formRef)

    const close = () => {
      if (isLoading) return

      setOpen(false)

      walletModalApi.openSelectModal()
    }

    const loadWallet = async ({ password }: { password: string }) => {
      if (!password) return

      return toast.promise(walletStore.loadWallet(password), {
        loading: 'Loading wallet...',
        success: 'Wallet loaded!',
        error: 'Failed to load wallet'
      })
    }

    const { isLoading, mutate: loadWalletMutation } = useMutation({
      mutationFn: loadWallet,
      onSuccess: () => setOpen(false),
      onError(error) {
        console.error(error)
      }
    })

    return (
      <ModalForm<'password'>
        ref={formRef}
        title="Load Wallet"
        description="Enter your password to load your wallet"
        onSubmit={loadWalletMutation}
        fields={[
          {
            key: 'password',
            label: 'Password'
          }
        ]}
        goBack={close}
        loading={isLoading}
      />
    )
  }
)

LoadWallet.displayName = 'LoadWallet'

export default observer(LoadWallet)
