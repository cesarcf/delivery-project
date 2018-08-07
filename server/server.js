import http from 'http'
import express from 'express'
const app = express()
const server = http.createServer(app)
import socketIO from 'socket.io'
const io = socketIO(server)
io.on('connection', function(socket){
	console.log(`Connected to App: ${socket.id}`)

	socket.on('disconnect', function(){
		console.log(`DISCONNECT to App: ${socket.id}`)
	})

	app.io = io
})

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