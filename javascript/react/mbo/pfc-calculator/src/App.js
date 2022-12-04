import React, { useState } from 'react'
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Stack,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Backdrop,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { ThemeProvider, styled } from '@mui/material/styles'
import { ManRounded, WomanRounded, ExpandLess, ExpandMore } from '@mui/icons-material'
import theme from './theme.js'
import sx from './sx.js'
import './style.css'
import questions from "./questions.json" assert { type: "json" }

const icons = { ManRounded, WomanRounded, ExpandLess, ExpandMore }
const flexBoxProps = {
  direction: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  spacing: 4,
}
const RedTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} className="hind" classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: sx.tooltip,
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.red,
  },
}));

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
      <RedTooltip placement="top" arrow title="click to start!">
        <Button
          variant="contained"
          color="primary"
          sx={sx.button}
          onClick={props.handleNext}
        >
          はじめる
        </Button>
      </RedTooltip>
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
                  <Stack { ...flexBoxProps } direction="row">
                    {item.label.icon && React.createElement(icons[item.label.icon])}
                    {item.label.text}
                  </Stack>
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
  const { sex, age, height, weight, fatPercentage, activityLevel, goal } = props.values
  const bmi = calcBmi(weight, height)
  const taisha = calcTaisha(sex, age, weight, height)
  const burnedCalorie = taisha * activityLevel
  const period = calcPeriod()
  const [isExpanded, setIsExpanded] = React.useState(false)
  const handleChange = () => (event, val) => setIsExpanded(val)

  let btnText = '内訳を表示'
  let btnIcon = 'ExpandMore'
  if (isExpanded) {
    btnText = '内訳を非表示'
    btnIcon = 'ExpandLess'
  }
  return (
    <Grid container { ...flexBoxProps }>
      <h1 className="hind">計算結果</h1>
      <table className="result-table">
        <tbody>
          <tr>
            <th>あなた</th>
            <td>
              <ul className="result-list">
                <li>身長<span>{height}</span>cm</li>
                <li>体重<span>{weight}</span>kg</li>
                <li>体脂肪率<span>{fatPercentage}</span>％</li>
                <li>BMI<span>{bmi}</span></li>
                <li>基礎代謝<span>{taisha}</span>kcal</li>
                <li>総消費カロリー<span>{burnedCalorie}</span>kcal</li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>摂取カロリー</th>
            <td>
              <ul className="result-list">
                <li>合計<span>{calcIntakeCalorie()}</span>kcal</li>
              </ul>
              <Accordion elevation={0} expanded={isExpanded} onChange={handleChange(true)}>
                <AccordionSummary>
                  <button className="btn-toggle">
                    <span>{btnText}</span>
                    {React.createElement(icons[btnIcon])}
                  </button>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack>
                    <ul className="result-list pfc">
                      <li>
                        <div className="name">
                          <div className="icon">P</div>
                          たんぱく質
                        </div>
                        <div><span>100</span>g</div>
                        <div><span>400</span>kcal</div>
                      </li>
                      <li>
                        <div className="name">
                          <div className="icon">F</div>
                          脂質
                        </div>
                        <div><span>30</span>g</div>
                        <div><span>270</span>kcal</div>
                      </li>
                      <li>
                        <div className="name">
                          <div className="icon">C</div>
                          炭水化物
                        </div>
                        <div><span>150</span>g</div>
                        <div><span>600</span>kcal</div>
                      </li>
                    </ul>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </td>
          </tr>
          <tr>
            <th>実施期間</th>
            <td>
              <ul className="result-list">
                <li>開始<span>{period.from.y}</span>年<span>{period.from.m}</span>月<span>{period.from.d}</span>日</li>
                <li>終了<span>{period.to.y}</span>年<span>{period.to.m}</span>月<span>{period.to.d}</span>日</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
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

const calcBmi = (weight, height) => {
  // TODO: 小数点第1位で切り上げ
  return weight / ((height / 100) * (height / 100))
}

const calcTaisha = (sex, age, weight, height) => {
  // ハリス・ベネディクト方程式
  if (sex === 'M') {
    return 66 + weight * 13.7 + height * 5.0 - age * 6.8
  }
  return 665.1 + weight * 9.6 + height * 1.7 - age * 7
}

const calcBurnedCalorie  = (sex, age, weight, height, activityLevel) => {
  // TODO: 総消費カロリー計算処理
  return calcTaisha(sex, age, weight, height) * activityLevel
}

const calcIntakeCalorie  = () => {
  // TODO: 摂取カロリー計算処理
  return 1270
}

const amountPerEach  = (type = 'p') => {
  // TODO: 各栄養素の摂取量計算処理
  return { g: 100, kcal: 400 }
}

const calcPeriod  = (type = 'start') => {
  // TODO: 実施期間計算処理
  return {
    from: { y: 2022, m: 12, d: 12 },
    to: { y: 2022, m: 12, d: 31 },
  }
}


export default App
