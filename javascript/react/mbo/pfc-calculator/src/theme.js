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
      main: '#9FC6CE',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#555555',
      reverse: '#FFFFFF'
    },
  },
  spacing: 5,
})
export default theme
