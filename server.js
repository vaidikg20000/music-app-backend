const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors'); 
const app = express();
const jwtGenerator = require('./utils/jwtGenerator');

app.use(express.json());    
app.use(cors());
app.use('/auth', require('./routes/auth'));
app.use('/songs', require('./routes/songs'));


app.get("/",(req,res)=>{
    const token = jwtGenerator('sample');
    res.json({token});
})


app.listen(process.env.PORT || 3000 , function() {
    console.log('listening on 3000');
})