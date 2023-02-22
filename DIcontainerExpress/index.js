const express = require('express');
const container = require('./container');

const app = express();

// Register dependencies in the container
const logger = require('./logger');
container.register('logger', logger);
const database = require('./database');
container.register('database', database);
const userRepository = require('./userRepository');
container.register('userRepository', userRepository);
const userValidator = require('./userValidator');
container.register('userValidator', userValidator);

const userServiceFactory = require('./userService');
// Initialize the user service
const userService = userServiceFactory(
  container.resolve('logger'),
  container.resolve('database'),
  container.resolve('userValidator')
);
userService.init();
const userControllerFactory = require('./userController');
const userController = userControllerFactory(
  userService,
  container.resolve('logger')
);

// Use the dependencies in the Express.js app
app.use('/users', userController.init());

app.use(function (err, req, res, next) {
  const logger = container.resolve('logger');
  logger.error(err);
  res.status(500).send('Something went wrong');
});

app.listen(3000, function () {
  console.log('Server listening on port 3000');
});
