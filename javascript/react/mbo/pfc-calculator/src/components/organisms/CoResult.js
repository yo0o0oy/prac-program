import { Grid } from '@mui/material'
import CaButton from '../atoms/CaButton'
import CaResultTable from '../atoms/CaResultTable'

const flexBoxProps = {
  direction: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  spacing: 4,
}


const CoResult = props => {
  return (
    <Grid container { ...flexBoxProps }>
      <h1 className="hind">計算結果</h1>
      <CaResultTable values={props.values} />
      <CaButton
        variant="contained"
        color="primary"
        text="もう一度"
        onClick={props.handleRetry}
      />
    </Grid>
  )
}

export default CoResult