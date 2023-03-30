const themeService = require('../services/themeService');

class themeController {
  static get(req, res) {
    const data = themeService.getData();
    res.send(data);
  }

  static post(req, res) {
    res.send('theme controller - post method');
  }

  static put(req, res) {
    res.send('theme controller - put method');
  }

  static delete(req, res) {
    res.send('theme controller - delete method');
  }
}

module.exports = themeController;
