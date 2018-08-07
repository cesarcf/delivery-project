import { createSelector } from 'reselect'
import _ from 'lodash'
import { getCurrentOrder } from 'selectors/orders'

/**
* input-selectors
**/
const addressesById = state => state.auth.addresses.byId
const addressesAllIds = state => state.auth.addresses.allIds


/**
*
* Selectors getAddresses
**/
export const getAddresses = createSelector(
	[addressesById, addressesAllIds],

	(addressesById, addressesAllIds) => {
		const addresses = addressesAllIds.map(_id => addressesById[_id])
		return _.mapKeys(addresses, address => address._id)

	}
)


/**
*
* Selectors getActiveOrderAddress
**/
export const getActiveAddress = createSelector(
	[getCurrentOrder, getAddresses, addressesAllIds],

	(order, addresses, addressesAllIds) => {
		return addresses[order.address]
	}
)


/**
*
* Selectors lastAddressId
**/
export const lastAddressId = createSelector(
	[addressesAllIds],

	(addressesAllIds) => {
		return addressesAllIds[addressesAllIds.length - 1]
	}
)


