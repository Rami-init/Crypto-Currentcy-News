import React from 'react'
import { Container } from '@mui/material'
import {TopNewsCrypto} from '../components'

const News = () => {
  return (
    <Container sx={{flexGrow: 1}}>
      <TopNewsCrypto simplefied={false} />
    </Container>
  )
}

export default News