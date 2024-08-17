import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery
} from '@mui/material'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import { assets } from '../../assets/assets'
import SocialMediaIcons from './SocialMediaIcons'

const STYLE_FOOTER_CONTENT = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '20px'
}
function Footer() {
  const isSmallDevice = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const isMediumDevice = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const isLargeDevice = useMediaQuery((theme) => theme.breakpoints.down('lg'))
  return (
    <Box
      id="contact us"
      sx={{
        backgroundColor: '#f4f4f6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: '20px 8vw',
        pt: '80px',
        mt: '100px'
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: isMediumDevice ? 'none' : '2fr 1fr 1fr',
          gap: '80px'
        }}
      >
        <Box sx={STYLE_FOOTER_CONTENT}>
          <Box
            component="img"
            src={assets.logo}
            alt=""
            width={
              isSmallDevice
                ? '100px'
                : isMediumDevice
                  ? '110px'
                  : isLargeDevice
                    ? '130px'
                    : '150px'
            }
          />
          <Typography sx={{ fontSize: isSmallDevice ? '10px' : '16px' }}>
            Join us to bring your family delicious and nutritious dishes.
          </Typography>
          <SocialMediaIcons />
        </Box>
        <Box sx={STYLE_FOOTER_CONTENT}>
          <Typography
            variant="h2"
            sx={{
              color: 'tomato',
              fontSize: isSmallDevice ? '1.5rem' : '2rem'
            }}
          >
            COMPANY
          </Typography>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>About Us</ListItem>
            <ListItem>Delivery</ListItem>
            <ListItem>Privacy Policy</ListItem>
          </List>
        </Box>
        <Box sx={STYLE_FOOTER_CONTENT}>
          <Typography
            variant="h2"
            sx={{
              color: 'tomato',
              fontSize: isSmallDevice ? '1.5rem' : '2rem'
            }}
          >
            GET IN TOUCH
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon
                sx={{
                  minWidth: '30px',
                  color: 'black'
                }}
              >
                <ContactPhoneIcon
                  sx={{
                    fontSize: isSmallDevice
                      ? '18px'
                      : isMediumDevice
                        ? '20px'
                        : '22px'
                  }}
                />
              </ListItemIcon>
              <ListItemText>(+84) 987 654 321</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon
                sx={{
                  minWidth: '30px',
                  color: 'black'
                }}
              >
                <ContactMailIcon
                  sx={{
                    fontSize: isSmallDevice
                      ? '18px'
                      : isMediumDevice
                        ? '20px'
                        : '22px'
                  }}
                />
              </ListItemIcon>
              <ListItemText>contact@tomato.com</ListItemText>
            </ListItem>
          </List>
        </Box>
      </Box>
      <Divider
        sx={{
          width: '100%',
          height: '2px',
          m: '20px 0',
          backgroundColor: 'gray',
          border: 'none'
        }}
      />
      <Typography textAlign={{ xs: 'center' }}>
        Copyright 2024 © Tomato.com - All rights reserved.
      </Typography>
    </Box>
  )
}

export default Footer
