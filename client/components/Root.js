import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import reducers from 'reducers'
import { saveState } from 'store/localStorage'
import _ from 'lodash'
import axios from 'axios'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'




export default ({ children, initialState = {} }) => {

	/**
	* Axios Instance
	**/
	const axiosInstance = axios.create({
		baseURL: (process.env.NODE_ENV !== 'production') ? 'http://localhost:5000' : HOST_PRODUCTION
	})


	/**
	* Middleware before send Request
	**/
	axiosInstance.interceptors.request.use(config => {
		//El token que guardamos despues de "auth" esta aqui:
		const token = store.getState().auth.authenticated
		if(token){
			config.headers.Authorization = token
		}

		return config
	})


	const middlewares = [thunk.withExtraArgument(axiosInstance)];
	if (process.env.NODE_ENV === 'development') {
		middlewares.push(createLogger())
	}

	/**
	*
	* Create Store
	**/
	const store = createStore(reducers, initialState, applyMiddleware(...middlewares))

	store.subscribe(_.throttle(() => {
		saveState({
			auth: store.getState().auth,
			users: store.getState().users,
			addresses: store.getState().addresses,
			orders: store.getState().orders,
			shipments: store.getState().shipments,
			items: store.getState().items,
			countries: store.getState().countries,
			provinces: store.getState().provinces

		})
	}, 1000));



	return (
		<Provider store={store}>
			<AppContainer>
				<BrowserRouter>
					{children}
				</BrowserRouter>
			</AppContainer>
		</Provider>
	)
}
