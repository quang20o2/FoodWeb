import { Box, styled, Typography, useMediaQuery } from '@mui/material'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded'
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded'
import { NavLink, useLocation } from 'react-router-dom'

const Sidebar_Options = styled(Box)({
  paddingTop: '50px',
  paddingLeft: '20%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
})

const Sidebar_Option = styled(NavLink)(({ isMediumDevice, isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  border: '1px solid #a9a9a9',
  borderRight: 0,
  borderRadius: '3px 0 0 3px',
  padding: '8px 10px',
  color: 'black',
  textDecoration: 'none',
  backgroundColor: isActive ? '#fff0ed' : 'inherit',
  borderColor: isActive ? 'tomato' : '#a9a9a9',

  '& .MuiTypography-root': {
    display: isMediumDevice ? 'none' : 'block'
  }
}))

const Sidebar = () => {
  const isMediumDevice = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const { pathname } = useLocation()
  return (
    <Box
      sx={{
        width: '18%',
        minHeight: '100vh',
        borderRight: '1.5px solid #a9a9a9',
        fontSize: 'max(1vh,10px)'
      }}
    >
      <Sidebar_Options>
        <Sidebar_Option
          to="/add"
          isMediumDevice={isMediumDevice}
          isActive={pathname === '/add'}
        >
          <AddCircleOutlineRoundedIcon fontSize="large" />
          <Typography>Add Items</Typography>
        </Sidebar_Option>

        <Sidebar_Option
          to="/list"
          isMediumDevice={isMediumDevice}
          isActive={pathname === '/list'}
        >
          <FormatListBulletedRoundedIcon fontSize="large" />
          <Typography>List Items</Typography>
        </Sidebar_Option>

        <Sidebar_Option
          to="/orders"
          isMediumDevice={isMediumDevice}
          isActive={pathname === '/orders'}
        >
          <ChecklistRoundedIcon fontSize="large" />
          <Typography>Orders</Typography>
        </Sidebar_Option>
      </Sidebar_Options>
    </Box>
  )
}

export default Sidebar
