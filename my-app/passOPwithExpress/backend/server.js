const bodyParser = require('body-parser');
const express = require('express')
const bodyparser=require('body-parser')
require('dotenv').config()
const cors=require ('cors')
console.log(process.env.MONGO_URI)


const { MongoClient, ServerApiVersion } = require("mongodb");
// Replace the placeholder with your Atlas connection string
const uri = "mongodb://localhost:27017/";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri) 
  
const dbName='passop';
const app=express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())


client.connect();
//get all pass
app.get('/',async (req, res) => {
  const db=client.db(dbName);
    const collection = db.collection("documents");
    const findResult=await collection.find({}).toArray();
    
  res.json(findResult)
})

//save a pass
app.post('/',async (req, res) => {
  const password=req.body
  const db=client.db(dbName);
    const collection = db.collection("passwords");
    const findResult=await collection.insertOne(password)
    
  res.send({success:true,result:findResult})
})

//delete
app.delete('/',async (req, res) => {
  const password=req.body
  const db=client.db(dbName);
    const collection = db.collection("passwords");
    const findResult=await collection.deleteOne(password)
    
  res.send({success:true,result:findResult})
})






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
   