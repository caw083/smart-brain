const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

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
        if (user.email === email && user.password === password) {
            return user;
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
    if (isUserNotExist(email)) {
        database.users.push({
            id: database.users.length + 1,
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
        });
        res.json(database.users[database.users.length - 1]);
        saveDatabaseToJSONFile(0);}  
    else {
        res.json('user already exist');
    }
  }    
)

app.get('/profile/:id', (req,res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === Number(id) || user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    if (!found) {
        res.status(404).json('no such user');
    }
})

app.post('/image', (req,res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === Number(id) || user.id === id) {
            found = true;
            user.entries++;
            saveDatabaseToJSONFile(0);
            return res.json(user);
        }
    });
    if (!found) {
        res.status(404).json('no such user');
    }

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