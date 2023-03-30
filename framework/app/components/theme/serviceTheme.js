const themeRepository = require('../repositories/themeRepository');

class themeService {
  static getData() {
    return themeRepository.getData();
  }
}

module.exports = themeService;
