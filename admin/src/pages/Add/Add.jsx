import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  styled,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const CustomButton = styled(Button)({
  width: '150px',
  height: '100px',
  backgroundColor: '#fff',
  border: '1px dashed #000',
  boxShadow: 'none',
  color: 'gray',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '12px 16px',
  '&:hover': {
    backgroundColor: '#fff',
    border: '1px dashed #000',
    boxShadow: 'none'
  }
})

const FlexCol = styled(
  FormControl,
  Box
)({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
})

const AddProductStyles = {
  width: 'max(40%, 280px)',
  '& .MuiInputBase-input': {
    p: '10px'
  }
}

const category = [
  { value: 'Salad', label: 'Salad' },
  { value: 'Rolls', label: 'Rolls' },
  { value: 'Deserts', label: 'Deserts' },
  { value: 'Sandwich', label: 'Sandwich' },
  { value: 'Cake', label: 'Cake' },
  { value: 'Pure Veg', label: 'Pure Veg' },
  { value: 'Pasta', label: 'Pasta' },
  { value: 'Noodles', label: 'Noodles' }
]

const CusTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#b2bec3'
    },
    '&:hover fieldset': {
      borderColor: '#2d3436'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2d3436'
    }
  }
})

const AddProduct = () => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad'
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', Number(data.price))
    formData.append('category', data.category)
    formData.append('image', image)
    const response = await api.post('/api/food/add', formData)
    if (response.data.success) {
      setData({
        name: '',
        description: '',
        price: '',
        category: 'Salad'
      })
      setImage(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }

  const isSmallDevice = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const isMediumDevice = useMediaQuery((theme) => theme.breakpoints.down('md'))

  return (
    <Box
      className="add"
      sx={{
        width: '70%',
        ml: 'max(5vw, 25px)',
        mt: '50px',
        color: '#6d6d6d',
        fontSize: '1rem'
      }}
    >
      <FlexCol
        className="flex-col"
        sx={{ gap: '20px' }}
        onSubmit={onSubmitHandler}
      >
        <FlexCol
          className="add-img-upload flex-col"
          sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}
        >
          <Typography>Upload Image</Typography>
          <CustomButton
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                style={{ maxWidth: '100%', height: 'auto', maxHeight: '100px' }}
              />
            ) : (
              <>
                <CloudUploadIcon />
                Upload
              </>
            )}
            <VisuallyHiddenInput
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
            />
          </CustomButton>
        </FlexCol>
        <FlexCol className="add-product-name flex-col" sx={AddProductStyles}>
          <Typography>Product Name</Typography>
          <CusTextField
            name="name"
            placeholder="Type here"
            variant="outlined"
            onChange={onChangeHandler}
            value={data.name}
            required
          />
        </FlexCol>
        <FlexCol
          className="add-product-description flex-col"
          sx={AddProductStyles}
        >
          <Typography>Product Description</Typography>
          <CusTextField
            name="description"
            multiline
            rows={6}
            placeholder="Write content here"
            variant="outlined"
            onChange={onChangeHandler}
            value={data.description}
            required
          />
        </FlexCol>
        <Box
          className="add-category-price"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: isSmallDevice ? '15px' : '30px',
            maxWidth: isSmallDevice ? '100%' : isMediumDevice ? '60%' : '40%'
          }}
        >
          <FlexCol
            className="add-category flex-col"
            sx={{ width: '50%', '& .MuiInputBase-input': { p: '10px' } }}
          >
            <Typography>Product Category</Typography>
            <CusTextField
              name="category"
              select
              required
              SelectProps={{ native: true }}
              value={data.category}
              onChange={onChangeHandler}
            >
              {category.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </CusTextField>
          </FlexCol>
          <FlexCol
            className="add-price flex-col"
            sx={{ width: '50%', '& .MuiInputBase-input': { p: '10px' } }}
          >
            <Typography>Product Price</Typography>
            <CusTextField
              name="price"
              type="number"
              variant="outlined"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                )
              }}
              onChange={onChangeHandler}
              value={data.price}
            />
          </FlexCol>
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{
            maxWidth: '120px',
            border: 'none',
            p: '10px',
            backgroundColor: 'black',
            color: 'white',
            '&:hover': { backgroundColor: 'black' }
          }}
          onClick={onSubmitHandler}
        >
          ADD
        </Button>
      </FlexCol>
    </Box>
  )
}

export default AddProduct
