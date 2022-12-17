import React, { useState } from 'react'
import { Stack } from '@mui/material'
import CaStepper from "../atoms/CaStepper";
import CmButtonGroup from "../molecules/CmButtonGroup";
import CmQuestion from "../molecules/CmQuestion";
import CoStart from "../organisms/CoStart";
import CoResult from "../organisms/CoResult";

import questions from "../../assets/data/questions.json" assert { type: "json" }

const flexBoxProps = {
  direction: 'column', justifyContent: 'center',
  alignItems: 'center',
  spacing: 4,
}

const sx = {
  minHeight: 'calc(100vh - 80px)',
  borderRadius: 5,
  p: 8,
  boxSizing: 'border-box',
  position: 'relative',
  zIndex: 100,
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
        sx={sx}
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
      sx={sx}
    >
      {step === 4 && <CoResult values={values} handleRetry={handleRetry} />}
      {step !== 4 &&
        <React.Fragment>
          <CaStepper step={step} questions={questions} />
          <CmQuestion
            step={step}
            values={values}
            questions={questions}
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

export default CoContents
