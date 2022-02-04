const express = require('express');
const helmet = require('helmet');
const config = require('./config');
const loaders = require('./loaders');
const events = require('./scripts/events');
const path = require('path');
var cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const { UserRoutes, CustomerRoutes } = require('./api-routes');

config();
loaders();
events();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

app.listen(process.env.APP_PORT, () => {
  console.log('Server started at port ' + process.env.APP_PORT);
  app.use('/users', UserRoutes);
  app.use('/customers', CustomerRoutes);
  app.use('/customersa', CustomerRoutes);

  app.use((req, res, next) => {
    const error = new Error('The page you are looking for does not exist...');
    error.status = 404;
    next(error);
  });

  app.use(errorHandler);
});
