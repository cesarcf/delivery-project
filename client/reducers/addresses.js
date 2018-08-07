import { combineReducers } from 'redux'
import { FETCH_ADDRESSES, CLEAR_ADDRESSES } from 'actions/addresses'

import _ from 'lodash'

const byId = (state={}, action) => {

	switch(action.type) {
		case FETCH_ADDRESSES:
			return {
				..._.mapKeys(action.payload, '_id')
			}

		case CLEAR_ADDRESSES:
			return {}

		default:
			return state
	}
}


const allIds = (state=[], action) => {
	switch(action.type) {
		case FETCH_ADDRESSES:
			return _.map(action.payload, address => address._id)

		case CLEAR_ADDRESSES:
			return []

		default:
			return state
	}
}


export default combineReducers({
	byId,
	allIds
})
