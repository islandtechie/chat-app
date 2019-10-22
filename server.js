const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/messages', (req, res) => {
    res.send('messages');
    console.log('from messages');
});

app.post('/api/messages', (req, res) => {
    res.send('post messages');
    console.log('from post messages');
});

app.get('/api/users', (req, res) => {
    res.send('get users');
    console.log('from users');
});

app.post('/api/users', (req, res) => {
    res.send('post uers');
    console.log('from post users');
});

app.get('/api/users/{:id}', (req, res) => {
    res.send(req.params.id);
});
app.listen(PORT, () => { return `Listening on port ${PORT}...`});