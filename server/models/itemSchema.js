import mongoose, { Schema } from 'mongoose'

const itemSchema = new Schema({
	type: {
		type: String,
		enum: {
			values: [
				'box',
				'bag'
			]
		},
		default: 'box'
	},
	quantity: { type: Number },
	weight: { type: Number },
	width: { type: Number },
	length: { type: Number },
	height: { type: Number },
	fragile: { type: Boolean },
	dangerous: { type: Boolean }
})


export default itemSchema