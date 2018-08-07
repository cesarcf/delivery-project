import jwt from 'jsonwebtoken'
import moment from 'moment'
import keys from 'config/keys'

function createJWToken(user){

	let payload = {
		sub: user.id,
		iat: moment().unix()
	}

	let options = {
		algorithm: 'HS256',
	}

	let token = jwt.sign(payload, keys.JWT_SECRET, options)

	return token
}

export default createJWToken