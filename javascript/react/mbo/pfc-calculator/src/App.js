import React from 'react'
import { Box, Button, Stepper, Step, StepLabel, Grid, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme.js'
import sx from './sx.js'
import './font.css'
import questions from "./questions.json" assert { type: "json" }

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
      step: 0,
    }
  }

  onPrev = () => {
    let step = this.state.step
    if (step < 1) step = 1
    this.setState({ step: step - 1 })
  }

  onNext = () => {
    let step = this.state.step
    if (step > 3) step = 3
    this.setState({ step: step + 1 })
  }

  onRetry = () => {
    this.setState({ step: 0 })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Box
          className="App yu-gothic"
          bgcolor="background.main"
          sx={sx.app}
        >
          <CoContents
            step={this.state.step}
            onPrev={this.onPrev}
            onNext={this.onNext}
            onRetry={this.onRetry}
          />
        </Box>
      </ThemeProvider>
    )
  }
}

function CoContents(props) {
  const step =  props.step
  if (step === 0) {
    return (
      <Grid
        className="contents top"
        container
        bgcolor="transparent"
        sx={sx.contents}
        { ...containerProps }
      >
        <CoStart onNext={props.onNext}/>
      </Grid>
    )
  }
  return (
    <Grid
      className="contents"
      container
      { ...containerProps }
      bgcolor="background.paper"
      justifyContent="space-between"
      sx={sx.contents}
    >
      {step === 4 && <CoResult onRetry={props.onRetry} />}
      {step !== 4 && <React.Fragment>
        <CaStepper step={step} />
        <CmQuestion step={step} />
        <CmButtonGroup
          step={step}
          onPrev={props.onPrev}
          onNext={props.onNext}
        />
      </React.Fragment>}
    </Grid>
  )
}

class CoStart extends React.Component {
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
          onClick={this.props.onNext}
        >
          はじめる
        </Button>
     </Grid>
    )
  }
}

class CmQuestion extends React.Component {
  render() {
    const question = questions[this.props.step - 1].question + 'してください'
    return (
      <Grid
        container
        { ...containerProps }
        sx={{ gap: 4 }}
      >
        <h3>{question}</h3>
        <Grid
          container
          { ...containerProps }
          sx={{ gap: 1 }}
          direction="row"
        >
          <TextField label="身長" variant="outlined" />
          <span sx={{ width: 40 }}>cm</span>
        </Grid>
        <Grid
          container
          { ...containerProps }
          sx={{ gap: 1 }}
          direction="row"
        >
          <TextField label="体脂肪率" variant="outlined" />
          <span sx={{ width: 40 }}>%</span>
        </Grid>
      </Grid>
    )
  }
}

class CaStepper extends React.Component {
  render() {
    const steps = questions.map((q) => q.question)
    steps.push('計算結果を表示')
    return (
      <Stepper
        activeStep={this.props.step - 1}
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

class CmButtonGroup extends React.Component {
  render() {
    const prevText = this.props.step <= 1 ? 'TOPへ' : '前へ'
    const nextText = this.props.step >= 3 ? '計算結果へ' : '次へ'

    return (
      <Grid
        className="buttons"
        container
        { ...containerProps }
        direction="row"
        sx={{ gap: 7 }}
      >
        <Button
          variant="contained"
          color="secondary"
          sx={sx.button}
          onClick={this.props.onPrev}
        >
          {prevText}
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={sx.button}
          onClick={this.props.onNext}
        >
          {nextText}
        </Button>
      </Grid>
    )
  }
}

class CoResult extends React.Component {
  render() {
    return (
<Grid
        container
        { ...containerProps }
      >
        <h1 className="hind">計算結果</h1>
        <Button
          variant="contained"
          color="primary"
          sx={sx.button}
          onClick={this.props.onRetry}
        >
          もう一度
        </Button>
     </Grid>    )
  }
}

export default App
