import http from 'http'
import express from 'express'
import socketIO from 'socket.io'
const app = express()
const server = http.createServer(app)
const io = socketIO(server)
app.io = io//Attach the io instance to your app
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import keys from 'config/keys'
import routes from 'routes'
import cors from 'services/cors'
import passport from 'passport'
import methodOverride from 'method-override'

mongoose.Promise = global.Promise
mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true })

cors(app)
app.use(morgan('dev'))
app.use(bodyParser.json({ type: '*/*' }))
app.use(passport.initialize());
app.use(methodOverride('X-HTTP-Method-Override', ['POST','DELETE','PUT']))

routes(app)


io.on('connection', (socket) => {
	console.log(`Connected ${socket.id}`)

	socket.on('disconnect', () => {
		console.log(`Disconnected ${socket.id}`)
	})

})


if(process.env.NODE_ENV === 'production'){
	app.set('x-powered-by', false)
	app.use(express.static('../client/build'))

	const path = require('path')

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../','client', 'build', 'index.html'));
	})
}

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`${keys.MONGO_URI} - NodeJS in PORT: ${PORT}`))