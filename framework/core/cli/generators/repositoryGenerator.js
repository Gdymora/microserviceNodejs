class RepositoryGenerator {
  static generate(name) {
    return `class ${name}Repository {
  static getData() {
    return '${name} data';
  }
}

module.exports = ${name}Repository;
`;
  }
}

module.exports = RepositoryGenerator;
