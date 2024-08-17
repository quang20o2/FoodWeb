import { Box, styled } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { toast } from 'react-toastify'
import { api, baseUrl } from '../../api'

const Spinner = styled('Box')({
  width: '100px',
  height: '100px',
  placeSelf: 'center',
  border: '5px solid #bdbdbd',
  borderTopColor: 'tomato',
  borderRadius: '50%',
  animation: 'rotate 1s infinite',
  '@keyframes rotate': {
    '100%': { transform: 'rotate(360deg)' }
  }
})

const Verify = () => {
  const [searchParams] = useSearchParams()
  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')
  const navigate = useNavigate()

  const verifyPayment = async () => {
    const response = await api.post('/api/order/verify', {
      success,
      orderId
    })
    if (response.data.success) {
      toast.success(response.data.message)
      setTimeout(() => {
        navigate('/myorders')
      }, 1500)
    } else {
      toast.error(response.data.message)
      setTimeout(() => {
        navigate('/')
      }, 1500)
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [])

  return (
    <Box sx={{ minHeight: '60vh', display: 'grid' }}>
      <Spinner></Spinner>
    </Box>
  )
}

export default Verify
