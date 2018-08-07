import express from 'express'
const app = express.Router()
import requireJWT from 'middlewares/requireJWT'
import Order from 'models/Order'
import User from 'models/User'
import _ from 'lodash'


/**
* Gets all Orders
**/
app.get('/', requireJWT, (req, res) => {
	Order.find()
		.then(orders => res.send(orders))
		.catch(err => res.status(404).send({ 'message':'Error' }) )
})


/**
* Assign carrierId to Order
**/
app.put('/:orderId/carriers/:carrierId', requireJWT, (req, res) => {
	const { orderId, carrierId } = req.params

	//Emit Status with SocketIO to Client
	req.app.io.emit('NEW_STATUS', { orderId, status:'ASSIGNED' })

	Order.findOneAndUpdate({ _id: orderId }, { $set: { carrierId, status:'ASSIGNED' } }, { new:true })
		.then(order => {
			User.findOneAndUpdate({_id:order.userId}, {$addToSet: { carriers: carrierId }}, { new:true })
				.then(user => {
					res.send(order)
				})
				.catch(err => res.status(404).send({ 'message':'Error' }) )
		})
		.catch(err => res.status(404).send({ 'message':'Error' }) )
})


/**
* Set Discount to Order
**/
app.put('/:orderId/discounts', requireJWT, (req, res) => {
	const { orderId } = req.params
	const { discount, percentage } = req.query

	Order.findOne({ _id: orderId }).then(order => {
		if(percentage === 'true'){
			order.price = order.price - (order.price * parseInt(discount, 10) / 100)
		}
		if(percentage === 'false'){
			order.price = order.price - parseInt(discount, 10)
		}

		order.save().then(() => res.send(order))
	})
})



export default app
