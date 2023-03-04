const namRepository = require('../repositories/namRepository');

class namService {
  static getData() {
    return namRepository.getData();
  }
}

module.exports = namService;
