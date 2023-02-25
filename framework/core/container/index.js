const dependencies = {};

function register(name, dependency) {
  dependencies[name] = dependency;
}

function resolve(name) {
  if (dependencies[name]) {
    return dependencies[name];
  }

  throw new Error(`Dependency not found: ${name}`);
}

module.exports = {
  register,
  resolve,
};
