import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import { assets } from '../../assets/assets'
import { api } from '../../api'

const MyOrders = () => {
  const { token } = useContext(StoreContext)
  const [data, setData] = useState([])

  const fetchOrders = async () => {
    const response = await api.post(
      '/api/order/userorders',
      {},
      { headers: { token } }
    )
    setData(response.data.data)
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  const isMediumDevice = useMediaQuery((theme) => theme.breakpoints.down('md'))

  return (
    <Box sx={{ m: '50px 0px' }}>
      <Typography
        variant="h2"
        sx={{ fontSize: isMediumDevice ? '1.2rem' : '2rem' }}
      >
        My Orders
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          mt: '30px'
        }}
      >
        {data.map((order, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: 'grid',
                gridTemplateColumns: isMediumDevice
                  ? '1fr 2fr 1fr'
                  : '0.5fr 2fr 1fr 1fr 2fr 1fr',
                alignItems: 'center',
                gap: '30px',
                rowGap: isMediumDevice ? '5px' : 'none',
                fontSize: isMediumDevice ? '12p' : '14px',
                p: '10px 20px',
                color: '#454545',
                border: '1px solid tomato'
              }}
            >
              <Box
                component="img"
                src={assets.parcel_icon}
                alt=""
                sx={{ width: '50px' }}
              />
              <Typography>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + ' x ' + item.quantity
                  } else {
                    return item.name + ' x ' + item.quantity + ', '
                  }
                })}
              </Typography>
              <Typography>${order.amount}.00</Typography>
              <Typography>Items: {order.items.length}</Typography>
              <Box display="flex" alignItems="center">
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ mr: '5px', color: 'tomato' }}
                >
                  &#x25cf;
                </Typography>
                <Typography variant="body1" fontWeight="550" color="#454545">
                  {order.status}
                </Typography>
              </Box>
              <Button
                variant="contained"
                disableRipple
                sx={{
                  p: '12px 0px',
                  backgroundColor: '#ffe1e1',
                  color: '#454545',
                  boxShadow: 'none',
                  fontSize: isMediumDevice ? '10px' : '14px',
                  '&:hover': {
                    backgroundColor: '#ffcccb',
                    boxShadow: 'none'
                  }
                }}
                onClick={fetchOrders}
              >
                Track Order
              </Button>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default MyOrders
