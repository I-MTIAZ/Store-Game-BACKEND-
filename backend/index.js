// practice
// 36z09tXflyrdaJ1p
//jDgLIDrXyWNOgir6
//games
const express = require("express")
const cors = require("cors")
const app = express()
const ObjectId = require('mongodb').ObjectId
const port = 5000
// middle ware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://games:jDgLIDrXyWNOgir6@cluster0.v2p84i0.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("kam sarse")
    const database = client.db('GameServer')
    const serviceCollection = database.collection('services')
    // post = insert / put = update, get = fetch 
    app.post('/services', async (req, res) => {
      const service = req.body
      const result = await serviceCollection.insertOne(service)
      console.log(result)
      res.json(result)
    })

    app.get('/services', async (req, res) => {
      const cursor = serviceCollection.find({}).sort({ _id: -1 }).limit(1);
      const service = await cursor.toArray();
      res.send(service);
    });
    

    app.put('/services/:id',async(req,res)=>{
      const id = req.params.id.trim();
      console.log('updating id' ,id)
      const updateservice = req.body
      const filter = {_id: new ObjectId(id)}
      const Option = {upsert:true}
      const updateDoc = {
        $set:{
          name:updateservice.name,
          bal:updateservice.bal,
          onion:updateservice.onion,
          cap:updateservice.cap,
          cab:updateservice.cab,
          tomato:updateservice.tomato
        }
      }
      const result = await serviceCollection.updateOne(
        filter,
        updateDoc,
        Option,
      )
      console.log('updating id',id)
      res.json(result)

    })

    //GET SINGLE ID
     app.get('/services/:id',async(req,res) =>{
      const id = req.params.id.trim();
      const filter = {_id: new ObjectId(id)}
      const service = await serviceCollection.findOne(filter)
      res.json(service)
    })

  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running game app')
  })
  
  app.listen(port, () => {
    console.log(`games  on port ${port}`)
  })
