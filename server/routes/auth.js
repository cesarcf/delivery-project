import express from 'express'
const app = express.Router()
import User from 'models/User'
import jwt from 'services/jwt'
import requireJWT from 'middlewares/requireJWT'
import requireLogin from 'middlewares/requireLogin'

import passport from 'passport'
import passportService from 'services/passport'


/**
* get Current User
**/
app.get('/current', requireJWT, (req, res) => {
	User.findOne({ _id: req.user._id })
		.select({_id:1, role:1, firstName:1, lastName:1, email:1, vouchers:1, addresses:1, shipments:1, orders:1 })
		.then(user => res.send(user) )
		.catch(err => res.status(404).send({ 'message':'User not found!' }) )
})





/**
* SignUp Form
**/
app.post('/signup', (req, res) => {
	const role = req.body.role
	const firstName = req.body.firstName
	const email = req.body.email
	const password = req.body.password

	if(!firstName){
		return res.status(422).json({errors: [{'firstName':'This Field is Require!'}] })
	}
	if(!email){
		return res.status(422).json({errors: [{'email':'This Field is Require!'}] })
	}
	if(!password){
		return res.status(422).json({errors: [{'password':'This Field is Require!'}] })
	}

	User.findOne({ email: email.toLowerCase() })
		.then(userExist => {
			if(userExist){ res.status(422).json({errors: [{'email':'this Email is in Use!'}] }) }

			//User Create and Save:
			const user = new User({ email, password, firstName, role })
			if(role !== 'MANAGER'){
				User.findOne({ role: 'MANAGER' }).then(manager => {
					user.manager = manager._id
				})
			}
			return user.save()
		})
		.then(user => res.send({ token: jwt(user) }))
		.catch((err) => res.status(422).json({errors: [{'form':'A problem has occurred, try again!'}] }) )
})


/**
* SignIn Form
**/
app.post('/signin', requireLogin, (req, res) => {
	res.send({ token: jwt(req.user) })
})


export default app

