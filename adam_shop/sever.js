const express = require('express');
const env = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var session = require('express-session');

const app = express();
const PORT = 3000;
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use('/images', express.static(path.join(__dirname, '/images')));
app.use('/webfonts', express.static(path.join(__dirname, '/webfonts')));
app.use('/js', express.static(path.join(__dirname, '/js')));
app.use('/css', express.static(path.join(__dirname, '/css')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(PORT, () => {
  console.log(`sever is running on port:${PORT}`);
});
