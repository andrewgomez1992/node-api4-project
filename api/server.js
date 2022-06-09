
const express = require('express')

const server = express()
const cors = require('cors')
const Users = require('./data/users')

server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
    res.send(`<h1>${process.env.MESSAGE}</h1>`);
})

server.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
})

// "username": "samwise",
// "password": "gamgee"

server.get('/api/users', (req, res) => {
    Users.findAll()
        .then(result => {
            res.json(result)
        })
})

server.post('/api/register', (req, res) => {
    let { name, username, password } = req.body;
    if (typeof username != 'string' || username === '') {
        res.status(400).json({ message: 'invalid username' });
        return;
    } else if (typeof password != 'string' || password === '') {
        res.status(400).json({ message: 'invalid password' });
        return;
    } else if (typeof name != 'string' || name === '') {
        res.status(400).json({ message: 'invalid name' });
        return;
    }
    name = name.trim();
    username = username.trim();
    password = password.trim();
    Users.add({ name: name, username: username, password: password })
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Error adding the user' });
        });
});

server.post('/api/login', (req, res) => {
    let { username, password } = req.body;
    if (username == req.body.username && password == req.body.password) {
        res.send({ message: `welcome ${req.body.username}!` })
    } else {
        console.log(error => {
            res.status(500).json({ message: 'no username or password' });
        });
    }
})

module.exports = server