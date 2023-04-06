const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const path = require('path');
const Data = require('./schema');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/data')
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database Connected");
});

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.set('views',path.join(__dirname,'views'));

app.get('/',async (req,res)=>{
    const datas = await Data.find({});
    console.log(datas)
    res.render('indexPage',{datas});
})

app.listen(3000,()=>{
    console.log("serving on 3000");
})


