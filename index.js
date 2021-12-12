const express = require('express');
const cors = require('cors');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// hellow-world
// C6GuosFVD5AufXbY

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oroy6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      console.log('mongo database connected successfully');
      const database = client.db("hellow-world");
      const serviceCollection = database.collection("people");

      // services get api
      app.get('/users', async(req, res)=>{
        const cursor = serviceCollection.find({});
        const services = await cursor.toArray();
        res.json(services);
      })

      app.post('/users', async(req, res)=>{
        const service = req.body;
        const result = await serviceCollection.insertOne(service);
        res.json(result);
      })


    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res)=>{
    console.log('tourism service server successfully running'),
    res.send('tourism service server runing by node express')
})

app.listen(port, ()=>{
    console.log('server is runing with port', port );
})