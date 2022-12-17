import { Stack } from '@mui/material'
import CmFields from "../molecules/CmFields";
const flexBoxProps = {
  direction: 'column', justifyContent: 'center',
  alignItems: 'center',
  spacing: 4,
}

const CmQuestion = props => {
  const question = props.questions[props.step - 1]
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

export default CmQuestion
