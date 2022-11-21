import React from 'react'
import { Box, Button, Stepper, Step, StepLabel, Grid, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme.js'
import sx from './sx.js'
import './font.css'
// import questions from "./questions.json" assert { type: "json" }

const containerProps = {
  display: 'flex',
  direction: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 2,
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
            { ...containerProps }
            bgcolor="background.paper"
            justifyContent="space-between"
            sx={sx.contents}
          >
            <CaStepper step={this.state.step}></CaStepper>
            <CmQuestion step={this.state.step}></CmQuestion>
            <CmButtonGroup></CmButtonGroup>
          </Grid>
          <Grid
            className="contents top"
            container
            bgcolor="transparent"
            sx={sx.contents}
            { ...containerProps }
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
        { ...containerProps }
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
        activeStep={this.props.step}
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
    return (
      <Grid
        container
        { ...containerProps }
        sx={{ gap: 4 }}
      >
        <h3>身長・体脂肪を入力してください</h3>
        <Grid
          { ...containerProps }
          sx={{ gap: 1 }}
          direction="row"
        >
          <TextField label="身長" variant="outlined" ></TextField>
          <span sx={{ width: 40 }}>cm</span>
        </Grid>
        <Grid
          { ...containerProps }
          sx={{ gap: 1 }}
          direction="row"
        >
          <TextField label="体脂肪" variant="outlined" ></TextField>
          <span sx={{ width: 40 }}>%</span>
        </Grid>
      </Grid>
    )
  }
}
class CmButtonGroup extends React.Component {
  render() {
    return (
      <Grid
        className="buttons"
        container
        { ...containerProps }
        direction="row"
        sx={{ gap: 7 }}
      >
        <Button variant="contained" color="secondary" sx={sx.button}>前へ</Button>
        <Button variant="contained" color="primary" sx={sx.button}>計算結果へ</Button>
      </Grid>
    )
  }
}
export default App
