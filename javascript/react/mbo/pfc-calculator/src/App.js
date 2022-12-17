import React from 'react'
import { Box, Backdrop, CircularProgress } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import CaParticles from "./components/atoms/CaParticles";
import CoContents from "./components/organisms/CoContents";

import theme from './assets/js/theme.js'
import './assets/css/style.css'

const sx = {
  width: 1,
  minHeight: '100vh',
  p: 8,
  color: 'text.primary',
  fontSize: '20px',
  boxSizing: 'border-box',
  position: 'relative',
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
  }
  componentDidMount() {
    this.setState({ open: false })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Box
          className="App yu-gothic"
          bgcolor="background.main"
          sx={sx}
        >
          <CaParticles />
          <CoContents />
        </Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={this.state.open}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      </ThemeProvider>
    )
  }
}

export default App
