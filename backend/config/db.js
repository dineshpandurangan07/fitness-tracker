const mongoose = require('mongoose');

let mongod = null;

const connectDB = async () => {
  try {
    const connUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fitness_tracker';
    
    // Set connection timeout to 3 seconds so we can fall back quickly if local mongod is not active
    mongoose.set('strictQuery', false);
    
    try {
      const conn = await mongoose.connect(connUri, {
        serverSelectionTimeoutMS: 3000,
      });
      console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
      return;
    } catch (primaryErr) {
      console.warn(`Standard MongoDB connection to ${connUri} failed: ${primaryErr.message}`);
      console.log('Attempting in-memory MongoDB fallback for instant local evaluation...');
    }

    // In-memory fallback
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`In-Memory MongoDB Connected successfully: ${memoryUri}`);
    } catch (memErr) {
      console.error('Failed to initialize In-Memory MongoDB:', memErr.message);
      throw memErr;
    }
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
