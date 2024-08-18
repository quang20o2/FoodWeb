import { useContext, useEffect, useState } from 'react'
import { Link, animateScroll as scroll } from 'react-scroll'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LoginSharp from '@mui/icons-material/LoginSharp'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import PersonIcon from '@mui/icons-material/Person'
import { Divider, ListItemIcon, Menu, MenuItem, styled } from '@mui/material'
import Logout from '@mui/icons-material/Logout'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

const activeMenuStyle = {
  pb: '2px',
  borderBottom: '2px solid #49557e'
}

const ButtonSignIn = styled(Button)(({ isSmallDevice }) => ({
  fontSize: isSmallDevice ? '9px' : '14px',
  color: '#49557e',
  background: 'transparent',
  padding: isSmallDevice ? '3px 5px' : '8px 16px',
  // px: isSmallDevice ? '5px' : '16px',
  border: '1px solid tomato',
  borderRadius: '50px',
  transition: '0.3s',
  '&:hover': {
    backgroundColor: '#fff4f2',
    borderColor: 'tomato'
  }
}))

function Navbar({ setShowLogin }) {
  const [activeMenu, setActiveMenu] = useState('Home')
  const { getTotalCartAmount, token, setToken, isAdmin, setIsAdmin } =
    useContext(StoreContext)

  const navigate = useNavigate()

  const isSmallDevice = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const isMediumDevice = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const isLargeDevice = useMediaQuery((theme) => theme.breakpoints.down('lg'))

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName)
  }

  const handleLogoClick = () => {
    setActiveMenu('Home')
    navigate('/')
  }

  const handleCartClick = () => {
    navigate('/cart')
  }

  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const name = localStorage.getItem('name') || sessionStorage.getItem('name')

  useEffect(() => {
    const storedIsAdmin =
      localStorage.getItem('isAdmin') || sessionStorage.getItem('isAdmin')
    setIsAdmin(storedIsAdmin === 'true')
  }, [])

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={2.5}
    >
      {/* Logo */}
      <Box
        component="img"
        src={assets.logo}
        alt="Logo"
        width={
          isSmallDevice
            ? '100px'
            : isMediumDevice
              ? '110px'
              : isLargeDevice
                ? '130px'
                : '150px'
        }
        onClick={handleLogoClick}
        sx={{ cursor: 'pointer' }}
      />
      {/* Navigation Links */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
          gap: { md: 2.5, lg: 3.8, xl: 6.25 },
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        {['Home', 'Menu', 'Mobile App', 'Contact Us'].map((item) => (
          <Link
            key={item}
            to={item.toLowerCase()}
            smooth={true}
            duration={500}
            spy={true}
            activeClass="active-menu"
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: isMediumDevice
                  ? '15px'
                  : isLargeDevice
                    ? '18px'
                    : '22px',
                color: '#49557e',
                textDecoration: 'none',
                ...(activeMenu === item ? activeMenuStyle : {})
              }}
              onClick={(e) => {
                if (item === 'Home') {
                  handleLogoClick(e)
                } else {
                  handleMenuClick(item)
                }
              }}
            >
              {item}
            </Typography>
          </Link>
        ))}
      </Box>
      {/* Action Items */}
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        gap={2.5}
      >
        <Tooltip title="Search">
          <SearchIcon
            sx={{ color: '#49557e' }}
            fontSize={
              isSmallDevice ? 'small' : isLargeDevice ? 'medium' : 'large'
            }
          />
        </Tooltip>
        <Tooltip title="Cart">
          <Badge
            color="warning"
            variant="dot"
            sx={{ cursor: 'pointer', position: 'relative', zIndex: 0 }}
            onClick={handleCartClick}
            invisible={getTotalCartAmount() === 0}
          >
            <ShoppingCartIcon
              sx={{ color: '#49557e' }}
              fontSize={
                isSmallDevice ? 'small' : isLargeDevice ? 'medium' : 'large'
              }
            />
          </Badge>
        </Tooltip>
        {!token ? (
          <ButtonSignIn
            disableRipple
            variant="outlined"
            endIcon={
              <LoginSharp fontSize={isSmallDevice ? 'small' : 'medium'} />
            }
            onClick={() => setShowLogin(true)}
          >
            Sign in
          </ButtonSignIn>
        ) : (
          <Box>
            <ButtonSignIn
              onClick={handleMenuOpen}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              disableRipple
              startIcon={
                <PersonIcon
                  fontSize={
                    isSmallDevice ? 'small' : isLargeDevice ? 'medium' : 'large'
                  }
                  sx={{ color: '#49557e', cursor: 'pointer' }}
                />
              }
            >
              Hi, {name}!
            </ButtonSignIn>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ p: 0 }}
              PaperProps={{
                elevation: 0,
                sx: {
                  backgroundColor: '#fff2ef',
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 25,
                    width: 10,
                    height: 10,
                    bgcolor: '#fff2ef',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0
                  }
                }
              }}
              transformOrigin={{ horizontal: 'center', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            >
              {isAdmin ? (
                <MenuItem
                  onClick={() => {
                    window.location.href = 'https://foodweb-admin-panel.onrender.com'
                    handleMenuClose()
                  }}
                  sx={{
                    '&:hover': {
                      bgcolor: 'inherit',
                      color: 'tomato'
                    }
                  }}
                >
                  <ListItemIcon>
                    <AdminPanelSettingsIcon
                      fontSize={isSmallDevice ? 'small' : 'medium'}
                    />
                  </ListItemIcon>
                  Admin Panel
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    navigate('/myorders')
                    handleMenuClose()
                  }}
                  sx={{
                    '&:hover': {
                      bgcolor: 'inherit',
                      color: 'tomato'
                    }
                  }}
                >
                  <ListItemIcon>
                    <ShoppingBagOutlinedIcon
                      fontSize={isSmallDevice ? 'small' : 'medium'}
                    />
                  </ListItemIcon>
                  Orders
                </MenuItem>
              )}
              <Divider variant="middle" />
              <MenuItem
                sx={{
                  '&:hover': {
                    bgcolor: 'inherit',
                    color: 'tomato'
                  }
                }}
                onClick={() => {
                  setToken(null)
                  setIsAdmin(false)
                  localStorage.removeItem('token') ||
                    sessionStorage.removeItem('token')
                  localStorage.removeItem('name') ||
                    sessionStorage.removeItem('name')
                  localStorage.removeItem('isAdmin') ||
                    sessionStorage.removeItem('isAdmin')
                  handleMenuClose()
                }}
              >
                <ListItemIcon>
                  <Logout fontSize={isSmallDevice ? 'small' : 'medium'} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Navbar
