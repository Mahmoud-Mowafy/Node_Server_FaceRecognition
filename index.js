const express = require('express');
const cors = require('cors');
const path = require('path')
 
//import Route

const faceRoute = require("./router/face.js")


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
/********************** Cors Issue **************************/
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
    next()
  })

app.use('/api/faces',faceRoute);


app.listen(3000,()=>{
    console.log("Server Running")
});