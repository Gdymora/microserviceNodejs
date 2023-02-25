class ServiceGenerator {
  static generate(name) {
    return `const ${name}Repository = require('../repositories/${name}Repository');

class ${name}Service {
  static getData() {
    return ${name}Repository.getData();
  }
}

module.exports = ${name}Service;
`;
  }
}
module.exports = ServiceGenerator;
