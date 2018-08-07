import { createSelector } from 'reselect'
import _ from 'lodash'


/**
* input-selectors
**/
const shipmentsById = state => state.shipments.byId
const shipmentsAllIds = state => state.shipments.allIds


/**
*
* Selectors getUsers
**/
export const getShipments = createSelector(
	[shipmentsById, shipmentsAllIds],

	(shipmentsById, shipmentsAllIds) => {
		const shipments = shipmentsAllIds.map(_id => shipmentsById[_id])
		return _.mapKeys(shipments, shipment => shipment._id)
	}
)