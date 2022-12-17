import React from 'react'
import { Stack, Accordion, AccordionSummary, AccordionDetails} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
const icons = { ExpandLess, ExpandMore }

const calcBmi = (weight, height) => {
  return Math.round(weight / ((height / 100) * (height / 100)) * 10) / 10
}

const calcTaisha = (sex, age, weight, height) => {
  // ハリス・ベネディクト方程式
  if (sex === 'M') {
    return Math.round(66 + weight * 13.7 + height * 5.0 - age * 6.8)
  }
  return Math.round(665.1 + weight * 9.6 + height * 1.7 - age * 7)
}

const calcPfc  = (weight, joshibou, intakeKcal) => {
  const pg = Math.round(weight * 2)
  const pkcal = pg * 4
  const fg = Math.round(joshibou * 0.8)
  const fkcal = fg * 9
  const ckcal = intakeKcal - pkcal - fkcal
  const cg = Math.round(ckcal / 4)

  return [
    { name: 'たんぱく質', type: 'P', g: pg, kcal: pkcal },
    { name: '脂質', type: 'F', g: fg, kcal: fkcal },
    { name: '炭水化物', type: 'C', g: cg, kcal: ckcal },
  ]
}

const calcPeriod  = (weight, fp, gfp, underKcal) => {
  const days = Math.round(weight * ((fp - gfp) / 100) * 7200 / underKcal)
  const from = new Date()
  const to = new Date()
  to.setDate(to.getDate() + days);
  return {
    from: { y: from.getFullYear(), m: from.getMonth() + 1, d: from.getDate() },
    to: { y: to.getFullYear(), m: to.getMonth() + 1, d: to.getDate() }
  }
}

const CaResultTable = props => {
  const { sex, age, height, weight, fp, activityLevel, gfp } = props.values
  const joshibou = weight * (1 - fp / 100)
  const bmi = calcBmi(weight, height)
  const taisha = calcTaisha(sex, age, weight, height)
  const burnedKcal = Math.round(taisha * activityLevel)
  const underKcal = burnedKcal - 300 > taisha ? 300 : (burnedKcal - taisha)
  const intakeKcal = burnedKcal - underKcal
  const pfc = calcPfc(weight, joshibou, intakeKcal)
  const period = calcPeriod(weight, fp, gfp, underKcal)
  const [isExpanded, setIsExpanded] = React.useState(false)
  const handleChange = () => (event, val) => setIsExpanded(val)

  let btnText = '内訳を表示'
  let btnIcon = 'ExpandMore'
  if (isExpanded) {
    btnText = '内訳を非表示'
    btnIcon = 'ExpandLess'
  }
  return (
    <table className="result-table">
      <tbody>
        <tr>
          <th>あなた</th>
          <td>
            <ul className="result-list">
              <li>身長<span>{height}</span>cm</li>
              <li>体重<span>{weight}</span>kg</li>
              {fp && <li>体脂肪率<span>{fp}</span>％</li>}
              <li>BMI<span>{bmi}</span></li>
              <li>基礎代謝<span>{taisha}</span>kcal</li>
              <li>総消費カロリー<span>{burnedKcal}</span>kcal</li>
            </ul>
          </td>
        </tr>
        <tr>
          <th>摂取カロリー</th>
          <td>
            <ul className="result-list">
              <li>合計<span>{intakeKcal}</span>kcal</li>
            </ul>
            <Accordion elevation={0} expanded={isExpanded} onChange={handleChange(true)}>
              <AccordionSummary>
                <button className="btn-toggle">
                  <span>{btnText}</span>
                  {React.createElement(icons[btnIcon])}
                </button>
              </AccordionSummary>
              <AccordionDetails>
                <Stack>
                  <ul className="result-list pfc">
                    {pfc.map((e) => {
                      return (
                        <li key={e.type}>
                          <div className="name">
                            <div className="icon">{e.type}</div>
                            {e.name}
                          </div>
                          <div><span>{e.g}</span>g</div>
                          <div><span>{e.kcal}</span>kcal</div>
                        </li>
                      )
                    })}
                  </ul>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </td>
        </tr>
        <tr>
          <th>実施期間</th>
          <td>
            <ul className="result-list">
              <li>開始<span>{period.from.y}</span>年<span>{period.from.m}</span>月<span>{period.from.d}</span>日</li>
              <li>終了<span>{period.to.y}</span>年<span>{period.to.m}</span>月<span>{period.to.d}</span>日</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default CaResultTable
