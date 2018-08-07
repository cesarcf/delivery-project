import express from 'express'
const app = express.Router()
import requireJWT from 'middlewares/requireJWT'
import Shipment from 'models/Shipment'
import Order from 'models/Order'

/**
* Gets all shipments
**/
app.get('/', requireJWT, (req, res) => {
	Shipment.find()
		.then(shipments => res.send(shipments))
		.catch(err => res.status(404).send({ 'message':'Error' }) )
})

/**
* Update a Shipment
**/
app.put('/:shipmentId', requireJWT, (req, res) => {
	const { shipmentId } = req.params
	const { status } = req.query
	const routePoint = status == 'PICKED_UP' ? 'pickUpAt' : 'deliveredAt'
	Shipment.findOneAndUpdate({ _id: shipmentId}, {$set: { [routePoint]: new Date() }}, { new:true })
		.then(shipment => {
			Order.findOneAndUpdate({ _id:shipment.orderId }, { $set:{ status } }, { new:true }).then(() => {
				//Emit Status with SocketIO to Client
				req.app.io.emit('NEW_STATUS', { orderId: shipment.orderId, status })
				res.send(shipment)
			})

		})
		.catch(err => res.status(404).send({ 'message':'Error' }) )
})


export default app