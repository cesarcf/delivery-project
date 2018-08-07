import passport from 'passport'
import passportService from 'services/passport'

const requireJWT = passport.authenticate('jwt', { session: false })

export default requireJWT