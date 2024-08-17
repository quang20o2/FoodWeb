import {
  Box,
  Divider,
  styled,
  TextField,
  Typography,
  Button,
  useMediaQuery,
  FormControl
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { api, baseUrl } from '../../api'

const StyledDivider = styled(Divider)({
  margin: '10px 0',
  height: '1px',
  backgroundColor: '#e2e2e2',
  border: 'none'
})

const StyledCartTotalDetails = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  color: '#555'
})

const MultiFields = {
  display: 'flex',
  gap: '15px'
}

function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems } =
    useContext(StoreContext)

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    phoneNumber: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault()
    let orderItems = []
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item
        itemInfo['quantity'] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }
    let response = await api.post('/api/order/place', orderData, {
      headers: { token }
    })
    if (response.data.success) {
      const { session_url } = response.data
      window.location.replace(session_url)
    } else {
      alert('Error')
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [])

  const isSmallDevice = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const isMediumDevice = useMediaQuery((theme) => theme.breakpoints.down('md'))

  return (
    <Box
      onSubmit={placeOrder}
      component="form"
      sx={{
        display: isMediumDevice ? 'unset' : 'flex',
        alignItems: 'start',
        justifyContent: 'space-between',
        gap: '50px',
        mt: '80px',
        '& .MuiTextField-root': { mb: '20px', width: '100%' }
      }}
      noValidate
      autoComplete="off"
    >
      <Box
        className="place-order-left"
        sx={{ width: '100%', maxWidth: 'max(30%, 500px)' }}
      >
        <Typography
          variant="h2"
          className="title"
          sx={{
            fontSize: isMediumDevice ? '1.2rem' : '2rem',
            fontWeight: '600px',
            mb: '30px'
          }}
        >
          Deliver Information
        </Typography>
        <FormControl>
          <Box className="multi-fields" sx={MultiFields}>
            <TextField
              name="firstName"
              type="text"
              label="First Name"
              placeholder="First Name"
              size="small"
              required
              onChange={onChangeHandler}
              value={data.firstName}
            />
            <TextField
              name="lastName"
              type="text"
              label="Last Name"
              placeholder="Last Name"
              size="small"
              required
              onChange={onChangeHandler}
              value={data.lastName}
            />
          </Box>
          <TextField
            name="email"
            type="email"
            label="Email"
            placeholder="Email address"
            size="small"
            required
            onChange={onChangeHandler}
            value={data.email}
          />
          <TextField
            name="address"
            type="text"
            label="Address"
            placeholder=""
            size="small"
            required
            onChange={onChangeHandler}
            value={data.address}
          />
          <Box className="multi-fields" sx={MultiFields}>
            <TextField
              name="city"
              type="text"
              label="City"
              placeholder="City"
              size="small"
              required
              onChange={onChangeHandler}
              value={data.city}
            />
            <TextField
              name="state"
              type="text"
              label="State"
              placeholder="State"
              size="small"
              required
              onChange={onChangeHandler}
              value={data.state}
            />
          </Box>
          <TextField
            name="phoneNumber"
            type="text"
            label="Phone number"
            placeholder="Phone number"
            size="small"
            required
            onChange={onChangeHandler}
            value={data.phoneNumber}
          />
        </FormControl>
      </Box>
      <Box
        className="place-order-right"
        sx={{ width: '100%', maxWidth: 'max(30%, 500px)' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
          }}
        >
          <Typography
            variant="h2"
            sx={{ fontSize: isSmallDevice ? '1.2rem' : '2rem' }}
          >
            Cart Totals
          </Typography>
          <Box>
            <StyledCartTotalDetails>
              <Typography>Subtotal</Typography>
              <Typography>${getTotalCartAmount()}</Typography>
            </StyledCartTotalDetails>
            <StyledDivider />
            <StyledCartTotalDetails>
              <Typography>Delivery Fee</Typography>
              <Typography>${getTotalCartAmount() === 0 ? 0 : 2}</Typography>
            </StyledCartTotalDetails>
            <StyledDivider />
            <StyledCartTotalDetails>
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </StyledCartTotalDetails>
          </Box>
          <Button
            variant="contained"
            sx={{
              p: '12px 0',
              borderRadius: '4px',
              color: 'white',
              backgroundColor: 'tomato',
              width: 'max(15vw, 200px)',
              '&:hover': {
                backgroundColor: '#fc5c3f'
              }
            }}
            disableRipple
            type="submit"
          >
            PROCEED TO PAYMENT
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default PlaceOrder
