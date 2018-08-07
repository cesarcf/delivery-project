import _ from 'lodash'

/**
*
* Types orders
**/
export const FETCH_ORDERS = 'FETCH_ORDERS'
export const CLEAR_ORDERS = 'CLEAR_ORDERS'
export const ASSIGN_CARRIER_TO_ORDER = 'ASSIGN_CARRIER_TO_ORDER'
export const SET_STATUS_TO_ORDER = 'SET_STATUS_TO_ORDER'
export const SET_DISCOUNT_TO_ORDER = 'SET_DISCOUNT_TO_ORDER'

/**
*
* Fetch orders
**/
export const fetchOrders = () => (dispatch, getState, api) => {
	api.get('/orders').then(res => {
		dispatch({ type: FETCH_ORDERS, payload: res.data })
	})
}

/**
*
* Actions clear Orders
**/
export const clearOrders = () => ({ type: CLEAR_ORDERS })

export const assignCarrierToOrder = (orderId, carrierId) => (dispatch, getState, api) => {
	api.put(`/orders/${orderId}/carriers/${carrierId}`, { headers: { 'X-HTTP-Method-Override': 'PUT' }})
		.then(res => {
			dispatch({ type: ASSIGN_CARRIER_TO_ORDER, payload: res.data })
		})
}

/**
*
* Actions set status to order
**/
export const setStatusToOrder = (orderId, status) => ({ type: SET_STATUS_TO_ORDER, payload: { orderId, status } })

/**
*
* Actions set discount to order
**/
export const setDiscountToOrder = (orderId, discount, percentage) => (dispatch, getState, api) => {
	return api.put(`/orders/${orderId}/discounts?discount=${discount}&percentage=${percentage}`, { headers: { 'X-HTTP-Method-Override': 'PUT' }})
		.then(res => {
			dispatch({ type: SET_DISCOUNT_TO_ORDER, payload: res.data })
		})
}



