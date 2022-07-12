import { AppBar, Toolbar, IconButton, Grid, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import {useTheme} from '@mui/material/styles'
const Header = ({setOpenNav, openNav}) => {
  const theme = useTheme()
  return (
    <AppBar position='static' sx={{
        display: `${openNav? 'none': 'flex'}`,
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    }}>
        <Toolbar>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <IconButton onClick={()=> setOpenNav(true)}>
                        <MenuIcon sx={{color: theme.palette.primary.contrastText}}/>
                    </IconButton>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h5'>
                    Currentcy <span className='span-logo'> News</span> 
                    </Typography>
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>
  )
}

export default Header