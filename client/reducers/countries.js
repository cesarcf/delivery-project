import { combineReducers } from 'redux'
import _ from 'lodash'
import { FETCH_COUNTRIES } from 'actions/countries'

const byId = (state={}, action) => {
	switch(action.type) {
		case FETCH_COUNTRIES:
			return {
				..._.mapKeys(action.payload.entities.countries, '_id')
			}

		default:
			return state
	}
}

const allIds = (state=[], action) => {
	switch(action.type) {
		case FETCH_COUNTRIES:
			return _.map(action.payload.entities.countries, country => country._id)

		default:
			return state
	}
}


export default combineReducers({
	byId,
	allIds
})