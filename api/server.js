
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

server.get('/api/users', (req, res) => {
    Users.get()
        .then(result => {
            res.json(result)
        })
})

server.post('/api/register', (req, res) => {
    let { username, password } = req.body
    if (typeof username != 'string' || username != '') {
        res.status(400).json({ message: 'invalid user' })
    } else if (typeof password != 'string' || password === '') {
        res.status(400).json({ message: "invalid password" })
        return
    }
    username = username.trim()
    password = password.trim()
    Users.add({ username: username, password: password })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {

        })
})

module.exports = server