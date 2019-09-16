import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

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
let store = createStore(reducer, initialState);
let mapStateToProps = state=>state;
// dispatch方法映射为组件属性方法
let mapDispatchToProps = dispatch => ({
    add(){
        dispatch({type: IN})
    }
});
function Counter(props) {
    return (<>
      <p>{props.number}</p>
      <button onClick={props.add}>加</button>
    </>)
}
let ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);
ReactDOM.render(<Provider store={store}><ConnectedCounter /></Provider>, document.getElementById('root'))
