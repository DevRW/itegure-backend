import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { config } from 'dotenv';
import userService from '../users/service';
import response from '../generates/response';
import subscriptionService from '../subscriptions/service';
config();

const { SECRET_OR_KEY, SUBSCRIPTION_SECRET_KEY } = process.env;
const opts = {};
const subScriptionOpts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_OR_KEY;

//
subScriptionOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
subScriptionOpts.secretOrKey = SUBSCRIPTION_SECRET_KEY;
export class AuthMiddleware {
  /**
   * verifty auth token with passport jwt and decode token
   */
  authenticateWithJwt() {
    // as the admin
    passport.use(
      'jwtAdmin',
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
    // as subscriber
    passport.use(
      'jwtSubscriber',
      new Strategy(subScriptionOpts, (payload, done) => {
        subscriptionService
          .findBySubscriptionId(payload.subscriptionId)
          .then((subscriber) => {
            if (subscriber) {
              return done(null, subscriber);
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
      passport.authenticate('jwtAdmin', { session: false }, (err, user, info) => {
        if (err || !user) {
          return response.errorResponse({
            res,
            status: 401,
            data: response.authError('unauthorized, please login to proceed'),
          });
        }
        if (user) {
          const { id, username, email, avatar, roles, createdAt } = user;
          req.user = { id, username, email, avatar, roles, createdAt };
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

  isSubscriberAuth(req, res, next) {
    try {
      // check auth
      passport.authenticate('jwtSubscriber', { session: false }, (err, user, info) => {
        if (err || !user) {
          return response.errorResponse({
            res,
            status: 401,
            data: response.authError('unauthorized, please login to proceed'),
          });
        }
        if (user) {
          const { subscriptionId, phoneNumber, name, createdAt } = user;
          req.subscriber = { subscriptionId, phoneNumber, name, createdAt };
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
