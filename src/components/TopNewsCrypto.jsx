import React, {useState, useEffect} from 'react'
import {Box, Typography, Grid, styled, Card, CardContent, Avatar, InputLabel, Select, MenuItem, FormControl} from '@mui/material'
import { useGetCryptoQuery } from '../services/Crypto'
import {useTheme} from '@mui/material/styles'
import {useGetCryptoNewsQuery} from '../services/CryptoNews'
import moment from 'moment'
import {Link} from 'react-router-dom'
import Spinner from './Spinner'

const TopNewsCrypto = ({simplefied}) => {
  const cryptoImage = 'https://images.app.goo.gl/NKC4bHPpEJyT7fjb9'
  const theme = useTheme()
  const count = simplefied? 10 : 100
  const [newCategory, setNewCategory] = useState('cryptocurrency')
  const {data: cryptoNewsList, isFetching} = useGetCryptoNewsQuery({newCategory, count}) 
  const {data: listCoins, isFetching: loading} = useGetCryptoQuery(count)
  const ImgContainer = styled('div')({
    borderRadius: '100%',
    width: '5rem',
    maxHieght: '5rem',
  })
  const CardHeader = styled('div')({
    display: 'flex',
    justifyContent: 'space-Between',
    alignItems: 'center',
    marginBottom: '2rem'
  })
  console.log(cryptoNewsList)
  if(isFetching) return <Spinner />
  return (
    <>
    {!simplefied && <Box ml={12} width='15rem' mt={9} mb={4} >
         <FormControl fullWidth>
          <InputLabel id='type-select-place'>
            Type
          </InputLabel>
          <Select 
            value={newCategory} 
            onChange={(e)=>setNewCategory(e.target.value)}
            labelId='type-select-place'
            label='Type'
            bgcolor={theme.palette.common.white}
          >
            <MenuItem value='cryptocurrency'>Crypto Currency</MenuItem>
            {listCoins?.data?.coins?.map((coin, index)=>{
              return <MenuItem key={index} value={coin.name}>{coin.name}</MenuItem>

            })}
            <MenuItem value='attractions'>Attractions</MenuItem>
          </Select>
        </FormControl>
    </Box>}
     <Grid container spacing={3}>
        {cryptoNewsList?.value?.map((item, index)=>{
            return (
                <Grid item xs={12} md={6} lg={3} key={index}>
                    <Card>
                        <CardContent>
                            <a url={item.url} target='_blank'>
                                <CardHeader>
                                    <Typography variant='body1' color={theme.palette.grey[500]}>
                                        {item?.name?.length > 60 ? `${item?.name.slice(0, 60)}...`: item?.name}
                                    </Typography>
                                    <ImgContainer>
                                        <img src={item?.image?.thumbnail?.contentUrl || cryptoImage} lazy='true' alt='img coin' />
                                    </ImgContainer>
                                </CardHeader>
                                <Box display='flex' justifyContent='space-between' alignItems='center'>
                                  <Box display='flex' alignItems='center'>
                                    <Avatar src={item?.provider[0]?.image?.thumbnail?.contentUrl || cryptoImage}></Avatar>
                                    <Typography variant='body2' ml='8px' color={theme.palette.grey[500]}>
                                      {item?.provider[0]?.name}
                                    </Typography>
                                  </Box>
                                  <Typography variant='caption' color={theme.palette.grey[500]}>
                                    {moment(item?.datePublished).startOf('ss').fromNow()}
                                  </Typography>
                                </Box>
                                <Typography variant='body2' color={theme.palette.grey[500]}> 
                                    {item?.description.length > 120?`${item?.description?.slice(0, 120)}...`:item?.description}
                                </Typography>
                            </a>
                        </CardContent>
                    </Card>
                </Grid>
            )
        })}
     </Grid>
 </>
  )
}

export default TopNewsCrypto