import { combineReducers } from 'redux'
import auth from 'reducers/auth'
import users from 'reducers/users'
import addresses from 'reducers/addresses'
import orders from 'reducers/orders'
import shipments from 'reducers/shipments'
import items from 'reducers/items'
import countries from 'reducers/countries'
import provinces from 'reducers/provinces'

export default combineReducers({
	auth,
	users,
	addresses,
	orders,
	shipments,
	items,
	countries,
	provinces
})