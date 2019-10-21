const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/hey', (req, res) => {
    res.send('yooooo');
});

app.listen(PORT, () => { return `Listening on port ${PORT}...`});