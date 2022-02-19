const express = require('express');
var compression = require('compression');
const helmet = require('helmet');
const config = require('./config');
const loaders = require('./loaders');
const events = require('./scripts/events');
var cors = require('cors');
const rateLimit = require('express-rate-limit');

const errorHandler = require('./middlewares/errorHandler');
const { UserRoutes, CustomerRoutes } = require('./api-routes');

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 60 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

config();
loaders();
events();

const app = express();
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cors());

app.listen(process.env.APP_PORT, () => {
  console.log('Server started at port ' + process.env.APP_PORT);
  app.use('/users', UserRoutes);
  app.use('/customers', CustomerRoutes);

  app.use((_, _, next) => {
    const error = new Error('The page you are looking for does not exist...');
    error.status = 404;
    next(error);
  });

  app.use(errorHandler);
});
