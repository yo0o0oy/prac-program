import { Stack } from '@mui/material'
import CaButton from '../atoms/CaButton'

const CmButtonGroup = props => {
  return (
    <Stack
      className="buttons"
      justifyContent="center"
      alignItems="center"
      spacing={4}
      direction="row"
    >
      <CaButton
        variant="contained"
        color="secondary"
        text={props.prevText}
        onClick={props.handlePrev}
      />
      <CaButton
        variant="contained"
        color="primary"
        text={props.nextText}
        onClick={props.handleNext}
      />
    </Stack>
  )
}

export default CmButtonGroup
