import express from 'express';
import 'dotenv/config'
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cors from"cors";

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'PasswordManager';
await client.connect();
const app = express()

app.use(cors())

const port = 3000
app.use(bodyParser.json())

app.get('/', async(req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
})

app.post('/', async(req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  // res.json(findResult);
  res.send({success:true,result:findResult});
})

app.delete('/', async(req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  // res.json(findResult);
  res.send({success:true,result:findResult});
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})