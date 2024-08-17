import { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import {
  Box,
  Button,
  Divider,
  IconButton,
  styled,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../api'

const ResponsiveTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '1rem',
  [theme.breakpoints.down('sm')]: {
    padding: '8px 12px',
    fontSize: '14px'
  }
}))

const ResponsiveIconButton = styled(IconButton)(({ isSmallDevice }) => ({
  width: isSmallDevice ? '40px' : '50px',
  height: isSmallDevice ? '40px' : '50px',
  '& .MuiSvgIcon-root': {
    fontSize: isSmallDevice ? '1rem' : '1.25rem'
  }
}))

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

function Cart({ setShowLogin }) {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, token } =
    useContext(StoreContext)

  const navigate = useNavigate()

  const [showLoginDialog, setShowLoginDialog] = useState(false)

  const handleProceedToPayment = () => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (!token) {
      // Nếu chưa đăng nhập, hiển thị dialog yêu cầu đăng nhập
      setShowLoginDialog(true)
    } else {
      // Nếu đã đăng nhập, tiến hành đặt hàng
      navigate('/order/')
    }
  }

  const handleLoginDialogClose = () => {
    setShowLoginDialog(false)
  }

  const handleLoginDialogConfirm = () => {
    // Gọi hàm setShowLogin để hiển thị popup đăng nhập
    setShowLogin(true)
    setShowLoginDialog(false)
  }

  const isSmallDevice = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const isMediumDevice = useMediaQuery((theme) => theme.breakpoints.down('md'))

  return (
    <Box sx={{ mt: '80px' }}>
      {/* List cart items */}
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ border: '1px solid #f5f5f5' }}
      >
        <Table sx={{ '& td, & th': { p: '12px 15px' } }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: '#f9f9f9'
              }}
            >
              <ResponsiveTableCell>Items</ResponsiveTableCell>
              <ResponsiveTableCell>Title</ResponsiveTableCell>
              <ResponsiveTableCell>Price</ResponsiveTableCell>
              <ResponsiveTableCell>Quantity</ResponsiveTableCell>
              <ResponsiveTableCell>Total</ResponsiveTableCell>
              <ResponsiveTableCell>Remove</ResponsiveTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ lineHeight: 0 }}>
            {food_list.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <TableRow key={item._id}>
                    <ResponsiveTableCell component="th" scope="row">
                      <Box
                        component="img"
                        src={baseUrl + '/images/' + item.image}
                        sx={{
                          width: isSmallDevice ? '40px' : '60px',
                          display: 'block'
                        }}
                      />
                    </ResponsiveTableCell>
                    <ResponsiveTableCell>{item.name}</ResponsiveTableCell>
                    <ResponsiveTableCell>${item.price}</ResponsiveTableCell>
                    <ResponsiveTableCell>
                      {cartItems[item._id]}
                    </ResponsiveTableCell>
                    <ResponsiveTableCell>
                      ${item.price * cartItems[item._id]}
                    </ResponsiveTableCell>
                    <ResponsiveTableCell>
                      <ResponsiveIconButton
                        aria-label="delete"
                        disableRipple
                        onClick={() => removeFromCart(item._id)}
                      >
                        <DeleteIcon />
                      </ResponsiveIconButton>
                    </ResponsiveTableCell>
                  </TableRow>
                )
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Cart Bottom */}
      <Box
        sx={{
          mt: '80px',
          display: 'flex',
          gap: 'max(12vw, 20px)',
          flexDirection: isMediumDevice ? 'column' : 'none'
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
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
            onClick={handleProceedToPayment}
          >
            PROCEED TO CHECKOUT
          </Button>

          <Dialog open={showLoginDialog} onClose={handleLoginDialogClose}>
            <DialogTitle>Login Required</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You need to login to proceed with the payment.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleLoginDialogClose}>Cancel</Button>
              <Button onClick={handleLoginDialogConfirm} autoFocus>
                Login
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        <Box
          sx={{
            flex: 1,
            order: isMediumDevice ? '-1' : 'none'
          }}
        >
          <Typography sx={{ color: '#555' }}>
            If you have a promo code. Enter it here
          </Typography>
          <Box
            sx={{
              mt: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#eaeaea'
            }}
          >
            <TextField
              hiddenLabel
              placeholder="Enter promo code"
              variant="filled"
              size="small"
              fullWidth
              sx={{
                background: 'transparent',
                border: 'none',
                outline: 'none'
              }}
            />
            <Button
              variant="contained"
              sx={{
                width: 'max(10vw, 150px)',
                p: '10px 5px',
                backgroundColor: 'black',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#333'
                }
              }}
              disableRipple
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Cart
