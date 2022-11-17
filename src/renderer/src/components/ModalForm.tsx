/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  useState,
  useImperativeHandle,
  forwardRef,
  FormEvent,
  ForwardedRef,
  Ref,
  ReactElement
} from 'react'

import {
  Modal,
  ModalDialog,
  Typography,
  Stack,
  TextField,
  Button
} from '@mui/joy'

import { observer } from 'mobx-react-lite'

export interface IModalFormHandlers {
  open: () => void
  close: () => void
}

interface IModalForm<T extends string> {
  title: string
  description: string
  fields: {
    label: string
    key: string
  }[]
  loading: boolean
  goBack: () => void
  onSubmit: (values: Record<T, string>) => void
}

const ModalFormComponent = <T extends string>(
  { goBack, title, fields, description, onSubmit, loading }: IModalForm<T>,
  ref: ForwardedRef<IModalFormHandlers>
) => {
  const [open, setOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    open() {
      setOpen(true)
    },
    close() {
      setOpen(false)
    }
  }))

  const close = () => {
    if (loading) return

    setOpen(false)

    goBack()
  }

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = {}
    for (const index of fields.keys()) {
      const val = fields[index]

      if (!val) return

      res[val.key] = e.target[index]
    }

    onSubmit(res as Record<T, string>)
  }

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
          id="modal-form-dialog-title"
          component="h2"
          level="inherit"
          fontSize="1.25em"
          mb="0.25em"
        >
          {title}
        </Typography>
        <Typography
          id="modal-form-dialog-description"
          mt={0.5}
          mb={2}
          textColor="text.tertiary"
        >
          {description}
        </Typography>
        <form onSubmit={submitHandler}>
          <Stack spacing={2}>
            {fields.map((field) => (
              <TextField
                label={field.label}
                autoFocus
                required
                type="password"
                key={field.key}
                id={`modal-form-${field.key}`}
              />
            ))}

            <Button type="submit" loading={loading} variant="outlined">
              Submit
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  )
}

const ModalForm = forwardRef(ModalFormComponent) as <T extends string>(
  props: IModalForm<T> & {
    ref?: Ref<HTMLDivElement>
    displayName?: string
  }
) => ReactElement

export default observer(ModalForm)
