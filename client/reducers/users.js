import { combineReducers } from 'redux'
import _ from 'lodash'
import { FETCH_USERS, CLEAR_USERS } from 'actions/users'

const byId = (state = {}, action) => {
	switch(action.type) {
		case FETCH_USERS:
			return {
				..._.mapKeys(action.payload, '_id')
			}

		case CLEAR_USERS:
			return {}

		default:
			return state
	}
}

const allIds = (state = [], action) => {
	switch(action.type) {
		case FETCH_USERS:
			return _.map(action.payload, user => user._id)

		case CLEAR_USERS:
			return []

		default:
			return state
	}
}

export default combineReducers({
	byId,
	allIds
})