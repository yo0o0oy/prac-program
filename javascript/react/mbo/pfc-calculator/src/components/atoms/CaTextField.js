import React from 'react'
import { TextField } from '@mui/material'

const CaTextField = props => {
  return (
    <React.Fragment>
      <TextField
        label={props.field.column}
        variant="outlined"
        onChange={props.onChange}
      />
      <span>{props.field.suffix}</span>
    </React.Fragment>
  )
}

export default CaTextField
