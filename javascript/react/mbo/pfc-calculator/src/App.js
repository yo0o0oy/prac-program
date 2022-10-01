import React from 'react';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sex: 'female',
      weight: 50,
      fatPercentage: 25,
      pfc: {
        p: { name: 'たんぱく質', g:100, kcal: 400 },
        f: { name: '脂質', g:20, kcal: 180 },
        c: { name: '炭水化物', g:230, kcal: 920 },
      },
    };
  }

  render() {
    const sexName = this.state.sex === 'female' ? '女' : '男';
    return (
      <div className="App">
        <h2>PFC CALCULATOR</h2>
        <ul>
          <li>性別：{sexName}</li>
          <li>体重：{this.state.weight}kg</li>
          <li>体脂肪率：{this.state.fatPercentage}%</li>
          <li>徐脂肪体重：{this.calcLeanBodyMass()}kg</li>
          <li>基礎代謝：{this.calcBm()}kcal</li>
        </ul>
        <table>
          <tr>
            <th></th>
            <th>g</th>
            <th>kcal</th>
          </tr>
          { Object.keys(this.state.pfc).map((key)=>{
            return (
              <tr>
                <th>{this.state.pfc[key].name}</th>
                <td>{this.state.pfc[key].g} g</td>
                <td>{this.state.pfc[key].kcal} kcal</td>
              </tr>
            )
          })}
        </table>
      </div>
    );
  }

  /*
   * 徐脂肪体重を計算
   * TODO: computed的なんにしたい
   */
  calcLeanBodyMass() {
    return this.state.weight * (1 - this.state.fatPercentage / 100);
  }

  /*
   * 基礎代謝を計算
   * TODO: computed的なんにしたい
   */
  calcBm() {
    return this.state.weight * 30;
  }

}

export default App;
