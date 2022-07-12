import {Container, Typography, Grid, Button, Box} from '@mui/material'
import {GloabalCryptoExchange, TopNewsCrypto, TopTenCryptoInWorld}  from '../components'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
   <Box sx={{flexGrow: 1}}>
     <GloabalCryptoExchange />
     <Container>
        <Grid container sapcing={3} mt={4}>
            <Grid item xs={12} md={6}>
                <Typography variant='h5'>
                    Top 10 Crypto Conis in World
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} display='flex' justifyContent='end'>
                <Button><Link to='/crypto'>show More</Link></Button>
            </Grid>
        </Grid>
        <TopTenCryptoInWorld simplefied={true} />
        <Grid container sapcing={3} mt={4}>
            <Grid item xs={12} md={6}>
                <Typography variant='h5'>
                    Top 10 News Crypto Conis
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} display='flex' justifyContent='end'>
                <Button><Link to='/crypto'>show More</Link></Button>
            </Grid>
        </Grid>
        <TopNewsCrypto simplefied={true} />
    </Container>
   </Box>
  )
}

export default Home