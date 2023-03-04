const namService = require('../services/namService');

class namController {
  static get(req, res) {
    const data = namService.getData();
    res.send(data);
  }

  static post(req, res) {
    res.send('nam controller - post method');
  }

  static put(req, res) {
    res.send('nam controller - put method');
  }

  static delete(req, res) {
    res.send('nam controller - delete method');
  }
}

module.exports = namController;
