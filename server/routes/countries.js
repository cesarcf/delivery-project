import express from 'express'
const app = express.Router()
import Country from 'models/Country'


/**
* get all Countries
**/
app.get('/', (req, res) => {
	Country.getCountries()
		.then(countries => res.send(countries))
})

export default app