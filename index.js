const express=require('express')
const mongoose =require('mongoose')
const cors =require('cors')
const  productRoutes =require('./routes/productRoutes.js')


const app=express();
app.use(express.json());
app.use(cors());

const port=7979;
require('dotenv').config();


app.get("/",(req,res)=>{
    res.send("Hello World");
})


mongoose.connect(process.env.Mongo_URI)
.then(()=>{
    console.log('mongoDb is connected');
    
}).catch(err=>console.error('could not connected to mongoDB',err))

  app.use("/api", productRoutes)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    
});