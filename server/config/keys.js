if(process.env.NODE_ENV === 'production'){
	console.log('WE ARE IN PRODUCTION')
	module.exports = require('./prod')

} else {
	console.log('WE ARE IN DEVELOPMENT')
	module.exports = require('./dev')

}