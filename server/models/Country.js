import mongoose, { Schema } from 'mongoose'
import provinceSchema from './provinceSchema'


const countrySchema = new Schema({
	name: { type: String },
	isoA2: { type: String },
	isoA3: { type: String },
	phoneCode: { type: String },
	currencyCode: { type: String },
	currencySimbol: { type: String },
	uriFlag: { type: String },
	provinces: [provinceSchema],
	enabled: { type: Boolean, default: false }
})



/**
*
* GET_ALL_COUNTRIES
*/
countrySchema.static('getCountries', function(){
	let Country = this
	return Country.find({ enabled:true }).sort({name:1, 'provinces.name':1}).then(countries => countries)
})


const Country = mongoose.model('Country', countrySchema, 'countries')

export default Country

