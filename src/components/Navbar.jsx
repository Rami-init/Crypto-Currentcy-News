import {useState} from 'react'
import {Grid, Typography, Box} from '@mui/material'
import { NavLink } from 'react-router-dom'
import {styled} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin'
import CurrnecyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import {useTheme} from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import Header from './Header'


const Navbar = () => {
  const [openNav, setOpenNav] = useState(false)
  const theme = useTheme()
  const activeClassName = {color: '#ffa000', borderRight: '2px solid #ffa000'}
  const notActiveClassName = {color: 'inherit', borderRight: 'none'}
  const typoSX = {
    display: "flex",
    alignItems: "center",
    gap: ".6rem",
  }
  const closeSX={
    position: 'absolute',
    top: '.4rem',
    right: '.6rem',
    cursor: 'pointer',
    fontWeight: 600,
    '&:hover': {
      color: theme.palette.error.main
    },
    [theme.breakpoints.up('md')]:{
      display: 'none'
    }
  }
  const BarWrapper = styled('div')(({theme})=>({
    justifyContent: 'start',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: '3rem',
    width: `25%`,
    display: 'flex',
    height: '100vh',
    position: 'fixed',
    zIndex: '999',
    background: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('md')]:{
      width: '75%',
      height: '100vh',
      display: `${openNav? 'flex': 'none'}`,
      
    }
  }))
  const MenuWrapper = styled('div')(({theme})=>({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(5),
    marginRight: theme.spacing(10)
  }))
   
  return (
    <>
    <Header setOpenNav={setOpenNav} openNav={openNav} />
    <BarWrapper>
      <Box sx={closeSX}><CloseIcon onClick={()=>setOpenNav(false)} /> </Box>
      <Box mt={3} sx={{display:'flex', width: '100%'}}>
        <Typography varinat='h3' fontWeight={600} >Currentcy <span className='span-logo'> News</span> </Typography>
      </Box>
      <Grid container spacing={3} mt={3} > 
        <Grid item xs={12} display='flex' justifyContent='center' alignitem='center'>
          <NavLink to='/' className='navlink__header' onClick={()=>setOpenNav(false)} style={({isActive})=>isActive?activeClassName:notActiveClassName}>
            <Typography variant='body2' sx={typoSX} fontWeight={600}><HomeIcon mr={2} fontSize='small' /> Home</Typography>
          </NavLink>
        </Grid>
        <Grid item xs={12} display='flex' justifyContent='center' alignitem='center'>
          <NavLink to='/crypto' className='navlink__header' onClick={()=>setOpenNav(false)} style={({isActive})=>isActive?activeClassName:notActiveClassName}>
            <Typography variant='body2' sx={typoSX} fontWeight={600}><CurrencyBitcoinIcon fontSize='small' /> Crypto Currencies</Typography>
          </NavLink>
        </Grid>
        <Grid item xs={12} display='flex' justifyContent='center' alignitem='center'>
          <NavLink to='/exchange' className='navlink__header' onClick={()=>setOpenNav(false)} style={({isActive})=>isActive?activeClassName:notActiveClassName}>
            <Typography variant='body2' sx={typoSX} fontWeight={600}><CurrnecyExchangeIcon fontSize='small' /> EXchange</Typography>
          </NavLink>
        </Grid>
        <Grid item xs={12} display='flex' justifyContent='center' alignitem='center'>
          <NavLink to='/news' className='navlink__header' onClick={()=>setOpenNav(false)} style={({isActive})=>isActive?activeClassName:notActiveClassName}>
            <Typography variant='body2'sx={typoSX} fontWeight={600}><NewspaperIcon fontSize='small' />News</Typography>
          </NavLink>
        </Grid>
      </Grid>
    </BarWrapper>
    </>
  )
}

export default Navbar