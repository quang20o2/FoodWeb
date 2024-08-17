import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { toast } from 'react-toastify'
import { api } from '../../api'

function LoginPopup({ setShowLogin }) {
  const { setToken, setName, isAdmin, setIsAdmin } = useContext(StoreContext)

  const [currState, setCurrState] = useState('Login')
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false
  })

  const [rememberAccount, setRememberAccount] = useState(false)

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
    setRememberAccount(!rememberAccount)
  }

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = ''
    if (currState === 'Login') {
      newUrl += '/api/user/login'
    } else {
      newUrl += '/api/user/register'
    }

    const response = await api.post(newUrl, data)

    if (response.data.success) {
      setToken(response.data.token)
      setName(response.data.name)
      setIsAdmin(response.data.isAdmin)
      if (rememberAccount) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('name', response.data.name)
        localStorage.setItem('isAdmin', response.data.isAdmin)
      } else {
        sessionStorage.setItem('token', response.data.token)
        sessionStorage.setItem('name', response.data.name)
        sessionStorage.setItem('isAdmin', response.data.isAdmin)
      }
      setShowLogin(false)
      toast.success(response.data.message)
    } else {
      alert(response.data.message)
    }
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#00000090',
        display: 'grid'
      }}
    >
      <Box
        component="form"
        onSubmit={onLogin}
        sx={{
          placeSelf: 'center',
          width: 'max(23vw, 300px)',
          color: '#808080',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          p: '25px 30px',
          borderRadius: '8px',
          fontSize: '14px',
          animation: 'fadeIn 0.5s'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'black'
          }}
        >
          <Typography variant="h2">{currState}</Typography>
          <Tooltip title="Close">
            <IconButton
              sx={{ color: 'black' }}
              onClick={() => setShowLogin(false)}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {currState === 'Login' ? (
            <>
              <TextField
                id="outlined-email"
                label="Your email"
                placeholder="Enter your email"
                type="email"
                size="small"
                required
                name="email"
                onChange={onChangeHandler}
                value={data.email}
              />
              <TextField
                id="outlined-password"
                label="Your password"
                placeholder="Enter your password"
                type="password"
                size="small"
                required
                name="password"
                onChange={onChangeHandler}
                value={data.password}
              />
              <FormControlLabel
                sx={{ mt: '-20px', mb: '-20px' }}
                control={
                  <Checkbox
                    checked={rememberAccount}
                    onChange={onChangeHandler}
                    name="rememberAccount"
                    defaultChecked
                    sx={{
                      color: 'tomato',
                      '&.Mui-checked': {
                        color: 'tomato'
                      }
                    }}
                  />
                }
                label="Remember my account"
              />
            </>
          ) : (
            <>
              <TextField
                id="outlined-name"
                label="Your name"
                placeholder="Enter your name"
                type="name"
                size="small"
                required
                name="name"
                onChange={onChangeHandler}
                value={data.name}
              />
              <TextField
                id="outlined-email"
                label="Your email"
                placeholder="Enter your email"
                type="email"
                size="small"
                required
                name="email"
                onChange={onChangeHandler}
                value={data.email}
              />
              <TextField
                id="outlined-password"
                label="Your password"
                placeholder="Enter your password"
                type="password"
                size="small"
                required
                name="password"
                onChange={onChangeHandler}
                value={data.password}
              />
            </>
          )}
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            p: '10px',
            borderRadius: '5px',
            color: 'white',
            backgroundColor: 'tomato',
            fontSize: '15px',
            '&:hover': {
              backgroundColor: '#fc5c3f'
            }
          }}
          disableRipple
        >
          {currState === 'Sign Up' ? 'Create account' : 'Login'}
        </Button>

        <FormControlLabel
          required
          control={
            <Checkbox
              sx={{
                color: 'tomato',
                '&.Mui-checked': {
                  color: 'tomato'
                }
              }}
            />
          }
          label="By continuing, i agree to the terms of use & privacy policy"
        />

        {currState === 'Login' ? (
          <Typography>
            Create a new account?{' '}
            <Typography
              sx={{
                display: 'inline-block',
                color: 'tomato',
                fontWeight: 500,
                cursor: 'pointer'
              }}
              onClick={() => setCurrState('Sign Up')}
            >
              Click here
            </Typography>
          </Typography>
        ) : (
          <Typography>
            Already have an account?{' '}
            <Typography
              sx={{
                display: 'inline-block',
                color: 'tomato',
                fontWeight: 500,
                cursor: 'pointer'
              }}
              onClick={() => setCurrState('Login')}
            >
              Login here
            </Typography>
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default LoginPopup
