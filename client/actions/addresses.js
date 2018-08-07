/**
*
* Types de Address
**/
export const FETCH_ADDRESSES = 'FETCH_ADDRESSES'
export const CLEAR_ADDRESSES = 'CLEAR_ADDRESSES'


/**
*
* Actions de fetch Address User
**/
export const fetchAddresses = () => (dispatch, getState, api) => {
	api.get('/addresses').then(res => {
		dispatch({ type: FETCH_ADDRESSES, payload: res.data })
	})
}

export const clearAddresses = () => ({ type: CLEAR_ADDRESSES })
