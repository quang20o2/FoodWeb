import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import Box from '@mui/material/Box'
import Navbar from './components/Navbar/Navbar'
import { Divider } from '@mui/material'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <ToastContainer />
        <Navbar />
        <Divider />
        <Box
          sx={{
            display: 'flex'
          }}
        >
          <Sidebar />
          <Routes>
            <Route path="add" element={<Add />} />
            <Route path="list" element={<List />} />
            <Route path="orders" element={<Orders />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
