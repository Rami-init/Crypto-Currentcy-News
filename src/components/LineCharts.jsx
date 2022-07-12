import { Box, Typography } from '@mui/material'
import React from 'react'
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const LineCharts = ({coinHistroy, currentCoinPrice, coinName}) => {
  const coinPrice = [];
  const coinTimestamp = [];
  for(let i=0; i < coinHistroy?.data?.history?.length; i++) {
    coinPrice.push(coinHistroy?.data?.history[i].price)
    coinTimestamp.push(new Date(coinHistroy?.data?.history[i].timestamp).toLocaleDateString())
  }
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071ff',
        borderColor: '#0071ff'
      },
    ]
  }
  
  return (
    <Box>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h5' fontWeight={600}>
          {coinName} Price Chart
        </Typography>
        <Box display='flex' justifyContent='space-between' alignItems='center'> 
        <Typography variant='h6' mr={4}>
          {coinHistroy?.data?.change}%
        </Typography>
        <Typography variant='h6'>
          Current {coinName} Price : ${currentCoinPrice}
        </Typography>
        </Box>
      </Box>
      <Chart type='line' data={data} />
    </Box>
  )
}

export default LineCharts