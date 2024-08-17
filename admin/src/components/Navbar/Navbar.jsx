import { useState } from 'react'
import {
  Avatar,
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  useMediaQuery
} from '@mui/material'
import { assets } from '../../assets/assets'
import { deepOrange } from '@mui/material/colors'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Logout from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'

const Navbar = () => {
  const [setIsAdmin] = useState(false)
  const [setToken] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    window.location.href = 'http://localhost:5000'
    setToken(null)
    setIsAdmin(false)
    localStorage.removeItem('token') || sessionStorage.removeItem('token')
    localStorage.removeItem('name') || sessionStorage.removeItem('name')
    localStorage.removeItem('isAdmin') || sessionStorage.removeItem('isAdmin')
    handleMenuClose()
  }

  const handleHome = () => {
    window.location.href = 'http://localhost:5000'
    handleMenuClose()
  }

  const isSmallDevice = useMediaQuery((theme) => theme.breakpoints.down('sm'))

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
      <Tooltip title="Profile">
        <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
          <Avatar
            sx={{ bgcolor: deepOrange[500], width: '40px', height: '40px' }}
          >
            <AccountCircleIcon sx={{ fontSize: '2.5rem' }} />
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleHome}>
          <ListItemIcon>
            <HomeIcon fontSize={isSmallDevice ? 'small' : 'medium'} />
          </ListItemIcon>
          Home
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize={isSmallDevice ? 'small' : 'medium'} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Navbar
