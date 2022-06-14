const express = require('express');
const bodyParser= require('body-parser');
const {MongoClient} = require('mongodb');
const cors = require('cors'); 
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());    
app.use(cors());

app.get("/",(req,res)=>{
    // res.send("working");
    res.status(200).json({ name: "Elie" });
})

app.listen(3000, function() {
    console.log('listening on 3000');
})