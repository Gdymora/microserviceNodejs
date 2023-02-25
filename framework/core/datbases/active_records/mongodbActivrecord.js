const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema for User collection
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// Define User model using UserSchema
const UserModel = mongoose.model('User', UserSchema);

// Define User class
class MongoDbActivRecord {
  constructor(data) {
    this.data = data;
    this.errors = [];
  }

  // Getters and setters for User data
  get(name) {
    return this.data[name];
  }

  set(name, value) {
    this.data[name] = value;
  }

  // Validate User data
  validate() {
    if (!this.data.name) {
      this.errors.push('Name is required');
    }

    if (!this.data.email) {
      this.errors.push('Email is required');
    }

    if (!this.data.age || isNaN(this.data.age)) {
      this.errors.push('Age is required and must be a number');
    }
  }

  // Save User data to MongoDB
  async save() {
    this.validate();

    if (this.errors.length === 0) {
      try {
        const user = new UserModel(this.data);
        const result = await user.save();
        return result;
      } catch (error) {
        this.errors.push(error.message);
      }
    }
  }

  // Find User by ID
  static async find(id) {
    try {
      const user = await UserModel.findById(id);
      return new User(user);
    } catch (error) {
      return null;
    }
  }

  // Update User by ID
  static async update(id, data) {
    try {
      const user = await UserModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      return new User(user);
    } catch (error) {
      return null;
    }
  }

  // Delete User by ID
  static async delete(id) {
    try {
      const result = await UserModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      return null;
    }
  }
}

module.exports = MongoDbActivRecord;