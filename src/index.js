import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'

import 'antd/dist/antd.css'
import './style/app.css'
import 'semantic-ui-css/semantic.min.css'

import App from './components/App';

import { HashRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import listReducer from './store/reducers'

const store = createStore(listReducer, applyMiddleware(thunk))


ReactDOM.render(
	<Provider store={ store }>
		<Router><App /></Router>
	</Provider>,
	 document.getElementById('root'));



