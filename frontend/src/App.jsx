import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import { Route, Routes } from 'react-router-dom'
import Box from '@mui/material/Box'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import BackToTop from './components/BackToTop/BackToTop'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

function App() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <Box
        // maxWidth="xl"
        sx={{
          width: '80%',
          margin: 'auto'
        }}
      >
        <ToastContainer />
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart setShowLogin={setShowLogin} />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </Box>
      <Footer />
      <BackToTop />
    </ThemeProvider>
  )
}

export default App
