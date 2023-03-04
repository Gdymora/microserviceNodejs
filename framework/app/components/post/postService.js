const PostRepository = require('./postRepository');

class PostService {
  constructor(logger, database, postRepository, postValidator) {
    this.logger = logger;
    this.database = database;
    this.postRepository = postRepository;
    this.postValidator = postValidator;
  }

  async init() {
    try {
      // Initialize the post repository and create the `posts` table if it does not exist
      //await this.postRepository.insertTable();
      this.logger.info('Post service initialized');
    } catch (err) {
      this.logger.error(`Error initializing post service: ${err}`);
    }
  }

  async getAllPosts(db) {
    return await this.postRepository.getAll(db);
  }

  async getPostById(db, id) {
    return await this.postRepository.getById(db, id);
  }

  async createPost(post) {
    // Validate the post data before creating the post
    /*  const validationResult = this.postValidator.validatePost(post);
    if (!validationResult.valid) {
      throw new Error(validationResult.errors.join(', '));
    } */

    // Create the post and log the operation
    const postId = await this.postRepository.create(db, post);
    this.logger.info(`Post created: ${postId}`);

    return postId;
  }

  async updatePost(id, post) {
    // Validate the post data before updating the post
    const validationResult = this.postValidator.validatePost(post);
    if (!validationResult.valid) {
      throw new Error(validationResult.errors.join(', '));
    }

    // Update the post and log the operation
    const rowsAffected = await this.postRepository.update(db, id, post);
    this.logger.info(`Post updated: ${rowsAffected} rows affected`);

    return rowsAffected;
  }

  async deletePost(id) {
    // Delete the post and log the operation
    const rowsAffected = await this.postRepository.delete(db, id);
    this.logger.info(`Post deleted: ${rowsAffected} rows affected`);

    return rowsAffected;
  }
}

module.exports = (logger, database, postValidator) => {
  const postRepository = new PostRepository();
  return new PostService(logger, database, postRepository, postValidator);
};
