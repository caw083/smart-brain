const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const database = { 
    users : [ 
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()

        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

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


// body parser middleware very important to parse the body of the request
// you can't use req.body without this middleware because it will be undefined

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log('Middleware 1');
    console.log(req.body);
    next();
})



app.get('/', (req, res) => {
    res.send('Hello World');

})


app.post('/signin' , (req,res) => {
    res.json('signin')
}) 

app.post('/register', (req,res) =>{
    console.log(req.body);
    const {email, name, password} = req.body;
    database.users.push({
        id: database.users.length + 1,
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1]);
    saveDatabaseToJSONFile(0);
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