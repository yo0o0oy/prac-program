import React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
// import questions from "./questions.json" assert { type: "json" }

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
    }
  }
  render() {
    return (
      <div className="App show">
        <div className="contents">
          <CaStepper></CaStepper>
          <Question></Question>
          <CmButtonGroup></CmButtonGroup>
        </div>
      </div>
    )
  }
}

class Start extends React.Component {
  render() {
    return (
      <div>
        <h1>PFC CALCULATOR</h1>
        <button onClick={alert('click!')}>はじめる</button>
      </div>
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
      <div className="stepper">
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    )
  }
}
class Question extends React.Component {
  render() {
    return <div className="question">question</div>
  }
}
class CmButtonGroup extends React.Component {
  render() {
    return (
      <div className="buttons">
        <Button variant="contained" color="secondary">前へ</Button>
        <Button variant="contained" color="primary">次へ</Button>
      </div>
    )
  }
}
export default App
