import { createSelector } from 'reselect'
import _ from 'lodash'


/**
* input-selectors
**/
const itemsById = state => state.items.byId
const itemsAllIds = state => state.items.allIds


/**
*
* Selectors getAddresses
**/
export const getItems = createSelector(
	[itemsById, itemsAllIds],

	(itemsById, itemsAllIds) => {
		const items = itemsAllIds.map(_id => itemsById[_id])
		return _.mapKeys(items, item => item._id)
	}
)