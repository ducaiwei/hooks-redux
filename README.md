# hooks-redux
手写的redux以及中间件
redux主要组成包括createStore(reducer, initialState)、Provider、connect
applyMiddleware函数把所有中间件函数合成链条，重写store.dispatch
在store.dispatch之前处理中间件
compose函数利用了柯里化把多个函数组合成一个函数返回。