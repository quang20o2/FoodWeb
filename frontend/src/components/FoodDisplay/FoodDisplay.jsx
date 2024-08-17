import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { Box, Typography, useMediaQuery } from '@mui/material'
import FoodItem from '../FoodItem/FoodItem'

function FoodDisplay({ category }) {
  const { food_list } = useContext(StoreContext)

  const isSmallDevice = useMediaQuery((theme) => theme.breakpoints.down('sm')) // > 600px
  const isMediumDevice = useMediaQuery((theme) => theme.breakpoints.down('md')) // > 900px

  return (
    <Box
      sx={{
        mt: isSmallDevice ? '15px' : '30px'
      }}
    >
      <Typography
        variant="h2"
        sx={{ fontSize: isSmallDevice ? '1.2rem' : '2rem' }}
      >
        Top dishes near you
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: isSmallDevice
            ? 'repeat(auto-fill, minmax(100px, 1fr))'
            : isMediumDevice
              ? 'repeat(auto-fill, minmax(160px, 1fr))'
              : 'repeat(auto-fill, minmax(250px, 1fr))',
          mt: '30px',
          gap: '30px',
          rowGap: '30px',
          justifyContent: 'center'
        }}
      >
        {food_list.map((item, index) => {
          if (category === 'All' || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            )
          }
        })}
      </Box>
    </Box>
  )
}

export default FoodDisplay
