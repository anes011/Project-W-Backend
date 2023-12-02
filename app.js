const http = require('http');
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const users = require('./routes/users');
const addOffer = require('./routes/addOffer');
const comments = require('./routes/comments');
const reservation = require('./routes/reservation');
const acceptedReservation = require('./routes/acceptedReservation');

mongoose.connect('mongodb://localhost:27017/project-w');
const db = mongoose.connection;

db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Database is up and running ;)'));

app.use(express.json());
app.use(cors());
app.use(express.static('profile-Photos'));

app.use('/users', users);
app.use('/addOffer', addOffer);
app.use('/comments', comments);
app.use('/reservation', reservation);
app.use('/acceptedReservation', acceptedReservation);

const server = http.createServer(app);

server.listen(port);