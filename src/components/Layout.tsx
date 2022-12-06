import { FC, PropsWithChildren } from 'react'
import { Box, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import Header from './Header'

const Main = styled('main')``

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }}
  >
    <Header />
    <Main sx={{ height: '100%' }}>
      <Container sx={{ height: '100%', pt: '4rem', pb: '4rem' }}>
        {children}
      </Container>
    </Main>
  </Box>
)

export default Layout
