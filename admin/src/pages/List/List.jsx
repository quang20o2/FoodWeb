import {
  Box,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
  TablePagination
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api, baseUrl } from '../../api'

const FlexCol = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
})

const ResponsiveTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '1rem',
  [theme.breakpoints.down('sm')]: {
    padding: '5px 5px',
    fontSize: '12px'
  }
}))

const ResponsiveIconButton = styled(IconButton)(({ isSmallDevice }) => ({
  '& .MuiSvgIcon-root': {
    fontSize: isSmallDevice ? '1rem' : '1.25rem'
  }
}))

const List = () => {
  const [list, setList] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const theme = useTheme()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'))

  // fetch data
  const fetchList = async () => {
    const response = await api.get('/api/food/list')

    if (response.data.success) {
      setList(response.data.data)
    } else {
      toast.error('Error')
    }
  }

  const removeFood = async (foodId) => {
    const response = await api.post('/api/food/remove', { id: foodId })
    await fetchList()
    if (response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error('Error')
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <FlexCol
      className="list add flex-col"
      sx={{
        maxWidth: '100%',
        width: isSmallDevice ? '78%' : '70%',
        ml: isSmallDevice ? '10px' : 'max(5vw, 25px)',
        mt: isSmallDevice ? '20px' : '50px',
        color: '#6d6d6d',
        fontSize: '1rem'
      }}
    >
      <Typography variant="h4">All Foods List</Typography>
      <Box className="List-table">
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{
            border: '1px solid #cacaca'
          }}
        >
          <Table
            sx={{
              minWidth: isSmallDevice ? 'auto' : 650
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: '#f9f9f9'
                }}
              >
                <ResponsiveTableCell
                  isSmallDevice={isSmallDevice}
                  sx={{
                    display: isSmallDevice ? 'none' : 'table-cell'
                  }}
                >
                  #
                </ResponsiveTableCell>
                <ResponsiveTableCell isSmallDevice={isSmallDevice}>
                  Image
                </ResponsiveTableCell>
                <ResponsiveTableCell isSmallDevice={isSmallDevice}>
                  Name
                </ResponsiveTableCell>
                <ResponsiveTableCell isSmallDevice={isSmallDevice}>
                  Category
                </ResponsiveTableCell>
                <ResponsiveTableCell isSmallDevice={isSmallDevice}>
                  Price
                </ResponsiveTableCell>
                <ResponsiveTableCell isSmallDevice={isSmallDevice}>
                  Action
                </ResponsiveTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableRow key={index}>
                    <ResponsiveTableCell
                      isSmallDevice={isSmallDevice}
                      sx={{
                        display: isSmallDevice ? 'none' : 'table-cell'
                      }}
                    >
                      {index + 1}
                    </ResponsiveTableCell>
                    <ResponsiveTableCell isSmallDevice={isSmallDevice}>
                      <Box
                        component="img"
                        src={`${baseUrl}/images/` + item.image}
                        alt=""
                        sx={{
                          width: isSmallDevice ? '40px' : '60px',
                          display: 'block'
                        }}
                      />
                    </ResponsiveTableCell>

                    <ResponsiveTableCell isSmallDevice={isSmallDevice}>
                      {item.name}
                    </ResponsiveTableCell>
                    <ResponsiveTableCell isSmallDevice={isSmallDevice}>
                      {item.category}
                    </ResponsiveTableCell>
                    <ResponsiveTableCell isSmallDevice={isSmallDevice}>
                      ${item.price}
                    </ResponsiveTableCell>
                    <ResponsiveTableCell isSmallDevice={isSmallDevice}>
                      <ResponsiveIconButton
                        aria-label="delete"
                        onClick={() => removeFood(item._id)}
                        disableRipple
                      >
                        <DeleteIcon />
                      </ResponsiveIconButton>
                    </ResponsiveTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[8, 16]}
          component="div"
          count={list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </FlexCol>
  )
}

export default List
