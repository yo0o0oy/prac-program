import React, { useState } from 'react'
import { Box, Button, Stepper, Step, StepLabel, Grid, Stack, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme.js'
import sx from './sx.js'
import './font.css'
import questions from "./questions.json" assert { type: "json" }

const flexBoxProps = {
  direction: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  spacing: 4,
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        className="App yu-gothic"
        bgcolor="background.main"
        sx={sx.app}
      >
        <CoContents />
      </Box>
    </ThemeProvider>
  )
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
        <CoStart handleNext={handleNext}/>
      </Stack>
    )
  }
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
          <CaStepper step={step} />
          <CmQuestion
            step={step}
            values={values}
            handleChange={handleChange}
          />
          <CmButtonGroup
            step={step}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </React.Fragment>
      }
    </Stack>
  )
}

const CoStart = props => {
  return (
    <Stack { ...flexBoxProps }>
      <h1 className="hind">PFC CALCULATOR</h1>
      <Button
        variant="contained"
        color="primary"
        sx={sx.button}
        onClick={props.handleNext}
      >
        はじめる
      </Button>
    </Stack>
  )
}

const CmQuestion = props => {
  const question = questions[props.step - 1]
  return (
    <Stack { ...flexBoxProps }>
      <h3>{question.q + 'してください'}</h3>
      <CmFields
        question={question}
        values={props.values}
        handleChange={props.handleChange}
      />
    </Stack>
  )
}

const CmFields = props => {
  const question = props.question
  const handleChange = (fieldName, ev) => {
    props.handleChange({ [fieldName]: ev.target.value })
  }

  return (
    <React.Fragment>
      {question.fields.map((field, i) => {
        if (field.type === 'radio') {
          return (
            <CaRadioGroup
              key={i}
              field={field}
              values={props.values}
              itemKey={question.key}
              handleChange={handleChange}
            />
          )
        } else if (field.type === 'number') {
          return (
            <Stack
              key={i}
              { ...flexBoxProps }
              direction="row"
            >
              <TextField
                label={field.column}
                variant="outlined"
                // FIXME: 値が反映されない
                onChange={handleChange.bind(this, field.name)}
              />
             <span sx={{ width: 40 }}>{field.suffix}</span>
            </Stack>
          )
        } else {
          return ''
        }
      })}
    </React.Fragment>
  )
}

const CaRadioGroup = props => {
  const field = props.field
  const values = props.values
  const items = props.itemKey ? field.items[values[props.itemKey]] : field.items
  // eslint-disable-next-line
  const [value, setValue] = useState(values[field.name])

  return (
    <FormControl>
      {field.column && <FormLabel>{field.column}</FormLabel>}
      <RadioGroup
        name={field.name}
        value={value}
        onChange={props.handleChange.bind(this, field.name)}
        row
        sx={{ gap: 4 }}
      >
        {items.map((item, i2) => {
          return (
            <Stack { ...flexBoxProps } spacing={0} key={i2}>
              {item.label.img && <img height="100" src={item.label.img} alt="" />}
              <FormControlLabel
                value={item.value}
                control={<Radio />}
                label={
                  <React.Fragment>
                    {item.label.icon && 'icon'}
                    {item.label.text}
                  </React.Fragment>
                }
              />
            </Stack>
          )
        })}
      </RadioGroup>
    </FormControl>
  );
}

const CaStepper = props => {
  const steps = questions.map((question) => question.q)
  steps.push('計算結果を表示')
  return (
    <Stepper
      activeStep={props.step - 1}
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

const CmButtonGroup = props => {
  const prevText = props.step <= 1 ? 'TOPへ' : '前へ'
  const nextText = props.step >= 3 ? '計算結果へ' : '次へ'

  return (
    <Stack
      className="buttons"
      { ...flexBoxProps }
      direction="row"
    >
      <Button
        variant="contained"
        color="secondary"
        sx={sx.button}
        onClick={props.handlePrev}
      >
        {prevText}
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={sx.button}
        onClick={props.handleNext}
      >
        {nextText}
      </Button>
    </Stack>
  )
}

const CoResult = props => {
  return (
    <Grid container { ...flexBoxProps }>
      <h1 className="hind">計算結果</h1>
      <ul>
        {Object.keys(props.values).map((key) => {
          return <li key={key}>{key}: {props.values[key]}</li>
        })}
      </ul>
      <Button
        variant="contained"
        color="primary"
        sx={sx.button}
        onClick={props.handleRetry}
      >
        もう一度
      </Button>
    </Grid>
  )
}

export default App
