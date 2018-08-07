import { createSelector } from 'reselect'
import _ from 'lodash'


/**
* input-selectors
**/
const authUser = state => state.auth.user
const usersById = state => state.users.byId
const usersAllIds = state => state.users.allIds


/**
*
* Selectors getUsers
**/
export const getUsers = createSelector(
	[usersById, usersAllIds],

	(usersById, usersAllIds) => {
		const users = usersAllIds.map(_id => usersById[_id])
		return _.mapKeys(users, user => user._id)
	}
)

/**
*
* Selectors getShippers
**/
export const getShippers = createSelector(
	[getUsers, authUser],

	(users, authUser) => {
		if(authUser.role == 'MANAGER'){
			const shippers = _.filter(users, user => user.role == 'SHIPPER')
			return _.mapKeys(shippers, shipper => shipper._id)
		}
		if(authUser.role == 'CARRIER'){
			const shippers = _.filter(users, user => {
				return user.role == 'SHIPPER' && user.carriers.some(carrierId => carrierId == authUser._id)
			})
			return _.mapKeys(shippers, shipper => shipper._id)
		}

	}
)


/**
*
* Selectors getCarriers
**/
export const getCarriers = createSelector(
	[getUsers],

	(users) => {
		const carriers = _.filter(users, user => user.role == 'CARRIER')
		return _.mapKeys(carriers, carrier => carrier._id)
	}
)