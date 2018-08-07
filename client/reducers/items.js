import { combineReducers } from 'redux'
import _ from 'lodash'
import { FETCH_SHIPMENTS, CLEAR_SHIPMENTS } from 'actions/shipments'


const byId = (state={}, action) => {
	switch(action.type) {
		case FETCH_SHIPMENTS:
			return {
				...action.payload.entities.items
			}
		case CLEAR_SHIPMENTS:
			return {}

		default:
			return state
	}
}


const allIds = (state=[], action) => {
	switch(action.type) {
		case FETCH_SHIPMENTS:
			return _.map(action.payload.entities.items, item => item._id)

		case CLEAR_SHIPMENTS:
			return []

		default:
			return state
	}
}


export default combineReducers({
	byId,
	allIds
})