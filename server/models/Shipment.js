const mongoose = require('mongoose')
const Schema = mongoose.Schema
import itemSchema from 'models/itemSchema'
import { addressSchema } from 'models/Address'


const shipmentSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User' },
	orderId: { type: Schema.Types.ObjectId, ref: 'Order', default: null },
	pickUpAddress: addressSchema,
	deliveryAddress: addressSchema,
	cargo: [itemSchema],
	pickUpAt: { type: Date },
	deliveredAt: { type: Date }
})


const Shipment = mongoose.model('Shipment', shipmentSchema, 'shipments')

export default Shipment