import 'babel-polyfill'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router'
//import { createStore, applyMiddleware, compose } from 'redux'
//import { Provider } from 'react-redux'
import { App, Landing, Composer, Reader, About }  from './component'
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
					<Route path='/about' component={About} />
					<Route path="/" component={App}>
						<IndexRoute component={Landing} />
						<Route path="compose" component={Composer} />
						<Route path="read/:linkId" component={Reader} />
					</Route>
				</Router>
			//</Provider>
		)
	}
}

render(<Root />, document.getElementById('app'))