const { MongoClient, ObjectID } = require('mongodb');

class MongoDbBuilder {
  constructor(databaseName, collectionName) {
    this.databaseName = databaseName;
    this.collectionName = collectionName;
    this.query = {};
  }

  async find(query = {}, options = {}) {
    const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
    const db = client.db(this.databaseName);
    const collection = db.collection(this.collectionName);
    const cursor = collection.find(query, options);
    const results = await cursor.toArray();
    await client.close();
    return results;
  }

  async findOne(query = {}, options = {}) {
    const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
    const db = client.db(this.databaseName);
    const collection = db.collection(this.collectionName);
    const result = await collection.findOne(query, options);
    await client.close();
    return result;
  }

  where(key, value) {
    this.query[key] = value;
    return this;
  }

  whereId(id) {
    this.query._id = new ObjectID(id);
    return this;
  }

  async insertOne(document) {
    const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
    const db = client.db(this.databaseName);
    const collection = db.collection(this.collectionName);
    const result = await collection.insertOne(document);
    await client.close();
    return result.insertedId;
  }

  async updateOne(document) {
    const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
    const db = client.db(this.databaseName);
    const collection = db.collection(this.collectionName);
    const result = await collection.updateOne({ _id: document._id }, { $set: document });
    await client.close();
    return result.modifiedCount;
  }

  async deleteOne(id) {
    const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
    const db = client.db(this.databaseName);
    const collection = db.collection(this.collectionName);
    const result = await collection.deleteOne({ _id: new ObjectID(id) });
    await client.close();
    return result.deletedCount;
  }
}

module.exports = MongoDbBuilder;

/* 
const QueryBuilder = require('./queryBuilder');

const builder = new QueryBuilder('myDatabase', 'myCollection');

// Find all documents with a name of 'John'
const results = await builder.where('name', 'John').find();
console.log(results);

// Find a document by ID
const result = await builder.whereId('605d368ef2085e42f9d8b5fb').findOne();
console.log(result);

// Insert a new document
const insertedId = await builder.insertOne({ name: 'Jane' });
console.log(insertedId);

// Update a document
const numUpdated = await builder.updateOne({ _id: '605 */