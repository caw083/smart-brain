const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();
const database = JSON.parse(fs.readFileSync('./database.json').toString());

async function saveDatabaseToJSONFile(n) {
    fs.writeFile('./database.json', JSON.stringify(database), (err) => {    
        if (n >= 3) {
            return "error";
        };

        try {
            console.log('The file has been saved!');
        } catch (err) {
            saveDatabaseToJSONFile(n+1);
        }
    }  
  )
}

function searchUserbyEmail(email, password) {
    
    const user = database.users.find(user => {
        if (user.email === email) {
            if (bcrypt.compareSync(password, user.password)){
                return user;
            }
          }
        }
    );
    if (user === undefined) {
        return "password or email is incorrect";
    } 
    return user;
}

function isUserNotExist(email) {
    const user = database.users.find(user => {
        if (user.email === email) {
            return user;
            }
        }
    );
    if (user === undefined) {
        return true;
    } 
    return false;
}

function searchUserbyId(id){
    let found = false;
    const user = database.users.find(user => {
        if (user.id === Number(id) || user.id === id) {
            found = true;
            return user;
        }
    });
    if (!found) {
        return 'no such user';
    }
    return user;
    
}

// body parser middleware very important to parse the body of the request
// you can't use req.body without this middleware because it will be undefined

app.use(bodyParser.json());

app.use((req, res, next) => {
    next();
})



app.get('/', (req, res) => {
    res.json(database.users);

})


app.post('/signin' , (req,res) => {
    const {email, password} = req.body;
    try {
        res.json(searchUserbyEmail(email, password));
    } catch (err) {
        res.status(400).json('error logging in');
    }
  }
)

app.post('/register', (req,res) =>{
    const {email, name, password} = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        // Store hash in your password DB.
        if (isUserNotExist(email)) {
            database.users.push({
                id: database.users.length + 1,
                name: name,
                email: email,
                password: hash,
                entries: 0,
                joined: new Date()
            });
            res.json(database.users[database.users.length - 1]);
            saveDatabaseToJSONFile(0);}  
        else {
            res.json('user already exist');
        }

    });
   
  }    
)

app.get('/profile/:id', (req,res) => {
    const {id} = req.params;
    const user  = searchUserbyId(id);
    user === 'no such user' ? res.status(404).json(user) : res.json(user); 
  }
)

app.post('/image', (req,res) => {
    const {id} = req.body;
    const user  = searchUserbyId(id);
    user.entries++;
    saveDatabaseToJSONFile(0);
    user === 'no such user' ? res.status(404).json(user) : res.json(user);

})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})



/* 

/ --> res = this is working
/ signin --> POST = success/fail
/ register --> POST = user
/ profile/:userId --> GET = user
/ image --> PUT --> user

*/