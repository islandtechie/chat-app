const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req,res) => {
    res.send('it wworks part 1');
})

app.listen(PORT, () => { return `Listening on port ${PORT}...`});