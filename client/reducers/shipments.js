import { combineReducers } from 'redux'
import _ from 'lodash'
import { FETCH_SHIPMENTS, CLEAR_SHIPMENTS, SET_ROUTE_DATES } from 'actions/shipments'


const shipment = (shipment={}, action) => {
	switch(action.type) {
		case SET_ROUTE_DATES:
			if(shipment._id !== action.payload._id){
				return shipment
			}

			return {
				...shipment,
				pickUpAt: action.payload.pickUpAt,
				deliveredAt: action.payload.deliveredAt
			}

		default:
			return shipment
	}
}

const byId = (state={}, action) => {
	let shipments;

	switch(action.type) {
		case FETCH_SHIPMENTS:
			return {
				...action.payload.entities.shipments
			}

		case CLEAR_SHIPMENTS:
			return {}

		case SET_ROUTE_DATES:
			 shipments = _.map(state, s => shipment(s, action))
			 return _.mapKeys(shipments, '_id')

		default:
			return state
	}
}


const allIds = (state=[], action) => {
	switch(action.type) {
		case FETCH_SHIPMENTS:
			return _.map(action.payload.entities.shipments, shipment => shipment._id)

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
