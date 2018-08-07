import express from 'express'
const app = express.Router()
import requireJWT from 'middlewares/requireJWT'
import Address from 'models/Address'

app.get('/', requireJWT, (req, res) => {
	Address.find()
		.then(addresses => res.send(addresses))
		.catch(err => res.status(404).send({ 'message':'Error' }) )
})

export default app