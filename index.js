const express=require('express')
const cors=require('cors')
require('dotenv').config()
const bcrypt = require('bcryptjs');
const app=express()
const port=process.env.PORT || 5000


app.use(cors())
app.use (express.json())






const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DATABASE_URI

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

    const userCollection=client.db('3wCompany').collection('user')


app.post('/users' ,async(req,res) =>{
  const user=req.body
  const username=user.username
  const email=user.email
  const password=user.password
  const pass=bcrypt.hashSync(password ,10)
  const userData={
    username ,
    email,
    pass
  }
  const result=await userCollection.insertOne(userData)
  console.log(result)
  res.send(result)
})
  


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Server is running')
})
app.listen(port ,()=>{
    console.log(`Server is ok and running ${port}`)
})