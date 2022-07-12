import React from 'react'
import { Box, Typography, Grid, styled} from '@mui/material'
import {useTheme} from '@mui/material/styles'

const Footer = () => {
  const FooterWrapper = styled('div')(({theme})=>({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '4rem',
    marginTop: 14,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,

  }))
  return (
    <FooterWrapper>
        <Typography variant='body2'>Contact-us: ramy.samy123@yahoo.com</Typography>
        <Typography variant='body2'>&copy; 2022 copyrights </Typography>
    </FooterWrapper>
  )
}

export default Footer