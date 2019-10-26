require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const dbService = require('./src/services/DBService');
const { Client } = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'chat_app',
  password: 'biggtits',
  port: 5432,
});

db.connect().then(() => console.log('CONNECTED'));


app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

app.get('/', (req, res) => {res.sendFile(path.join(__dirname, 'build', 'index.html'))});

app.get('/api/messages', (req, res) => {dbService.getAllMessages(req, res, db)});
app.post('/api/messages', (req, res) => {dbService.postMessage(req, res, db)});
app.post('/api/users', (req, res) => {
  console.log(req.body);
  dbService.createUser(req, res, db)});
app.get('/api/users', (req, res) => {dbService.getAllUsers(req, res, db)});
app.get('/api/users/:id', (req, res) => { dbService.getUser(req, res, db)});

app.listen(PORT, () => { return `Listening on port ${PORT}...`});
