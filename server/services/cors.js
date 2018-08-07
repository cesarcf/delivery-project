import cors from 'cors'

export default (app) => {
	const allowedOrigins = [
		'http://localhost:3000',
		'https://saloodo.com' //HOST PRODUCTION
	];

	const corsOptions = {
		origin: function(origin, cb){
			// allow requests with no Origin (like Mobile Apps or CURL Requests or Postman)
			if(!origin) return cb(null, true)

			if(allowedOrigins.indexOf(origin) === -1){
				var msg = `The CORS policy for this site does not allow access from the specified Origin.`
				return cb(new Error(msg), false);
			}
			return cb(null, true);
		},

		methods: ['GET', 'POST', 'PUT', 'DELETE']
	}

	app.use(cors(corsOptions))

}