import { useState } from 'react'
import { FormControl, Select, InputLabel, MenuItem } from '@mui/material'

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

export default CaSelect