const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const {requireAuth, checkUser} = require('./middleware/authMiddleware')
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
app.get('*',checkUser) //check user to every routes
app.get('/', requireAuth,(req, res) => res.render('home'));
app.get('/smoothies', requireAuth,(req, res) => res.render('smoothies'));
app.use(authRoutes)

