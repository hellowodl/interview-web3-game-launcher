import { useEffect, useRef } from 'react'
import SelectModal, { ISelectModalHandlers } from './SelectModal'
import { observer } from 'mobx-react-lite'
import CreateWallet, { ICreateWalletModalHandlers } from './CreateWallet'
import LoadWallet, { ILoadWalletModalHandlers } from './LoadWallet'
import ImportWallet, { IImportWalletModalHandlers } from './ImportWallet'
import ModalForm from '../ModalForm'

export interface IWalletModalAPI {
  openSelectModal: () => void
  openImportWalletModal: () => void
  openCreateWalletModal: () => void
  openLoadWalletModal: () => void
}

const WalletModal = observer(() => {
  const selectModal = useRef<ISelectModalHandlers>(null)
  const importWalletModal = useRef<IImportWalletModalHandlers>(null)
  const createWalletModal = useRef<ICreateWalletModalHandlers>(null)
  const loadWalletModal = useRef<ILoadWalletModalHandlers>(null)

  useEffect(() => {
    selectModal.current?.open()
  })

  const walletModalApi: IWalletModalAPI = {
    openSelectModal: () => selectModal.current?.open() || null,
    openImportWalletModal: () => importWalletModal.current?.open() || null,
    openCreateWalletModal: () => createWalletModal.current?.open() || null,
    openLoadWalletModal: () => loadWalletModal.current?.open() || null
  }

  return (
    <>
      <ImportWallet walletModalApi={walletModalApi} ref={importWalletModal} />
      <SelectModal walletModalApi={walletModalApi} ref={selectModal} />
      <CreateWallet walletModalApi={walletModalApi} ref={createWalletModal} />
      <LoadWallet walletModalApi={walletModalApi} ref={loadWalletModal} />
    </>
  )
})

export default WalletModal
