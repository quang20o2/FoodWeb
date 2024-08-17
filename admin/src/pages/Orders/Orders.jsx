import {
  Box,
  Typography,
  styled,
  TextField,
  useMediaQuery
} from '@mui/material'
import { useEffect, useState } from 'react'
import { api } from '../../api'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const status = [
  { value: 'Food Processing', label: 'Food Processing' },
  { value: 'Out for delivery', label: 'Out for delivery' },
  { value: 'Delivered', label: 'Delivered' }
]

const CusSelect = styled(TextField)({
  backgroundColor: '#ffe8e4',
  width: 'max(10vw, 120px)',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1px solid tomato'
    },
    '&:hover fieldset': {
      border: '1px solid tomato'
    },
    '&.Mui-focused fieldset': {
      border: '1px solid tomato'
    }
  }
})
const Orders = () => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    const response = await api.get('/api/order/list')
    if (response.data.success) {
      setOrders(response.data.data)
    } else {
      toast.error('Error')
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await api.post('/api/order/status', {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders()
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  const isMediumDevice = useMediaQuery((theme) => theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        width: '70%',
        ml: 'max(5vw, 25px)',
        mt: '50px',
        color: '#6d6d6d',
        fontSize: '1rem'
      }}
    >
      <Typography variant="h4">Order Page</Typography>
      <Box>
        {orders.map((order, index) => (
          <Box
            key={index}
            sx={{
              display: 'grid',
              gridTemplateColumns: isMediumDevice
                ? '0.5fr 2fr 1fr'
                : '0.5fr 2fr 1fr 1fr 1fr',
              alignItems: 'start',
              gap: '30px',
              border: '1px solid tomato',
              p: isMediumDevice ? '15px 8px' : '20px',
              m: '30px 0px',
              fontSize: isMediumDevice ? '12px' : '14px',
              color: '#505050'
            }}
          >
            <Box
              component="img"
              src={assets.parcel_icon}
              alt=""
              sx={{ width: isMediumDevice ? '40px' : '60px' }}
            />
            <Box>
              <Typography sx={{ fontWeight: 650 }}>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + ' x ' + item.quantity
                  } else {
                    return item.name + ' x ' + item.quantity + ', '
                  }
                })}
              </Typography>
              <Typography sx={{ fontWeight: 600, m: '20px 0px 5px 0px' }}>
                {order.address.lastName + ' ' + order.address.firstName}
              </Typography>
              <Typography sx={{ mb: '10px', fontWeight: 300 }}>
                {order.address.city + ', ' + order.address.state}
              </Typography>
              <Typography sx={{ fontWeight: 300 }}>
                {order.address.phoneNumber}
              </Typography>
            </Box>
            <Typography>Items: {order.items.length}</Typography>
            <Typography>Totals: ${order.amount}</Typography>
            <CusSelect
              name="status"
              size="small"
              select
              required
              SelectProps={{ native: true }}
              inputProps={{
                style: {
                  height: isMediumDevice ? 'auto' : '',
                  fontSize: isMediumDevice ? '12px' : '14px',
                  padding: isMediumDevice ? '5px' : '',
                  paddingRight: isMediumDevice ? '5px' : ''
                }
              }}
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              {status.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </CusSelect>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Orders
