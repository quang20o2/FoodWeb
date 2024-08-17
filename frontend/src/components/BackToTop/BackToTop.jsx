import { useState, useEffect } from 'react'
import { Fab, Tooltip, useMediaQuery, Zoom } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

function UpToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const isSmallDevice = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  // Kiểm tra vị trí cuộn của trang web để hiện/ẩn nút "Lên đầu trang"
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // Hàm xử lý khi click vào nút "Lên đầu trang"
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Tooltip title="Back to top">
      <Zoom in={isVisible}>
        <Fab
          onClick={scrollToTop}
          size="small"
          aria-label="scroll back to top"
          sx={{
            width: isSmallDevice ? '20px' : '36px',
            height: isSmallDevice ? '20px' : '36px',
            minHeight: '20px',
            position: 'fixed',
            bottom: isSmallDevice ? 50 : 100,
            right: isSmallDevice ? 10 : 30,
            backgroundColor: 'tomato',
            color: '#fff',
            '&:hover': {
              backgroundColor: 'tomato'
            }
          }}
        >
          <KeyboardArrowUpIcon
            sx={{ fontSize: isSmallDevice ? '8px' : '1.5rem' }}
          />
        </Fab>
      </Zoom>
    </Tooltip>
  )
}

export default UpToTop
