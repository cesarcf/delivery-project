import passport from 'passport'
import passportService from 'services/passport'

const requireLogin = passport.authenticate('local', { session: false })

export default requireLogin