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
  Select,
  InputLabel,
  MenuItem,
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

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

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

const CaParticles = () => {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, [])

  return (
    <Box className="ca-particles">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          interactivity: {
            events: {
              onClick: {
                enable: false,
              },
              onHover: {
                enable: false,
              },
              resize: true,
            },
          },
          particles: {
            collisions: {
              enable: false,
            },
            move: {
              direction: 'top',
              enable: true,
              bounce: false,
              outModes: {
                default: 'out',
              },
              random: false,
              speed: 4,
              straight: false,
            },
            number: {
              density: {
                enable: false,
                area: 0,
              },
              value: 40,
            },
            opacity: {
              value: 0.5,
              random: true,
            },
            shape: {
              type: 'image',
              image: {
                src: '/logo192.png',
              }
            },
            size: {
              value: { min: 30, max: 70 },
              random: true,
            },
          },
          detectRetina: true,
        }}
      />
    </Box>
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

const CmFields = props => {
  const question = props.question
  const handleChange = (fieldName, ev) => {
    props.handleChange({ [fieldName]: ev.target.value })
  }

  return (
    <ul className={`form no${question.no}`}>
      {question.fields.map((field, i) => {
        if (field.type === 'radio') {
          return (
            <li key={i}>
              <CaRadioGroup
                field={field}
                values={props.values}
                itemKey={question.key}
                handleChange={handleChange}
              />
            </li>
          )
        } else if (field.type === 'number') {
          return (
            <li key={i}>
              <TextField
                label={field.column}
                variant="outlined"
                onChange={handleChange.bind(this, field.name)}
              />
              <span>{field.suffix}</span>
            </li>
          )
        } else if (field.type === 'select') {
          return (
            <li key={i} className="select">
              <CaSelect
                key={i}
                field={field}
                values={props.values}
                handleChange={handleChange}
              />
            </li>
          )
        } else {
          return ''
        }
      })}
    </ul>
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

const CaSelect = props => {
  const field = props.field
  const values = props.values
  // eslint-disable-next-line
  const [value, setValue] = useState(values[field.name] || '')
  const handleChange = (ev) => {
    setValue(ev.target.value)
    props.handleChange(field.name, ev)
  }

  return (
    <FormControl>
      <InputLabel>{field.column}</InputLabel>
      <Select
        value={value}
        label={field.column}
        onChange={handleChange}
      >
        {field.items.map((item, i2) => {
          return <MenuItem key={i2} value={item.value}>{item.label.text}</MenuItem>
        })}
      </Select>
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
  const { sex, age, height, weight, fp, activityLevel, gfp } = props.values
  const joshibou = weight * (1 - fp / 100)
  const bmi = calcBmi(weight, height)
  const taisha = calcTaisha(sex, age, weight, height)
  const burnedKcal = Math.round(taisha * activityLevel)
  const underKcal = burnedKcal - 300 > taisha ? 300 : (burnedKcal - taisha)
  const intakeKcal = burnedKcal - underKcal
  const pfc = calcPfc(weight, joshibou, intakeKcal)
  const period = calcPeriod(weight, fp, gfp, underKcal)
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
                {fp && <li>体脂肪率<span>{fp}</span>％</li>}
                <li>BMI<span>{bmi}</span></li>
                <li>基礎代謝<span>{taisha}</span>kcal</li>
                <li>総消費カロリー<span>{burnedKcal}</span>kcal</li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>摂取カロリー</th>
            <td>
              <ul className="result-list">
                <li>合計<span>{intakeKcal}</span>kcal</li>
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
                      {pfc.map((e) => {
                        return (
                          <li key={e.type}>
                            <div className="name">
                              <div className="icon">{e.type}</div>
                              {e.name}
                            </div>
                            <div><span>{e.g}</span>g</div>
                            <div><span>{e.kcal}</span>kcal</div>
                          </li>
                        )
                      })}
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
  return Math.round(weight / ((height / 100) * (height / 100)) * 10) / 10
}

const calcTaisha = (sex, age, weight, height) => {
  // ハリス・ベネディクト方程式
  if (sex === 'M') {
    return Math.round(66 + weight * 13.7 + height * 5.0 - age * 6.8)
  }
  return Math.round(665.1 + weight * 9.6 + height * 1.7 - age * 7)
}

const calcPfc  = (weight, joshibou, intakeKcal) => {
  // TODO: 小数点第1位で切り上げ
  const pg = Math.round(weight * 2)
  const pkcal = pg * 4
  const fg = Math.round(joshibou * 0.8)
  const fkcal = fg * 9
  const ckcal = intakeKcal - pkcal - fkcal
  const cg = Math.round(ckcal / 4)

  return [
    { name: 'たんぱく質', type: 'P', g: pg, kcal: pkcal },
    { name: '脂質', type: 'F', g: fg, kcal: fkcal },
    { name: '炭水化物', type: 'C', g: cg, kcal: ckcal },
  ]
}

const calcPeriod  = (weight, fp, gfp, underKcal) => {
  const days = Math.round(weight * ((fp - gfp) / 100) * 7200 / underKcal)
  const from = new Date()
  const to = new Date()
  to.setDate(to.getDate() + days);
  return {
    from: { y: from.getFullYear(), m: from.getMonth() + 1, d: from.getDate() },
    to: { y: to.getFullYear(), m: to.getMonth() + 1, d: to.getDate() }
  }
}


export default App
