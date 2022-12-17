import React from 'react'
import { Button } from '@mui/material'

const sx = {
  minWidth: 200,
  height: 45,
  borderRadius: 8,
  color: 'text.reverse',
  fontWeight: 'bold',
  boxShadow: 0,
  transition: '0.3s'
}

const CaButton = (props) => {
  return (
    <Button
      variant={props.variant}
      color={props.color}
      sx={sx}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  )
}

export default CaButton
