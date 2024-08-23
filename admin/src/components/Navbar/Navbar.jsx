import { Box, IconButton, Tooltip } from '@mui/material'
import { assets } from '../../assets/assets'
import { deepOrange } from '@mui/material/colors'

import HomeIcon from '@mui/icons-material/Home'

const Navbar = () => {
  const handleHome = () => {
    window.location.href = 'https://foodweb-frontend.onrender.com'
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 4%'
      }}
    >
      <Box
        component="img"
        src={assets.logo}
        alt=""
        sx={{
          width: 'max(10%, 80px)'
        }}
      />
      <Tooltip title="Home">
        <IconButton sx={{ p: 0 }} onClick={handleHome} disableRipple>
          <HomeIcon sx={{ fontSize: '2.5rem', color: deepOrange[500] }} />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default Navbar
