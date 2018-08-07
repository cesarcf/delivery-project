import express from 'express'
const app = express.Router()
import User from 'models/User'
import requireJWT from 'middlewares/requireJWT'


/**
* Gets all Users
**/
app.get('/', requireJWT, (req, res) => {
	User.find({ role: { $nin:['MANAGER'] } })
		.select({_id:1, carriers:1, role:1, firstName:1, lastName:1, email:1, vouchers:1, addresses:1, shipments:1, orders:1 })
		.then(users => res.send(users))
		.catch(err => res.status(404).send({ 'message':'Error' }) )
})



export default app