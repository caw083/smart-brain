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


// Define the async function to search for a user
async function searchUser(email) {
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

// Call the function and use await to get the result
async function someFunction(email) {
  try {
    const userData = await searchUser(email);
    if (userData.id) {
      console.log('User found:', userData);
    } else {
      console.log('User not found.');
    }
  } catch (err) {
    console.error(err);
  }
}

// Call the function with the email you want to search for
someFunction('sally@gmail.com');


async function getAllUsers(){
    try{
        const data = await postgres.select('*').from('users');
        console.log(data);
        return data;
    }
    catch(err){
        console.log(err);
    }
}
