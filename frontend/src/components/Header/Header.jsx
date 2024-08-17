import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledBox = styled(Box)({
  backgroundImage: 'url(/header_img.png)',
  m: '30px auto',
  height: '34vw',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  position: 'relative',
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0
    },
    '100%': {
      opacity: 1
    }
  }
})

const StyledContentBox = styled(Box)({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '1.5vw',
  bottom: '12%',
  left: '6vw',
  opacity: 0,
  animation: 'fadeInUp 0.8s ease-in-out 0.5s forwards',
  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
})

const StyledButton = styled(Button)({
  color: '#747474',
  fontWeight: 500,
  backgroundColor: 'white',
  borderRadius: '50px',
  '&:hover': {
    backgroundColor: '#f5f5f5'
  },
  animation: 'fadeInUp 0.8s ease-in-out 0.5s forwards'
})

function Header() {
  const isSmallDevice = useMediaQuery((theme) => theme.breakpoints.down('sm')) // Áp dụng cho màn hình > 600px
  const isMediumDevice = useMediaQuery((theme) => theme.breakpoints.down('md')) // Áp dụng cho màn hình > 900px

  return (
    <StyledBox>
      <StyledContentBox
        maxWidth={isSmallDevice ? '70%' : isMediumDevice ? '70%' : '50%'}
      >
        <Typography
          variant="h2"
          sx={{
            color: 'white',
            fontSize: isSmallDevice ? 'max(2vw, 24px)' : 'max(4.5vw,30px)'
          }}
        >
          Order your favorite food here
        </Typography>
        <Typography
          sx={{
            fontSize: '1vw',
            color: 'white',
            display: isSmallDevice ? 'none' : 'block'
          }}
        >
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your craving and elevate your dining experience,
          one delicious meal at a time.
        </Typography>
        <StyledButton
          disableRipple
          sx={{
            fontSize: isSmallDevice ? '10px' : '15px',
            padding: isSmallDevice ? '0.8vw 1.8vw' : '1vw 2.3vw'
          }}
        >
          View Menu
        </StyledButton>
      </StyledContentBox>
    </StyledBox>
  )
}

export default Header
