const container = require('../../core/container');
// Register dependencies in the container
const logger = require('../../core/logger');
container.register('logger', logger);
const database = require('../../database');
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

module.exports = userController;
