const { MongoMemoryServer } = require("mongodb-memory-server");

const globalSetup = async () => {
  const mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();

  global.__MONGOSERVER__ = mongoServer;
};

module.exports = globalSetup;
