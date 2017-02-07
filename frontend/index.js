import 'babel-polyfill'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router'
//import { createStore, applyMiddleware, compose } from 'redux'
//import { Provider } from 'react-redux'
import { App, Hello }  from './component'
//import dispatchFunctionMW from './middleware/thunk'
//import userState from './reducer/userReducer'

class Root extends Component{
	render(){
		/*let store = createStore(
			userState,
			compose(
				applyMiddleware(dispatchFunctionMW),
				//window.devToolsExtension ? window.devToolsExtension() : f => f
			)
		)*/
		return (
			//<Provider store={store}>
				<Router history={browserHistory}>
					<Route path="/" component={App}>
						<IndexRoute component={Hello} />
					</Route>
				</Router>
			//</Provider>
		)
	}
}

render(<Root />, document.getElementById('app'))