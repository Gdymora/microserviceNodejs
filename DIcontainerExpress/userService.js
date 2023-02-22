const UserRepository = require('./userRepository');
class UserService {
  constructor(logger, database, userRepository, userValidator) {
    this.logger = logger;
    this.database = database;
    this.userRepository = userRepository;
    this.userValidator = userValidator;
  }

  async init() {
    try {
      // Initialize the user repository and create the `users` table if it does not exist
      //await this.userRepository.insertTable();
      this.logger.info('User service initialized');
    } catch (err) {
      this.logger.error(`Error initializing user service: ${err}`);
    }
  }

  async getAllUsers() {
    return await this.userRepository.getAll();
  }

  async getUserById(id) {
    return await this.userRepository.getById(id);
  }

  async createUser(user) {
    // Validate the user data before creating the user
    const validationResult = this.userValidator.validateUser(user);
    if (!validationResult.valid) {
      throw new Error(validationResult.errors.join(', '));
    }

    // Create the user and log the operation
    const userId = await this.userRepository.create(user);
    this.logger.info(`User created: ${userId}`);

    return userId;
  }

  async updateUser(id, user) {
    // Validate the user data before updating the user
    const validationResult = this.userValidator.validateUser(user);
    if (!validationResult.valid) {
      throw new Error(validationResult.errors.join(', '));
    }

    // Update the user and log the operation
    const rowsAffected = await this.userRepository.update(id, user);
    this.logger.info(`User updated: ${rowsAffected} rows affected`);

    return rowsAffected;
  }

  async deleteUser(id) {
    // Delete the user and log the operation
    const rowsAffected = await this.userRepository.delete(id);
    this.logger.info(`User deleted: ${rowsAffected} rows affected`);

    return rowsAffected;
  }
}

module.exports = (logger, database, userValidator) => {
  const userRepository = new UserRepository();
  return new UserService(logger, database, userRepository, userValidator);
};
