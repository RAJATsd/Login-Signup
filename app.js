const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

app.set('view engine','ejs');
app.set('views','views');

const authroutes = require('./routes/authroutes');

app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret: 'rajatstuff'
}));



app.use(authroutes);

mongoose.connect('mongodb://localhost:27017/lists',{useNewUrlParser:true})
.then(result =>{
    console.log('connected to db');
    app.listen(3000);
}).catch(err => {
    console.log(err);
});