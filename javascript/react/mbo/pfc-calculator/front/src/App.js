import React, { useMemo } from 'react';

import './App.css';

class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      no: 1,
    }
  }

  handleClick() {
    let no = this.state.no
    this.setState({
      no: no++,
    })
    console.log('next!')
  }

  render() {
    return (
      <div className="question">
        <div>Question {this.state.no}</div>
        <button onClick={this.handleClick}>next</button>
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
      pfc: {
        p: { name: 'たんぱく質' },
        f: { name: '脂質' },
        c: { name: '炭水化物' },
      },
    };
    this.pfcTable = React.createRef();
  }

  handleSubmit(val) {
    console.log(val)
  }

  render() {
    const sexName = this.state.sex === 'F' ? '女' : '男';
    return (
      <div className="App">
        <h2>PFC CALCULATOR</h2>
        <Question></Question>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.weight} />
          </label>
          <input type="次へ" value="Submit" />
        </form>
        <ul>
          <li>性別：{sexName}</li>
          <li>体重：{this.state.weight}kg</li>
          <li>体脂肪率：{this.state.fatPercentage}%</li>
          <li>徐脂肪体重：{this.leanBodyMass()}kg</li>
          <li>基礎代謝：{this.bm()}kcal</li>
          <li>目標：{this.intakeKcal()}kcal</li>
        </ul>
        <table ref={this.pfcTable}>
          <thead>
            <tr>
              <th></th>
              <th>g</th>
              <th>kcal</th>
            </tr>
          </thead>
          <tbody>
            { Object.keys(this.state.pfc).map((key)=>{
              return (
                <tr key={key}>
                  <th>{this.state.pfc[key].name}</th>
                  <td>{this.state.pfc[key].g} g</td>
                  <td>{this.state.pfc[key].kcal} kcal</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }

  /*
   * PFCを計算
   * TODO: computed的なんにしたい
   */
  calcPfc() {
    if (this.pfcTable) {
      const pfc = Object.assign(this.state.pfc)
      pfc.p.g = this.state.weight * 2
      pfc.p.kcal = Math.round(pfc.p.g * 4)
      pfc.f.g = Math.round(this.leanBodyMass() * 0.8)
      pfc.f.kcal = Math.round(pfc.f.g * 4)
      pfc.c.kcal = this.intakeKcal() - pfc.p.kcal - pfc.f.kcal
      pfc.c.g = Math.round(pfc.c.kcal / 4)
      this.setState({ pfc })
    }
  }

  /*
   * 徐脂肪体重
   * TODO: computed的なんにしたい
   */
  leanBodyMass() {
    return Math.round(this.state.weight * (1 - this.state.fatPercentage / 100));
  }

  /*
   * 基礎代謝
   * TODO: computed的なんにしたい
   */
  bm() {
    return this.leanBodyMass() * 40;
  }

  /*
   * 摂取カロリー
   * TODO: computed的なんにしたい
   */
  intakeKcal() {
    return this.bm() - 300;
  }

}

export default App;
