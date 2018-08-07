import { createSelector } from 'reselect'
import _ from 'lodash'

/**
* input-selectors
**/
const provincesById = state => state.provinces.byId
const provincesAllIds = state => state.provinces.allIds


/**
*
* Selectors getProvinces
**/
export const getProvinces = createSelector(
	[ provincesById, provincesAllIds],

	(provincesById, provincesAllIds) => {
		const provinces = provincesAllIds.map(_id => provincesById[_id])
		return _.mapKeys(provinces, province => province._id)//provincesById
	}
)