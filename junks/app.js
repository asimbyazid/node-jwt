const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const app = express();

const authRoutes = require('./routes/authRoutes')

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser())


// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://nightowl:nightowl123@jwt-cluster.o578qwb.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    app.listen(3000)
    console.log('DB connected Successfully')
  })
  .catch((err) => console.error(err.message));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes)

//cookies
app.get('/set-cookies', (req,res) =>{
  //res.setHeader('Set-Cookie','newUser=true');
  //res.cookie('newuser',false)
  //res.cookie('isEmployee',true,{maxAge:1000 *60 *60 * 24,secure:true,httpOnly:true})
  //secure:true {only work if it's on https} httpOnly {to allow only the server to see it, not the browser} 
  res.send('you got the cookies!')
})

app.get('/read-cookies', (req,res) =>{
  const cookies  = req.cookies;
  console.log(cookies)
  res.json(cookies)
}) 