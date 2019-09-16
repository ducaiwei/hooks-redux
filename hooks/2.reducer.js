import React, { useReducer } from "react";
import ReactDOM from "react-dom";
let initialState = { number: 0 };
const IN = "IN";
const DE = "DE";
function reducer(state, action) {
  switch (action.type) {
    case IN:
      return { number: state.number + 1 };
    case DE:
      return { number: state.number - 1 };
    default:
      return state;
  }
}
function Counter() {
  // initialState 初始状态
  const [state, dispatch] = useReducer(reducer, initialState);
  return (<>
    <p>{state.number}</p>
    <button onClick={() => dispatch({type: IN})}>加</button>
  </>)
}
ReactDOM.render(<Counter />, document.getElementById('root'))