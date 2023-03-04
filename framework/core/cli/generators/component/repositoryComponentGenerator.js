class RepositoryComponentGenerator {
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

module.exports = RepositoryComponentGenerator;
