import React, { useMemo } from 'react';
import questions from "./questions.json" assert { type: "json" }
import './App.css';

class Question extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const question = questions[this.props.no - 1];
    const handleChange = (ev) => {
      console.log(ev)
    };

    return (
      <div className="question">
        <div className="q">{question.question}</div>
        <div className="a">
          {question.forms.map((form, i) => {
            switch (form.type) {
              case 'radio':
                const items = Array.isArray(form.items) ? form.items : [];
                return (
                  // TODO: ループでradio出力
                  <React.Fragment key={i}>
                    {items.map((item, i2) => {
                      return (
                        <label key={i2}>
                          <input
                            name={form.name}
                            type={form.type}
                            value={item.value}
                            onChange={handleChange}
                            checked={false}
                          />
                          {item.label.text}
                        </label>
                      )
                    })}
                  </React.Fragment>
                )
              case 'number':
                return (
                  <dl>
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
      </div>
    );
  }
}

class NextButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick}>次へ</button>
    )
  }
}
class Result extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const sexName = this.props.sex === 'F' ? '女' : '男';
    const weight = this.props.weight;
    const fatPercentage = this.props.fatPercentage;
    const leanBodyMass = () => Math.round(weight * (1 - fatPercentage / 100)); // 徐脂肪体重
    const bm = () => leanBodyMass() * 40; // 基礎代謝
    const intakeKcal = () => bm() - 300; // 目標摂取カロリー
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
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sex: 'F',
      weight: 50,
      fatPercentage: 25,
      no: 1,
      isShowResult: false,
    };
  }

  onClickNext = () => {
    // FIXME:
    const no = this.state.no + 1;
    let isShowResult = false
    if (no === questions.length + 1) {
      isShowResult = true
    }
    this.setState({ no, isShowResult })
  }

  handleSubmit = (ev) => {
    console.log(ev)
  }

  handleChange = (ev) => {
    console.log(ev)
  }

  render() {
    return (
      <div className="App">
        <h2>PFC CALCULATOR</h2>
        <Question no={this.state.no}></Question>
        <NextButton onClick={this.onClickNext}></NextButton>
        {this.state.isShowResult && <Result sex={this.state.sex} weight={this.state.weight} fatPercentage={this.state.fatPercentage}></Result>}
      </div>
    );
  }
}

export default App;
