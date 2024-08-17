import { outlinedInputClasses } from '@mui/material'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  typography: {
    fontFamily: ['Outfit', 'sans-serif'].join(',')
  },

  colorSchemes: {
    light: {
      palette: {
        // primary: teal,
        // secondary: deepOrange
      }
    },
    dark: {
      palette: {
        // primary: cyan,
        // secondary: orange
      }
    }
  },
  components: {
    MuiCssBaseline: {
      // styleOverrides: {
      //   body: {
      //     '*::-webkit-scrollbar': {
      //       width: '5px',
      //       height: '6px'
      //     },
      //     '*::-webkit-scrollbar-thumb': {
      //       backgroundColor: '#dcdde1',
      //       borderRadius: '5px'
      //     },
      //     '*::-webkit-scrollbar-thumb:hover': {
      //       backgroundColor: 'white'
      //     }
      //   }
      // }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          lineHeight: '1.5',
          borderWidth: '1px',
          minWidth: 0
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-h2': { fontWeight: 500 }
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: { width: 'auto', cursor: 'pointer' }
      }
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '--TextField-brandBorderColor': '#E0E3E7',
          '--TextField-brandBorderHoverColor': '#B2BAC2',
          '--TextField-brandBorderFocusedColor': '#ff6347',
          '& label.Mui-focused': {
            color: 'var(--TextField-brandBorderFocusedColor)'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'var(--TextField-brandBorderColor)'
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--TextField-brandBorderHoverColor)'
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--TextField-brandBorderFocusedColor)'
          }
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          '&::before, &::after': {
            borderBottom: 'none'
          },
          '&:hover:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: 'none'
          },
          '&.Mui-focused:after': {
            borderBottom: 'none'
          }
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&::before': {
            borderBottom: 'none'
          },
          '&:hover:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: 'none'
          },
          '&.Mui-focused:after': {
            borderBottom: 'none'
          }
        }
      }
    }
  }

  // ...other properties
})

export default theme
