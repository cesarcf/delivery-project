import { createSelector } from 'reselect'
import _ from 'lodash'

/**
* input-selectors
**/
const countriesById = state => state.countries.byId
const countriesAllIds = state => state.countries.allIds


/**
*
* Selectors getCountries
**/
export const getCountries = createSelector(
	[ countriesById, countriesAllIds],

	(countriesById, countriesAllIds) => {
		const countries = countriesAllIds.map(_id => countriesById[_id])
		return _.mapKeys(countries, country => country._id)
	}
)

