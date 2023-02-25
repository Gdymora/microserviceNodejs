const usersService = require('../services/usersService');

class usersController {
  static get(req, res) {
    const data = usersService.getData();
    res.send(data);
  }

  static post(req, res) {
    res.send('users controller - post method');
  }

  static put(req, res) {
    res.send('users controller - put method');
  }

  static delete(req, res) {
    res.send('users controller - delete method');
  }
}

module.exports = usersController;
