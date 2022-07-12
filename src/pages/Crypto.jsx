import React from 'react'
import { Container } from '@mui/material'
import {TopTenCryptoInWorld} from '../components'
const Crypto = () => {
  return (
    <Container sx={{flexGrow: 1}}>
      <TopTenCryptoInWorld simplefied={false} />
    </Container>
  )
}

export default Crypto