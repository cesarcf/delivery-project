

/**
*
* Types Users
**/
export const FETCH_USERS = 'FETCH_USERS'
export const CLEAR_USERS = 'CLEAR_USERS'



/**
*
* Actions Users
**/
export const fetchUsers = () => (dispatch, getState, api) => {
	api.get('/users')
	.then(res => {
		dispatch({ type: FETCH_USERS, payload: res.data })
	})
}

/**
*
* Actions clear all users
**/
export const clearUsers = () => ({ type: CLEAR_USERS })
