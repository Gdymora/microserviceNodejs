const express = require('express');
class UserController {
  constructor(userService, logger) {
    this.userService = userService;
    this.logger = logger;
  }

  async getAllUsers(req, res) {
    try {
      const user = await this.userService.getAllUsers();
      res.status(200).json(user);
    } catch (err) {
      this.logger.error(err);
      res.status(500).send('An error occurred while retrieving the user.');
    }
  }

  async createUser(req, res) {
    try {
      console.log(req.body);
      const user = await this.userService.createUser(req.body);

      res.status(201).json(user);
    } catch (err) {
      this.logger.error(err);
      res.status(500).send('An error occurred while creating the user.');
    }
  }

  async getUser(req, res) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      this.logger.error(err);
      res.status(500).send('An error occurred while retrieving the user.');
    }
  }

  async updateUser(req, res) {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (err) {
      this.logger.error(err);
      res.status(500).send('An error occurred while updating the user.');
    }
  }

  async deleteUser(req, res) {
    try {
      await this.userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (err) {
      this.logger.error(err);
      res.status(500).send('An error occurred while deleting the user.');
    }
  }

  init() {
    const router = express.Router();
    router.get('/', this.getAllUsers.bind(this));
    router.post('/', this.createUser.bind(this));
    router.get('/:id', this.getUser.bind(this));
    router.put('/:id', this.updateUser.bind(this));
    router.delete('/:id', this.deleteUser.bind(this));
    return router;
  }
}

module.exports = (userService, logger) => {
  return new UserController(userService, logger);
};
