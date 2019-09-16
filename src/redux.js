// react react-redux store provider向下层传递store
// connect高阶组件 实现组件和仓库的链接
import React from 'react';
const ReduxContext  = React.createContext(); // Provider Consumer
function compose(...fns) { // fns [add3, add2, add1]
    if(fns.length === 0) {
        return args => args;
    }
    if(fns.length === 1) {
        return fns[0];
    }
    return fns.reduce((a, b) => (...args) => a(b(...args)))
}
// applyMiddleware(thunk, promise, logger)(createStore)(reducer, initialState)
export function applyMiddleware(...middlewares) {
    return function(createStore) {
        return function(reducer, initialState) {
            let {store, Provider, connect} = createStore(reducer, initialState);
            let dispatch;
            const middlewareApi = {
                getState: () => store.getState(),
                dispatch: (...args) => dispatch(...args)
            }
            let chain = middlewares.map(middleware => middleware(middlewareApi));
            // 重写dispatch 在dispatch之前加入中间件的调用
            dispatch = compose(...chain)((...args) => store._dispatch(...args));
            store.dispatch = dispatch;

            return {
                store, Provider, connect, dispatch
            }
        }
    }
}
export function createStore(reducer, intialState) {
    let store = {};
    const Provider = props => { // {number: 0}
        const [state, dispatch] = React.useReducer(reducer, intialState);
        store.getState = () => state; // getState用来获取状态
        store._dispatch = dispatch;
        // 一定要cloneElement
        return (<ReduxContext.Provider value={state}>
            {React.cloneElement(props.children)}
        </ReduxContext.Provider>)
    }
    function connect(mapStateToProps, mapDispatchToProps) {
        return function(Component) {
            let state = intialState;
            let actions = {};
            return props => {
                if(store.getState) {
                    state = mapStateToProps(store.getState());
                }
                actions = mapDispatchToProps(store.dispatch);
                return <Component {...props} {...state} {...actions} dispatch={store.dispatch}/>
            }
        }
    }
    return {store, Provider, connect};
}