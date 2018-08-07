import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'


const userSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	email: { type: String, unique: true, lowercase: true },
	password: { type: String },
	role: {
		type: String,
		enum: {
			values: [
				'SHIPPER',
				'CARRIER',
				'MANAGER'
			]
		},
		default: 'SHIPPER'
	},
	authMethod: {
		type: [String],
		enum: {
			values: [
				'local',
				//'facebook', /* TODO */
				//'google' /* TODO */
			]
		},
		default: 'local'
	},
	manager: { type: Schema.Types.ObjectId, ref: 'User' },
	carriers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
	orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
	shipments: [{ type: Schema.Types.ObjectId, ref: 'Shipment' }],
	created: { type: Date, default: Date.now },
	updated: { type: Date },
})


/**
* Pre-Middleware
**/
userSchema.pre('update', function(next){
	let User = this
	User.update({},{ $set: { updated: Date.now() } })
	next()
})



/**
 *
 * Hast the password before saved
 **/
userSchema.pre('save', function(next){
	var user = this

	if(!user.isModified('password')) return next()

	bcrypt.genSalt(10, function(err, salt){
		if(err) return next(err)

		bcrypt.hash(user.password, salt, function(err, hash){
			if(err) return next(err)

			user.password = hash
			next()
		})
	})

})



userSchema.method('comparePassword', function(candidatePassword, cb) {

	var user = this
	bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
		if (err) return cb(err)
		cb(null, isMatch)
	})
})






const User = mongoose.model('User', userSchema, 'users')

export default User