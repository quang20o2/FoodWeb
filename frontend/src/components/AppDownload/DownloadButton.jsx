import { Box } from '@mui/material'

const DownloadButtons = ({ playStoreImage, appStoreImage, marginTop }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 'max(2vw, 10px)',
        mt: marginTop
      }}
    >
      <Box
        component="img"
        src={playStoreImage}
        alt=""
        sx={{
          width: 'max(30vw, 120px)',
          maxWidth: '180px',
          transition: '0.5s',
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }}
      />
      <Box
        component="img"
        src={appStoreImage}
        alt=""
        sx={{
          width: 'max(30vw, 120px)',
          maxWidth: '180px',
          transition: '0.5s',
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }}
      />
    </Box>
  )
}

export default DownloadButtons
