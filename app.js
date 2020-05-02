import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import routes from './src/modules/setup.routes';
const isProduction = process.env.NODE_ENV === 'production';
const app = express();
const PORT = process.env.PORT || 5000;

// morgan configuration
app.use(morgan('dev'));
// cors setup
app.use(cors());
app.use(
  bodyParser.urlencoded({
    limit: '500mb',
    extended: false,
    parameterLimit: 500000,
  })
);
app.use(bodyParser.json({ limit: '500mb' }));
//passport
app.use(passport.initialize());

// route setup
app.use(routes);
// / catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  let error = {};
  if (!isProduction) {
    error = err;
  }
  return res.status(err.status || 500).json({
    errors: {
      message: err.message,
      error,
    },
  });
});
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

export default app;
