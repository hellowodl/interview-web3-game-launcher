/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/prop-types */
import IconButton from '@mui/joy/IconButton'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import Sheet from '@mui/joy/Sheet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { PropsWithChildren } from 'react'

interface IMenuButton {
  to: string
  label: string
}

function MenuButton({ children, ...props }: PropsWithChildren<IMenuButton>) {
  return (
    <>
      <IconButton
        {...props}
        component={Link}
        variant="plain"
        color="neutral"
        size="lg"
        sx={{
          // bgcolor: open ? 'neutral.plainHoverBg' : undefined,
          '&.Joy-focusVisible': {
            bgcolor: 'neutral.plainHoverBg'
          }
        }}
      >
        {children}
      </IconButton>
    </>
  )
}

export default function Sidebar() {
  return (
    <Sheet sx={{ borderRadius: 'sm', py: 2.3, mr: 20 }}>
      <List>
        <ListItem>
          <MenuButton label="Games" to="/">
            <FontAwesomeIcon icon={faGamepad} />
          </MenuButton>
        </ListItem>

        <ListItem>
          <MenuButton label="Trophies" to="/trophies">
            <FontAwesomeIcon icon={faTrophy} />
          </MenuButton>
        </ListItem>
      </List>
    </Sheet>
  )
}
