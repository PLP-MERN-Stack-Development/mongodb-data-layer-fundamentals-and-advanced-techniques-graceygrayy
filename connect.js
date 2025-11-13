const { MongoClient } = require("mongodb");

// Replace the URI with your MongoDB Atlas connection string
const uri = "mongodb+srv://MERN-STACK:Tinaa11@cluster0.1iaujfx.mongodb.net/StudentDb";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas!");

    // Test: list databases
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
