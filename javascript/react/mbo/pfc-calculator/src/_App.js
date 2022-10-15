import React, { useMemo } from 'react'
import questions from "./questions.json" assert { type: "json" }
import './App.css'

class Question extends React.Component {
  constructor(props) {
    super(props)
  }
  handleChange = (ev) => {
    const [val, setVal] = React.useState('cat');
    const handleChange = e => setVal(e.target.value);
  }

  render() {
    const question = questions[this.props.no - 1]

    return (
      <div className="question">
        <div className="q">{question.question}</div>
        <div className="a">
          {question.forms.map((form, i) => {
            switch (form.type) {
              case 'radio':
                const items = Array.isArray(form.items) ? form.items : form.items[this.props[question.formKey]]
                const handleChange = (ev) => {
                  console.log(ev)
                }
                return (
                  <React.Fragment key={i}>
                    {items.map((item, i2) => {
                      return (
                        <label key={i2}>
                          <input
                            name={form.name}
                            type={form.type}
                            value={item.value}
                            onChange={handleChange}
                            checked={this.props.values[form.name] === item.value}
                          />
                          <img src={item.label.img} />
                          {item.label.text}
                        </label>
                      )
                    })}
                  </React.Fragment>
                )
              case 'number':
                return (
                  <dl key={i}>
                    <dt>{form.column}</dt>
                    <dd><input name={form.name} type={form.type} />{form.suffix}</dd>
                  </dl>
                )
              default:
                return (
                  <div>
                    {form.type}<br />
                    {form.name}
                  </div>
                )
            }
          })}
        </div>
        <NextButton no={this.props.no} onClick={this.props.onClick}></NextButton>
      </div>
    )
  }
}

class NextButton extends React.Component {

  render() {
    const btnText = this.props.no >= questions.length ? '計算結果へ' : '次へ'
    return (
      <button onClick={this.props.onClick}>{btnText}</button>
    )
  }
}
class Result extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const sexName = this.props.sex === 'F' ? '女' : '男'
    const weight = this.props.weight
    const fatPercentage = this.props.fatPercentage
    const leanBodyMass = () => Math.round(weight * (1 - fatPercentage / 100)) // 徐脂肪体重
    const bm = () => leanBodyMass() * 40 // 基礎代謝
    const intakeKcal = () => bm() - 300 // 目標摂取カロリー
    const pfcTable = () => {
      const pg = weight * 2
      const pkcal = pg * 4
      const fg = Math.round(leanBodyMass() * 0.8)
      const fkcal = fg * 9
      const ckcal = intakeKcal() - pkcal - fkcal
      const cg =  Math.round(ckcal / 4)
      const pfc = {
        p: { name: 'たんぱく質', g: pg, kcal: pkcal },
        f: { name: '脂質', g: fg, kcal: fkcal },
        c: { name: '炭水化物', g: cg, kcal: ckcal },
      }

      return (
        <table className="pfc-table">
          <thead>
            <tr>
              <th></th>
              <th>g</th>
              <th>kcal</th>
            </tr>
          </thead>
          <tbody>
            { Object.keys(pfc).map((key) => {
              return (
                <tr key={key}>
                  <th>{pfc[key].name}</th>
                  <td>{pfc[key].g} g</td>
                  <td>{pfc[key].kcal} kcal</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }

    return (
      <div className="result">
        <ul>
          <li>性別：{sexName}</li>
          <li>体重：{weight}kg</li>
          <li>体脂肪率：{fatPercentage}%</li>
          <li>徐脂肪体重：{leanBodyMass()}kg</li>
          <li>基礎代謝：{bm()}kcal</li>
          <li>目標：{intakeKcal()}kcal</li>
        </ul>
        {pfcTable()}
        <button onClick={this.props.onReset}>もう一度計算する</button>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sex: 'M',
      weight: 0,
      fatPercentage: 0,
      no: 1,
      isShowResult: false,
    }
  }

  initState = () => {
    this.setState({
      sex: '',
      weight: 0,
      fatPercentage: 0,
      goal: 0,
      no: 1,
      isShowResult: false,
    })
  }

  onClickNext = () => {
    if (this.state.no >= questions.length) {
      this.setState({ isShowResult: true })
      return
    }
    this.setState({ no: this.state.no + 1 })
  }

  onReset = () => {
    this.initState()
  }

  handleSubmit = (ev) => {
    console.log(ev)
  }

  handleChange = (ev) => {
    console.log(ev)
  }

  render() {
    const values = {
      no: this.state.no,
      weight: this.state.weight,
      fatPercentage: this.state.fatPercentage,
    }
    return (
      <div className="App">
        <h2>PFC CALCULATOR</h2>
        {!this.state.isShowResult && <Question no={this.state.no} values={values} sex={this.state.sex} onClick={this.onClickNext}></Question>}
        {this.state.isShowResult && <Result sex={this.state.sex} weight={this.state.weight} fatPercentage={this.state.fatPercentage} onReset={this.onReset}></Result>}
      </div>
    )
  }
}

export default App
