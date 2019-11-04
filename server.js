require('dotenv').config({ path: '../chat-app/.env.local'});
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const dbService = require('./services/DBService');

dbService.init();

const PORT = process.env.PORT  || 3000

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());

app.get('/', (req, res) => {res.sendFile(path.join(__dirname, 'build', 'index.html'))});

app.get('/api/messages', (req, res) => {dbService.getAllMessages(req, res)});
app.post('/api/messages', (req, res) => {dbService.postMessage(req, res);});
app.post('/api/users', (req, res) => {dbService.createUser(req, res)});
app.get('/api/users', (req, res) => {dbService.getAllUsers(req, res)});
app.get('/api/users/:id', (req, res) => { dbService.getUser(req, res)});

http.listen(PORT, () => console.log(`${PORT}`));