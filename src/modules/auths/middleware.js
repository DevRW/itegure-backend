import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { config } from 'dotenv';
import userService from '../users/service';
import response from '../generates/response';
config();

const { SECRET_OR_KEY } = process.env;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_OR_KEY;

export class AuthMiddleware {
  /**
   * verifty auth token with passport jwt and decode token
   */
  authenticateWithJwt() {
    passport.use(
      new Strategy(opts, (payload, done) => {
        userService
          .findOne({ where: { id: payload.id } })
          .then((user) => {
            if (user) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          })
          .catch((error) => {
            return done(null, false);
          });
      })
    );
  }
  /**
   * check if user is authenticated
   */
  isAuth(req, res, next) {
    try {
      // check auth
      passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
          return response.errorResponse({
            res,
            status: 401,
            data: response.authError('unauthorized, please login to proceed'),
          });
        }
        if (user) {
          const { id, username, email, avatar, roles } = user;
          req.user = { id, username, email, avatar, roles };
          return next();
        }
      })(req, res, next);
    } catch (error) {
      return response.errorResponse({
        res,
        status: 500,
        data: response.serverError('something went wrong please try again.'),
      });
    }
  }
}
export default new AuthMiddleware();
