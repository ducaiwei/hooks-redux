import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from './redux.js';
// import {Provider, connect} from 'react-redux';

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
// 日志中间件  在状态变化的前后打印日志
let logger = store => next => action => {
    console.log('%c prev state', `color: #A3A3A3; font-weight: bold`, store.getState());
    console.log('%c prev action', `color: #7fbedf; font-weight: bold`, action);
    next(action);
    console.log('%c next state', `color: #9cd69b; font-weight: bold`, store.getState());

}
// promise中间件 
let promise = store => next => action => {
    if(action.then && typeof action.then === 'function') {
        return action.then(store.dispatch);
    }
    next(action);
}
// 
let thunk = store => next => action => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
    }
    next(action);
}
// let {store, Provider, connect} = createStore(reducer, initialState);
let {store, Provider, connect} = applyMiddleware(thunk, promise, logger)(createStore)(reducer, initialState)
let mapStateToProps = state=>state;
// dispatch方法映射为组件属性方法
let mapDispatchToProps = dispatch => ({
    add(){
        dispatch({type: IN})
    },
    thunkAdd() {
        dispatch(function(dispatch) {
            setTimeout(() => {
                dispatch({type: IN})
            }, 1000)
        })
    },
    promiseAdd() {
        dispatch(new Promise(function(resolve, reject){
            setTimeout(() => {
                resolve({type: IN})
            }, 1000)
        }));
    }
});
function Counter(props) {
    return (<>
      <p>{props.number}</p>
      <button onClick={props.add}>加</button>
      <button onClick={props.thunkAdd}>thunkAdd</button>
      <button onClick={props.promiseAdd}>promiseAdd</button>
    </>)
}
let ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);
ReactDOM.render(<Provider store={store}><ConnectedCounter /></Provider>, document.getElementById('root'))
