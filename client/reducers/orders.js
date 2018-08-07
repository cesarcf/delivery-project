import { combineReducers } from 'redux'
import _ from 'lodash'
import {
	FETCH_ORDERS,
	CLEAR_ORDERS,
	ASSIGN_CARRIER_TO_ORDER,
	SET_STATUS_TO_ORDER,
	SET_DISCOUNT_TO_ORDER } from 'actions/orders'

const order = (order={}, action) => {
	switch(action.type) {
		case SET_STATUS_TO_ORDER:
			if(order._id != action.payload.orderId){
				return order
			}

			return {
				...order,
				status: action.payload.status
			}


		default:
			return order
	}
}

const byId = (state={}, action) => {
	let orders;

	switch(action.type) {
		case FETCH_ORDERS:
			return {
				..._.mapKeys(action.payload, '_id')
			}

		case CLEAR_ORDERS:
			return {}

		case ASSIGN_CARRIER_TO_ORDER:
		case SET_DISCOUNT_TO_ORDER:
			return {
				...state,
				[action.payload._id]: action.payload
			}

		case SET_STATUS_TO_ORDER:
			orders = _.map(state, o => order(o, action))
			return _.mapKeys(orders, '_id')

		default:
			return state
	}
}


const allIds = (state=[], action) => {
	switch(action.type) {
		case FETCH_ORDERS:
			return _.map(action.payload, order => order._id)

		case CLEAR_ORDERS:
			return []

		default:
			return state
	}
}


export default combineReducers({
	byId,
	allIds
})
