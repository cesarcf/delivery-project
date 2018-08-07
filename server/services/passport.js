import passport from 'passport'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import LocalStrategy from 'passport-local'
import User from 'models/User'
import keys from 'config/keys'

//////////////////////////////////////////
///////// OAuth Strategy ///////////
//////////////////////////////////////////
passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => done(null, user))
})




//////////////////////////////////////////
///////// JWT Strategy ///////////
////////////////////////////////////////////
const jwtOptions = {

	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: keys.JWT_SECRET
}

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
	const user = await User.findById(payload.sub)
	if(user){
		done(null, user)
	}else{
		done(null, false)
	}

})

passport.use(jwtLogin)




//////////////////////////////////////////
///////// Local Strategy ///////////
////////////////////////////////////////////
const localOptions = { usernameField: 'email', passwordField: 'password' }
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
	User.findOne({ email: email.toLowerCase() })
		.then(user => {
			user.comparePassword(password, (err, isMatch) => {
				if(err) { return done(err) }
				if(!isMatch){ return done(null, false) }

				user.update({ $addToSet: { 'authMethod': 'local' } }).then(() => {
					return done(null, user)
				})
			})
		})
		.catch(err => done(null, false))
});

passport.use(localLogin)



