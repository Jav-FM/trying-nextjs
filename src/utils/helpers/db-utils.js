import { MongoClient } from "mongodb";
const mongoDbUser = process.env.REACT_APP_MONGODB_USER;
const mongoDbPassword = process.env.REACT_APP_MONGODB_PASSWORD;
const dbName = "events";

const connectDatabase = async () => {
  const url = `mongodb+srv://${mongoDbUser}:${mongoDbPassword}@cluster0.2hfpeoq.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);
  await client.connect();
  console.log("Connected successfully to the server");
  return client;
};

const insertDocument = async (client, collection, document) => {
  const db = client.db(dbName);
  const thisCollection = db.collection(collection);
  const insertDocumentResult = await thisCollection.insertOne(document);
  console.log("inserted document:", insertDocumentResult);
  return insertDocumentResult;
};

const getDocuments = async (client, collection, filters, sort) => {
  const thisFilters = filters ? filters : {};
  const thisSort = sort ? sort : {};
  const db = client.db(dbName);
  const thisCollection = db.collection(collection);
  const findResult = await thisCollection
    .find(thisFilters)
    .sort(thisSort)
    .toArray();
  return findResult;
};

export { connectDatabase, insertDocument, getDocuments };
