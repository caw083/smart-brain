// import module for backend
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

// connect to database
const postgres = knex({
    client: 'pg',
    connection : {
        host : '127.0.0.1',
        user : 'christopher',
        password : 'caw083',
        database : 'smart brain'
    }
})



async function passwordHashing(email, password){
    const hash = bcrypt.hashSync(password);
    console.log(hash);
    postgres('login').insert({
        email : email,
        hash : hash
    })
    .then()
    .catch(err => console.log("login " + err));
}

async function Register(name,email, password){
    postgres('users').insert({
        name: name,
        email: email,
        entries:0,
        joined: new Date()
    }).then(response => passwordHashing(email, password)
    ).
    catch(err => console.log("users " + err));
}
// Register('chris','chris@gmail.com','chocholate');

async function updateUserEntries(id){
    postgres('users').where('id', '=', id).first()
    .increment('entries', 1).returning('entries')
    .then(entries => console.log(entries)).catch(err => console.log(err));
}

//updateUserEntries(2);


async function searchUserbyEmail(email) {
    try {
      const data = await postgres.select("users.id", "users.name", "users.email", "users.entries", "users.joined", "login.hash")
        .from('users')
        .rightJoin('login', 'users.email', 'login.email')
        .where('users.email', '=', email);
      return data[0] || {}; // If data is empty, return an empty object
    } catch (err) {
      console.error(err);
      throw err;
    }
}
async function searchUserById(id) {
    try {
      const data = await postgres.select("users.id", "users.name", "users.email", "users.entries", "users.joined", "login.hash")
        .from('users')
        .rightJoin('login', 'users.email', 'login.email')
        .where('users.id', '=', id);
      return data[0] || 'no such user'; // If data is empty, return an empty object
    } catch (err) {
      console.error(err);
      throw err;
    }
}

async function getUsersFromDatabase() {
    try {
      const data = await postgres.select('*').from('users');
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

// create express app
app = express();

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    next();
})

app.get('/', async (req, res) => {
    try{
        const data = await getUsersFromDatabase();
        console.log(data);
        res.json(data);
    }
    catch(err){
        console.log(err);
    }
})

app.get('/profile/:id', async (req,res) => {
    const {id} = req.params;
    const user  = await searchUserById(Number(id));
    user === 'no such user' ? res.status(404).json(user) : res.json(user); 
  }
)

app.put('/image', async (req,res) => {
    const {id} = req.body;
    console.log("image");
    await updateUserEntries(Number(id));
    const user  = await searchUserById(Number(id));
    user === 'no such user' ? res.status(404).json(user) : res.json(user);

})
app.post('/signin' , async (req,res) => {
    try{
        const {email, password} = req.body;
        const user = await searchUserbyEmail(email);
        if (user === {} || !bcrypt.compareSync(password, user.hash)){
            res.json('password or email is incorrect')
        } else {
            res.json(user);
        }
    }
    catch(err){
        res.status(400).json('error logging in');
    }
  }
)

app.post('/register', async (req,res) =>{
    try {
        const {email, name, password} = req.body;
        await Register(name,email, password);
        res.json('success');}
    catch(err){
        res.status(400).json('unable to register');
    }
  }
);
   
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})


