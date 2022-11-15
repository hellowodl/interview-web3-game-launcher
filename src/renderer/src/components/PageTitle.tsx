import { Typography } from '@mui/joy'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'

const PageTitle = ({ children }: PropsWithChildren) => (
  <Header>
    <Typography level="h2">{children}</Typography>
  </Header>
)

export default PageTitle

const Header = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
`
