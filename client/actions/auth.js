import { fetchAddresses, clearAddresses } from 'actions/addresses'
import { fetchOrders, clearOrders } from 'actions/orders'
import { fetchShipments, clearShipments } from 'actions/shipments'
import { fetchUsers, clearUsers } from 'actions/users'


/**
*
* Types de Auth
**/
export const AUTH_USER = 'AUTH_USER'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_SAVE_TOKEN = 'AUTH_SAVE_TOKEN'
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER'
export const CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER'


/**
*
* Actions signUp
**/
export const signUp = (formData, history) => (dispatch, getState, api) => {
	return api.post('/auth/signup', formData)
	.then(res => {
		dispatch({ type: AUTH_USER, payload: res.data.token })
		dispatch(fetchCurrentUser())
		history.push('/dashboard')
	})
	.catch(err => {
		dispatch({ type: AUTH_ERROR, payload: "Error al procesar el registro!" })
		throw err.response.data.errors
	})

}

/**
*
* Actions signIn
**/
export const signIn = (formData, history) => (dispatch, getState, api) => {
	api.post('/auth/signin', formData)
		.then(res => {
			dispatch({ type: AUTH_USER, payload: res.data.token })
			dispatch(fetchCurrentUser())
			history.push('/dashboard')
		})
		.catch(err => {
			dispatch({ type: AUTH_ERROR, payload: 'Acceso incorrecto a la cuenta!' })
		})
}


/**
*
* Actions signOut
**/
export const signOut = (history) => (dispatch) => {
	dispatch({ type: AUTH_USER, payload: '' })
	dispatch(clearCurrentUser())
	history.push('/signin')
}


/**
*
* Actions de USER
**/
export const fetchCurrentUser = () => (dispatch, getState, api) => {
	api.get('/auth/current').then(res => {
		dispatch({ type: FETCH_CURRENT_USER, payload: res.data })
		dispatch(fetchAddresses())
		dispatch(fetchOrders())
		dispatch(fetchShipments())
		dispatch(fetchUsers())
	})
}

/**
*
* Clean Profile Current User
**/
export const clearCurrentUser = () => (dispatch, getState, api) => {
	dispatch({ type: CLEAR_CURRENT_USER })
	dispatch(clearAddresses())
	dispatch(clearOrders())
	dispatch(clearShipments())
	dispatch(clearUsers())

}
/**
*
* Clean Auth Error
**/
export const cleanError = () => ({ type: AUTH_ERROR, payload: '' })


