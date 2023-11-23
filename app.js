const http = require('http');
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const users = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/project-w');
const db = mongoose.connection;

db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Database is up and running ;)'));

app.use(express.json());
app.use(cors());
app.use(express.static('profile-Photos'));

app.use('/users', users);

const server = http.createServer(app);

server.listen(port);