import authRouter from './auth'
import ordersRouter from 'routes/orders'
import usersRouter from 'routes/users'
import countriesRouter from 'routes/countries'
import addressesRouter from 'routes/addresses'
import shipmentsRouter from 'routes/shipments'


export default (app) => {
	app.use('/auth', authRouter),
	app.use('/countries', countriesRouter),
	app.use('/users', usersRouter),
	app.use('/orders', ordersRouter),
	app.use('/shipments', shipmentsRouter),
	app.use('/addresses', addressesRouter)
}