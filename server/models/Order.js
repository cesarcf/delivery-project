import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User' },
	carrierId: { type: Schema.Types.ObjectId, ref: 'User', default: null },

	type: {
		type: String,
		enum: {
			values: [
				'SINGLE',//an order with one shipment
				'BUNDLE'//an order with several shipments
			]
		},
		default: 'SINGLE',
	},
	current: { type: Boolean },
	status: {
		type: String,
		enum: {
			values: [
				'WAITING',//No Assigned to any bikers.
				'ASSIGNED',//Assigned but not picked up.
				'PICKED_UP',//picked up but not delivered.
				'DELIVERED'//delivered.
			]
		},
		default: 'WAITING',
	},

	shipments: [{ type: Schema.Types.ObjectId, ref: 'Shipment' }],
	price: { type: Number }
})



const Order = mongoose.model('Order', orderSchema, 'orders')

export default Order