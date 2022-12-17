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

const CaButton = React.forwardRef((props, ref) => (
  <Button
    { ...props }
    ref={ref}
    sx={sx}
  >
    {props.text}
  </Button>
))

export default CaButton
