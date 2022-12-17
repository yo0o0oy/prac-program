import React, { useState } from 'react'
import { Stack, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material'
import { ManRounded, WomanRounded } from '@mui/icons-material'

const flexBoxProps = {
  direction: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  spacing: 4,
}
const icons = { ManRounded, WomanRounded }

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

export default CaRadioGroup
