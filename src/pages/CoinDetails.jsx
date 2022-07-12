import {useState} from 'react'
import { useParams } from 'react-router-dom'
import HTMLReactParser from 'html-react-parser'
import {Grid,Typography, Paper, Container, Divider, Box, FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import {} from '@mui/icons-material'
import {useTheme} from '@mui/material/styles'
import millify from 'millify'
import { useGetCoinDetailsQuery, useGetCoinHistoryQuery } from '../services/Crypto'
import {LineCharts} from '../components'
import {Spinner} from '../components'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NumbersIcon from '@mui/icons-material/Numbers';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
const period = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];
const CoinDetails = () => {
    const [timePeriod, setTimePeriod] = useState('7d')
    const {coinId} = useParams()
    const theme = useTheme()
    const { data, isFetching} = useGetCoinDetailsQuery(coinId)
    const {data: coinHistroy} = useGetCoinHistoryQuery({coinId, timePeriod})
    if(isFetching) return <Spinner />
    const cryptoDetails = data?.data?.coin
    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <AttachMoneyIcon /> },
        { title: 'Rank', value: cryptoDetails.rank, icon: <MilitaryTechIcon /> },
        { title: '24h Volume', value: `$ ${cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])}`, icon: <AccessTimeIcon /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <StorefrontIcon /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <CalendarMonthIcon /> },
      ];
    
      const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <NumbersIcon /> },
        { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <CurrencyExchangeIcon /> },
        { title: 'Aprroved Supply', value: cryptoDetails.supply.confirmed ? <CheckIcon /> : <CloseIcon />, icon: <Inventory2Icon /> },
        { title: 'Total Supply', value: `$ ${millify(cryptoDetails.supply.total)}`, icon: <SettingsSuggestIcon /> },
        { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.supply.circulating)}`, icon: <Inventory2Icon /> },
      ];
    return (
        <Container sx={{flexGrow: 1}}>
        <Grid container spacing={4}>
            <Grid item xs={12} textAlign='center'>
                <Typography variant='h5' fontWeight={600} >{` ${cryptoDetails?.name} { ${cryptoDetails?.symbol} } Price`}</Typography>
                <Typography variant='caption'>{cryptoDetails?.name} live price in US dollars, view value statistic, market Cup and Supply</Typography>
            </Grid>
            <Grid item xs={12}>
                <Box ml={12} width='6rem' mt={9} mb={4} >
                    <FormControl fullWidth>
                    <InputLabel id='type-select-place'>
                        Period
                    </InputLabel>
                    <Select 
                        value={timePeriod} 
                        onChange={(e)=>setTimePeriod(e.target.value)}
                        labelId='type-select-place'
                        label='Period'
                        bgcolor={theme.palette.common.white}
                    >
                        {period.map((time, index)=>{
                        return <MenuItem key={index} value={time}>{time}</MenuItem>
                        })}
                    </Select>
                    </FormControl>
                </Box>
                <LineCharts coinHistroy={coinHistroy} currentCoinPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name}></LineCharts>
            </Grid>
            <Grid item xs={12} bgcolor={theme.palette.common.white}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} my={2}>
                    <Typography variant='h6' my={1} fontWeight={600}>
                        Statistics
                    </Typography>
                    <Typography mb={1} varinat='body2'>
                        An overviews showing the state of crypto currency
                    </Typography>
                    <Paper elevation={4} mt={1} bgcolor={theme.palette.common.white} sx={{width: '100%', padding: '.4rem .2rem'}}>
                        {stats.map((item, index)=>(
                            <div key={index}> 
                           <Box display='flex' mt={1} sx={{width: '100%', padding: '.4rem .6rem', }} justifyContent='space-between' alignItems='center' key={index}>
                                <Box display='flex' alginItems='center'>
                                {item.icon}
                                <Typography ml='5px' variant='body1'>
                                    {item.title}
                                </Typography></Box>
                               <Typography variant='body2' component='span' fontWeight={600}>
                                {item.value}
                                </Typography>
                           </Box> 
                            <Divider />
                            </div>
                        ))}
                        
                    </Paper>
                </Grid>
                <Grid item xs={12} my={2} md={6} bgcolor={theme.palette.common.white}>
                <Typography variant='h6'  my={1} fontWeight={600}>
                    Other Statistics
                    </Typography>
                    <Typography mb={1} varinat='body2'>
                        An overviews showing all state of crypto currency
                    </Typography>
                    <Paper elevation={4} bgcolor={theme.palette.common.white} mt={1} sx={{width: '100%', padding: '.4rem .2rem'}}>
                        {genericStats.map((item, index)=>(
                            <div key={index}>
                           <Box display='flex' mt={1} sx={{width: '100%', padding: '.4rem .6rem', }} justifyContent='space-between' alignItems='center' key={index}>
                                <Box display='flex' alginItems='center'>
                                {item.icon}
                                <Typography ml='5px' variant='body1'>
                                    {item.title}
                                </Typography></Box>
                               <Typography variant='body2' component='span' fontWeight={600}>
                                {item.value}
                                </Typography>
                           </Box> 
                            <Divider />
                            </div>
                        ))}
                        
                    </Paper>
                    </Grid>
            </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={8}>
                    <Grid item xs={12} md={7}>
                    <h3>
                            What's is {cryptoDetails?.name}
                    </h3>
                    {HTMLReactParser(cryptoDetails.description)}
                    </Grid>
                    <Divider />
                    <Grid item xs={12} md={5}>
                        <Typography variant='h6' fontWeight={600}>
                            {cryptoDetails?.name} Linnks
                        </Typography>
                        {cryptoDetails?.links.map((item, index)=>(
                            <Box key={index} my={3}>
                                <Typography variant='caption' my={2} fontWeight={600}>{item.name}</Typography>
                                <Typography variant='body2'><a href={item.url}>{item.url}</a></Typography>
                            </Box>
                        )
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Container>
  )
}

export default CoinDetails