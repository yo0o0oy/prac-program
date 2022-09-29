import React from 'react';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sex: 'female',
      weight: 50,
      fatPercentage: 25,
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
        </ul>
      </div>
    );
  }

  calcLeanBodyMass() {
    // TOOD: computed的なんにしたい
    return this.state.weight * (1 - this.state.fatPercentage / 100);
  }

}

export default App;
