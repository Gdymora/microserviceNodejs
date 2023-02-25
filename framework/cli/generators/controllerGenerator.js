class ControllerGenerator {
  static generate(name) {
    return `const ${name}Service = require('../services/${name}Service');

class ${name}Controller {
  static get(req, res) {
    const data = ${name}Service.getData();
    res.send(data);
  }

  static post(req, res) {
    res.send('${name} controller - post method');
  }

  static put(req, res) {
    res.send('${name} controller - put method');
  }

  static delete(req, res) {
    res.send('${name} controller - delete method');
  }
}

module.exports = ${name}Controller;
`;
  }
}
module.exports = ControllerGenerator;
