const mongodb = require("mongodb");

const connectionString = "mongodb://localhost:27017"; // mongodb://127.0.0.1:27017
const client = new mongodb.MongoClient(connectionString);

async function connectDb() {
  client.connect();

  const db = client.db("CubesDB");
  const cubes = db.collection("cubes");

  const result = await cubes.find().toArray();
  console.log(result);
}

connectDb();
