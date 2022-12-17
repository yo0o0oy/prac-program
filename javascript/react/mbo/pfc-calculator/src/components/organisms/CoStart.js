import React from 'react'
import { Stack } from '@mui/material'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

import CaButton from "../atoms/CaButton";
const flexBoxProps = {
  direction: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  spacing: 4,
}
const sx = {
  backgroundColor: '#AA2121',
  color: '#fff',
  fontSize: 14,
  paddingX: 6,
  py: 2,
  fontFamily: "'Hind', sans-serif",
  fontWeight: 'bold',
  transform: 'rotetate(-15deg)'
}

const RedTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} className="hind" classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: sx,
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.red,
  },
}));

const CoStart = props => {
  const ref = React.createRef()
  return (
    <Stack { ...flexBoxProps }>
      <h1 className="hind">PFC CALCULATOR</h1>
      <RedTooltip placement="top" arrow title="click to start!">
        <CaButton
          variant="contained"
          color="primary"
          text="はじめる"
          ref={ref}
          onClick={props.handleNext}
        />
      </RedTooltip>
    </Stack>
  )
}

export default CoStart
