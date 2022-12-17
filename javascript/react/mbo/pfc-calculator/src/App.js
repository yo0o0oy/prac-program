import React, { useState } from 'react'
import { Box, Stack, Backdrop, CircularProgress } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import CaStepper from "./components/atoms/CaStepper";
import CaParticles from "./components/atoms/CaParticles";
import CmButtonGroup from "./components/molecules/CmButtonGroup";
import CmFields from "./components/molecules/CmFields";
import CoStart from "./components/organisms/CoStart";
import CoResult from "./components/organisms/CoResult";

import theme from './assets/js/theme.js'
import sx from './assets/js/sx.js'
import './assets/css/style.css'
import questions from "./assets/data/questions.json" assert { type: "json" }

const flexBoxProps = {
  direction: 'column', justifyContent: 'center',
  alignItems: 'center',
  spacing: 4,
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
          sx={sx.app}
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

const CoContents = () => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});

  const handlePrev = () => {
    setStep(step <= 0 ? 0 : step - 1)
  }

  const handleNext = () => {
    setStep(step >= 4 ? 4 : step + 1)
  }

  const handleRetry = () => {
    setStep(0)
  }

  const handleChange = (newValue) => {
    setValues({...values, ...newValue})
  }

  if (step === 0) {
    return (
      <Stack
        className="contents top"
        bgcolor="transparent"
        sx={sx.contents}
        { ...flexBoxProps }
      >
        <CoStart handleNext={handleNext} />
      </Stack>
    )
  }

  const prevText = step <= 1 ? 'TOPへ' : '前へ'
  const nextText = step >= 3 ? '計算結果へ' : '次へ'
  return (
    <Stack
      className="contents"
        { ...flexBoxProps }
      bgcolor="background.paper"
      justifyContent="space-between"
      sx={sx.contents}
    >
      {step === 4 && <CoResult values={values} handleRetry={handleRetry} />}
      {step !== 4 &&
        <React.Fragment>
          <CaStepper step={step} questions={questions} />
          <CmQuestion
            step={step}
            values={values}
            handleChange={handleChange}
          />
          <CmButtonGroup
            step={step}
            prevText={prevText}
            nextText={nextText}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </React.Fragment>
    }
    </Stack>
  )
}

const CmQuestion = props => {
  const question = questions[props.step - 1]
  return (
    <Stack { ...flexBoxProps } sx={{ width: '100%' }}>
      <h3>{question.q + 'してください'}</h3>
      <CmFields
        question={question}
        values={props.values}
        handleChange={props.handleChange}
      />
    </Stack>
  )
}


export default App
