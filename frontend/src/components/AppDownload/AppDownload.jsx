import { Box, Typography } from '@mui/material'
import { assets } from '../../assets/assets'
import DownloadButtons from './DownloadButton'

function AppDownload() {
  return (
    <Box
      id="mobile app"
      sx={{
        m: 'auto auto',
        mt: '100px',
        textAlign: 'center'
      }}
    >
      <Typography
        sx={{
          fontSize: 'max(3vw,20px)',
          fontWeight: 500
        }}
      >
        For Better Experience Download
        <br />
        Tomato App
      </Typography>
      <DownloadButtons
        playStoreImage={assets.play_store}
        appStoreImage={assets.app_store}
        marginTop="40px"
      />
    </Box>
  )
}

export default AppDownload
