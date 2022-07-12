import React from 'react'
import { BallTriangle } from  'react-loader-spinner'
import { Box } from '@mui/material';


const Spinner = ({heightSpinner}) => {

  return (
    <Box sx={{flexGrow: 1, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <BallTriangle 
            height="100"
            width="100"
            color='#1565c0'
            ariaLabel='loading'
         />
    </Box>
  )
}

export default Spinner