import { createTheme } from '@mui/material/styles'

const theme =  createTheme({
  palette: {
    primary: {
      main: '#2977B1',
    },
    secondary: {
      main: '#ABABAB',
    },
    background: {
      main: '#D5E7EA',
      paper: '#FFFFFF',
      opacity: '#E2EEF0',
    },
    text: {
      primary: '#555555',
      reverse: '#FFFFFF'
    },
    common: {
      white: '#FFFFFF',
      red: '#AA2121',
    },
  },
  spacing: 5,
})
export default theme
