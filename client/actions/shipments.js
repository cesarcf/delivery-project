import { setStatusToOrder } from 'actions/orders'
import { schema, normalize } from 'normalizr'

const itemSchema = new schema.Entity('items', {}, { idAttribute: '_id' })
const shipmentSchema = new schema.Entity('shipments',{
	cargo: [itemSchema]
}, { idAttribute: '_id' })

const shipmentListSchema = [ shipmentSchema ]


/**
*
* Types Shipments
**/
export const FETCH_SHIPMENTS = 'FETCH_SHIPMENTS'
export const CLEAR_SHIPMENTS = 'CLEAR_SHIPMENTS'
export const SET_ROUTE_DATES = 'SET_ROUTE_DATES'

/**
*
* Actions fetch all shipments
**/
export const fetchShipments = () => (dispatch, getState, api) => {
	api.get('/shipments').then(res => {
		dispatch({ type: FETCH_SHIPMENTS, payload: normalize(res.data, shipmentListSchema) })
	})
}


/**
*
* Actions clear all shipments
**/
export const clearShipments = () => ({ type: CLEAR_SHIPMENTS })


/**
*
* Actions set dateTime pickup and delivered to order
**/
export const setRouteDates = (shipment, status) => (dispatch, getState, api) => {
	api.put(`/shipments/${shipment._id}/?status=${status}`, { headers: { 'X-HTTP-Method-Override': 'PUT' }})
		.then(res => {
			dispatch({ type: SET_ROUTE_DATES, payload: res.data })
		})
}




