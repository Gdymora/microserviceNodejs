class DatabaseBuilder {
  constructor() {
    if (new.target === DatabaseBuilder) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
  }

  // These methods are to be implemented by concrete subclasses
  connect() {
    throw new Error("Method 'connect()' must be implemented.");
  }

  configure() {
    throw new Error("Method 'configure()' must be implemented.");
  }

  // This method is shared by all concrete subclasses
  build() {
    throw new Error("Method 'build()' must be implemented.");
  }
}

module.exports = DatabaseBuilder;