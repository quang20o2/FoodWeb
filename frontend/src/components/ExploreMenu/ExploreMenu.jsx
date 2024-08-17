import { Box, Typography, useMediaQuery } from '@mui/material'
import Divider from '@mui/material/Divider'
import { menu_list } from '../../assets/assets'

function ExploreMenu({ category, setCategory }) {
  const isSmallDevice = useMediaQuery((theme) => theme.breakpoints.down('sm')) // Áp dụng cho màn hình > 600px
  const isLargeDevice = useMediaQuery((theme) => theme.breakpoints.down('lg')) // Áp dụng cho màn hình > 1200px

  return (
    <Box
      id="menu"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        pt: '20px'
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: '#262626',
          fontWeight: 500,
          fontSize: isSmallDevice ? '1.2rem' : '2rem'
        }}
      >
        Explore our menu
      </Typography>
      <Typography
        sx={{
          fontSize: isSmallDevice ? '11px' : '16px',
          maxWidth: isLargeDevice ? '100%' : '60%',
          color: '#808080'
        }}
      >
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your craving and elevate your dining experience,
        one delicious meal at a time.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '30px',
          textAlign: 'center',
          m: isSmallDevice ? '0.5px 0' : '20px 0',
          overflowX: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        {menu_list.map((item, index) => (
          <Box
            key={index}
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? 'All' : item.menu_name
              )
            }
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: isSmallDevice ? '2px' : '10px'
            }}
          >
            <Box
              component="img"
              src={item.menu_image}
              alt=""
              sx={{
                width: '7.5vw',
                minWidth: isSmallDevice ? '47px' : '80px',
                cursor: 'pointer',
                borderRadius: '50px',
                transition: '0.2s',
                ...(category === item.menu_name && {
                  border: isSmallDevice
                    ? '2px solid tomato'
                    : '4px solid tomato',
                  padding: '2px',
                  borderRadius: '75px'
                })
              }}
            />
            <Typography
              sx={{
                color: '#747474',
                fontSize: isSmallDevice ? '10px' : 'max(1.4vw,16px)'
              }}
            >
              {item.menu_name}
            </Typography>
          </Box>
        ))}
      </Box>
      <Divider
        sx={{
          m: '10px 0',
          height: '2px',
          backgroundColor: '#e2e2e2',
          border: 'none'
        }}
      />
    </Box>
  )
}

export default ExploreMenu
