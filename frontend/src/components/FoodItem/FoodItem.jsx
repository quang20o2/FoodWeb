import { useContext } from 'react'
import {
  Box,
  IconButton,
  Rating,
  Typography,
  useMediaQuery
} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { StoreContext } from '../../context/StoreContext'
import { baseUrl } from '../../api'

function FoodItem({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext)

  const isSmallDevice = useMediaQuery((theme) => theme.breakpoints.down('sm')) // > 600px
  const isMediumDevice = useMediaQuery((theme) => theme.breakpoints.down('md')) // > 900px
  const isLargeDevice = useMediaQuery((theme) => theme.breakpoints.down('lg'))
  return (
    <Box
      sx={{
        width: '100%',
        m: 'auto',
        borderRadius: '15px',
        boxShadow: '0px 0px 10px #00000015',
        transition: '0.3s',
        animation: 'fadeIn 1s'
      }}
    >
      <Box
        sx={{
          position: 'relative'
        }}
      >
        <Box
          component="img"
          src={baseUrl + '/images/' + image}
          alt=""
          sx={{
            width: '100%',
            borderRadius: '15px 15px 0px 0px'
          }}
        />
        {!cartItems[id] ? (
          <IconButton
            sx={{
              width: isSmallDevice ? '22px' : '38px',
              height: 'auto',
              position: 'absolute',
              bottom: isSmallDevice ? '10px' : '16px',
              right: isSmallDevice ? '10px' : '16px',
              p: isSmallDevice ? '4px' : '6px',
              backgroundColor: 'white',
              border: '1px solid tomato',
              '&:hover': {
                backgroundColor: 'white'
              }
            }}
            aria-label="AddToCart"
            onClick={() => addToCart(id)}
          >
            <AddShoppingCartIcon
              sx={{
                fill: 'tomato',
                fontSize: isSmallDevice ? '12px' : '1.5rem'
              }}
            />
          </IconButton>
        ) : (
          <Box
            sx={{
              position: 'absolute',
              bottom: isSmallDevice ? '10px' : '16px',
              right: isSmallDevice ? '10px' : '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              p: isSmallDevice ? '2px' : '6px',
              borderRadius: '50px',
              backgroundColor: '#ffffff',
              '&:hover': {
                backgroundColor: '#ffffff'
              }
            }}
          >
            <IconButton
              sx={{
                color: '#e53935',
                width: isSmallDevice ? '20px' : '30px',
                height: isSmallDevice ? '20px' : '30px',
                backgroundColor: '#ffcdd2',
                '&:hover': {
                  backgroundColor: '#ffcdd2'
                }
              }}
              aria-label="Remove"
              onClick={() => removeFromCart(id)}
            >
              <RemoveIcon
                sx={{ fontSize: isSmallDevice ? '12px' : '1.5rem' }}
              />
            </IconButton>
            <Typography>{cartItems[id]}</Typography>
            <IconButton
              sx={{
                color: '#43a047',
                width: isSmallDevice ? '20px' : '30px',
                height: isSmallDevice ? '20px' : '30px',
                backgroundColor: '#c8e6c9',
                '&:hover': {
                  backgroundColor: '#c8e6c9'
                }
              }}
              aria-label="Add"
              onClick={() => addToCart(id)}
            >
              <AddIcon sx={{ fontSize: isSmallDevice ? '12px' : '1.5rem' }} />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          p: isSmallDevice ? '8px' : isMediumDevice ? '14px' : '20px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: '10px'
          }}
        >
          <Typography
            sx={{
              fontSize: isSmallDevice
                ? '11px'
                : isMediumDevice
                  ? '15px'
                  : '20px',
              fontWeight: isSmallDevice ? 550 : 500
            }}
          >
            {name}
          </Typography>

          <Rating
            name="half-rating"
            defaultValue={2.5}
            precision={0.5}
            sx={{
              width: '30%',
              fontSize: isSmallDevice
                ? '8px'
                : isMediumDevice
                  ? '11px'
                  : isLargeDevice
                    ? '13px'
                    : '15px'
            }}
          />
        </Box>
        <Typography
          sx={{
            color: '#676767',
            fontSize: isSmallDevice ? '8px' : isMediumDevice ? '10px' : '12px'
          }}
        >
          {description}
        </Typography>
        <Typography
          sx={{
            color: 'tomato',
            fontSize: isSmallDevice ? '18px' : isMediumDevice ? '20px' : '22px',
            fontWeight: 500,
            m: '10px 0'
          }}
        >
          ${price}
        </Typography>
      </Box>
    </Box>
  )
}

export default FoodItem
