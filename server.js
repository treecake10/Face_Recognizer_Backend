const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

require('dotenv').config();
//process.env.

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//const PASS = process.env.PASSWORD

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
    	rejectUnauthorized: false
  	}	
  }
});

//db.select('*').from('users');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=> {
	res.send("Welcome");
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }) 

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server is listening on port ${process.env.PORT}`);
})

//console.log(PORT)