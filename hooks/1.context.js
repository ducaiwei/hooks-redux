import React from "react";
import ReactDOM from 'react-dom';
const ThemeContext = React.createContext();
class Father extends React.Component {
  state = {color: 'red'}

  render() {
    let valueobj = {color: this.state.color};
    return <ThemeContext.Provider value={valueobj}>
      <div style={{border: `3px solid ${this.state.color}`}}>Father<Child/></div>
    </ThemeContext.Provider>
  }
}
class Child extends React.Component {
  render() {
    return <div>儿子<Grandson /></div>;
  }
}
class Grandson extends React.Component {
  render() {
    return <ThemeContext.Consumer>
      {value =>(<div style={{border: `3px solid ${value.color}`}}>孙子</div>)}
    </ThemeContext.Consumer>;
  }
}
ReactDOM.render(<Father />, document.getElementById('root'))
// context上下文
