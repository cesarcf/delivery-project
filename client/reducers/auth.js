import { combineReducers } from 'redux'

import {
	AUTH_USER,
	AUTH_ERROR,
	FETCH_CURRENT_USER,
	CLEAR_CURRENT_USER
} from 'actions/auth'


const INITIAL_STATE = {
	authenticated:'',
	errorMessage: '',
	user: {}
}

/**
* AuthReducer
**/
export default (state=INITIAL_STATE, action) => {
	switch(action.type) {
		case AUTH_USER:
			return {
				...state,
				authenticated: action.payload
			}

		case FETCH_CURRENT_USER:
			return {
				...state,
				user: {
					...action.payload
				}
			}

		case CLEAR_CURRENT_USER:
			return INITIAL_STATE

		case AUTH_ERROR:
			return {
				...state,
				errorMessage: action.payload
			}

		default:
			return state
	}
}


