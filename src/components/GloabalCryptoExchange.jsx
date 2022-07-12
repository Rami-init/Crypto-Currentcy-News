import { Typography, Grid, Paper, Container } from '@mui/material'
import millify from 'millify'
import React from 'react'
import { useGetCryptoQuery } from '../services/Crypto'
import Spinner from './Spinner'


const GloabalCryptoExchange = () => {
  const {data, isFetching} = useGetCryptoQuery(10)
  const confingMillify = {
      precision: 3,
    }
    const globalEx = data?.data?.stats
    if(isFetching) return <Spinner />
  return (
    <Paper elevation={4}>
        <Container sx={{paddingTop: 6, paddingBottom: 4}}>
            <Typography variant='h5' mb={3}>Global Crybto Exchange</Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Typography variant='body2'>Total Crypto Currency</Typography>
                    <Typography variant='body2' fontWeight={600}>{globalEx?.total && millify(globalEx?.total, confingMillify)}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='body2'>Total Exchange</Typography>
                    <Typography variant='body2' fontWeight={600}>{globalEx?.totalExchanges && millify(globalEx?.totalExchanges, confingMillify)}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='body2'>Total Coins</Typography>
                    <Typography variant='body2' fontWeight={600}>{globalEx?.totalCoins && millify(globalEx?.totalCoins, confingMillify)}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='body2'>Total Market Cap</Typography>
                    <Typography variant='body2' fontWeight={600}>{ globalEx?.totalMarketCap && millify(globalEx?.totalMarketCap, confingMillify)}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='body2'>Total Volume 24 hours</Typography>
                    <Typography variant='body2' fontWeight={600}>{globalEx?.total24hVolume && millify(globalEx?.total24hVolume, confingMillify)}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='body2'>Total Markets</Typography>
                    <Typography variant='body2' fontWeight={600}>{globalEx.totalMarkets && millify(globalEx.totalMarkets, confingMillify)}</Typography>
                </Grid>
            </Grid>
        </Container>
    </Paper>
  )
}

export default GloabalCryptoExchange