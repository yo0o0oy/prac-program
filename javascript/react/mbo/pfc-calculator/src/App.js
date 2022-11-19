import React from 'react'
import { Box, Button, Stepper, Step, StepLabel, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.js'
import sx from './sx.js'
import './font.css';
// import questions from "./questions.json" assert { type: "json" }

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
    }
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Box
          className="App yu-gothic"
          bgcolor="background.main"
          sx={sx.app}
        >
          <Grid
            className="contents"
            container
            display="flex"
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            bgcolor="background.paper"
            sx={sx.contents}
          >
            <CaStepper></CaStepper>
            <CmQuestion></CmQuestion>
            <CmButtonGroup></CmButtonGroup>
          </Grid>
          <Grid
            className="contents top"
            container
            display="flex"
            direction="column"
            justifyContent="center"
            alignItems="center"
            bgcolor="transparent"
            sx={sx.contents}
          >
            <Start></Start>
          </Grid>
        </Box>
    </ThemeProvider>
    )
  }
}

class Start extends React.Component {
  onClick = () => {
    alert('click!')
  }
  render() {
    return (
      <Grid
        container
        display="flex"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h1 className="hind">PFC CALCULATOR</h1>
        <Button
          variant="contained"
          color="primary"
          sx={sx.button}
          onClick={this.onClick}
        >
          はじめる
        </Button>
     </Grid>
    )
  }
}
class CaStepper extends React.Component {
  render() {
    const steps = [
      '性別を選択',
      '体重・体脂肪を入力',
      '理想の体脂肪率を選択',
      '計算結果を表示',
    ];
    return (
      <Stepper
        activeStep={1}
        alternativeLabel
        sx={{ width: 1 }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    )
  }
}
class CmQuestion extends React.Component {
  render() {
    return <div className="question">question</div>
  }
}
class CmButtonGroup extends React.Component {
  render() {
    return (
      <Grid
        className="buttons"
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ gap: 7 }}
      >
        <Button variant="contained" color="secondary" sx={sx.button}>前へ</Button>
        <Button variant="contained" color="primary" sx={sx.button}>計算結果へ</Button>
      </Grid>
    )
  }
}
export default App
