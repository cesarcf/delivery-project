import { createSelector } from 'reselect'
import _ from 'lodash'


/**
* input-selectors
**/
const ordersById = state => state.orders.byId
const ordersAllIds = state => state.orders.allIds


/**
*
* Selectors getUsers
**/
export const getOrders = createSelector(
	[ordersById, ordersAllIds],

	(ordersById, ordersAllIds) => {
		const orders = ordersAllIds.map(_id => ordersById[_id])
		return _.mapKeys(orders, order => order._id)
	}
)