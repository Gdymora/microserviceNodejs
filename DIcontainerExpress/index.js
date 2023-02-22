const express = require('express');
const userRouter = require('./userRouter');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 500 })
);
/* const container = require('./container');



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
); */

// Use the dependencies in the Express.js app
app.use('/users', userRouter.init());

app.use(function (err, req, res, next) {
  const logger = container.resolve('logger');
  logger.error(err);
  res.status(500).send('Something went wrong');
});

app.listen(3000, function () {
  console.log('Server listening on port 3000');
});
