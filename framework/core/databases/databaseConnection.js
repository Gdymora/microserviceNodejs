// Define an abstract class for connecting to databases
class DatabaseConnection {
  constructor() {
    if (new.target === DatabaseConnection) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
  }

  // This method is to be implemented by concrete subclasses
  connect() {
    throw new Error("Method 'connect()' must be implemented.");
  }

  // This method is to be implemented by concrete subclasses
  disconnect() {
    throw new Error("Method 'disconnect()' must be implemented.");
  }

  // This method is shared by all concrete subclasses
  query(queryString) {
    throw new Error("Method 'query()' must be implemented.");
  }
}

module.exports = DatabaseConnection;