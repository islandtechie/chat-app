require('dotenv').config({ path: '../chat-app/.env.local'});

const app = require('express')();

const PORT = process.env.PORT  || 3000

app.listen(PORT, () => console.log(`${PORT}`));