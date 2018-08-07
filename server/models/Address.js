import mongoose, { Schema } from 'mongoose'

export const addressSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User' },
	postalCode: { type: String },
	street: { type: String },
	city: { type: String },
	provinceId: { type: Schema.Types.ObjectId, ref: 'provinceSchema' },
	countryId: { type: Schema.Types.ObjectId, ref: 'Country' }
})

const Address = mongoose.model('Address', addressSchema, 'addresses')

export default Address