import { schema, normalize } from 'normalizr'

const provinceSchema = new schema.Entity('provinces',{}, { idAttribute: '_id' })
const countrySchema = new schema.Entity('countries',{
	provinces:[provinceSchema],
}, { idAttribute: '_id' })

const countriesSchema = [ countrySchema ];


/**
*
* Types de Country
**/
export const FETCH_COUNTRIES = 'FETCH_COUNTRIES'


/**
*
* Actions de Country
**/
export const fetchCountries = () => (dispatch, getState, api) => {
	api.get('/countries').then(res => {
		dispatch({ type: FETCH_COUNTRIES, payload: normalize(res.data, countriesSchema) })
	})
}