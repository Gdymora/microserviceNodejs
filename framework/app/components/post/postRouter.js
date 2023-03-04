const container = require('../../../core/container');
// Register dependencies in the container
const logger = require('../../../core/logger');
container.register('logger', logger);
const database = require('../../../database');
container.register('database', database);
const postRepository = require('./postRepository');
container.register('postRepository', postRepository);
const postValidator = require('./postValidator');
container.register('postValidator', postValidator);

const postServiceFactory = require('./postService');
// Initialize the post service
const postService = postServiceFactory(
  container.resolve('logger'),
  container.resolve('database'),
  container.resolve('postValidator')
);
postService.init();
const postControllerFactory = require('./postController');
const postController = postControllerFactory(
  postService,
  container.resolve('logger')
);

module.exports = postController;
