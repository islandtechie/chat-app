const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/messages', (req, res) => {
    res.json(chats);
});

app.post('/api/messages', (req, res) => {
    console.log(req.body);
    chats.push(req.body);
    res.status(200);
    res.json('message created');
});

app.get('/api/users', (req, res) => {
    console.log('hit');
    const users = [
        {
          "id": 1,
          "username": "Ebony Vinson"
        },
        {
          "id": 2,
          "username": "Hahn Wagner"
        },
        {
          "id": 3,
          "username": "Sampson Shelton"
        },
        {
          "id": 4,
          "username": "Moses Kane"
        },
        {
            "id": 5,
            "username": "Berlin Smith",
        }
      ];
    res.json(users);
});

app.post('/api/users', (req, res) => {
    const n = req.body.username;
    res.status(201);
    res.json(`user ${n} was created`);
});

app.get('/api/users/:id', (req, res) => {
    let users = [
        {
          "id": 1,
          "name": "Ebony Vinson"
        },
        {
          "id": 2,
          "name": "Hahn Wagner"
        },
        {
          "id": 3,
          "name": "Sampson Shelton"
        },
        {
          "id": 4,
          "name": "Moses Kane"
        },
        {
            "id": 5,
            "name": "Berlin Smith",
        }
      ];
      const user = users.filter(user => user.id === parseInt(req.params.id));
    res.json(user);
});

app.listen(PORT, () => { return `Listening on port ${PORT}...`});

let chats= [
    {
      "id": 1,
      "name": "Ebony Vinson",
      "text": "Officia velit mollit laborum amet nisi fugiat id est. "
    },
    {
      "id": 2,
      "name": "Hahn Wagner",
      "text": "Exercitation deserunt tempor nostrud esse ad incididunt velit duis."
    },
    {
      "id": 3,
      "name": "Sampson Shelton",
      "text": "Velit ad tempor cupidatat commodo Lorem tempor sit ad."
    },
    {
      "id": 4,
      "name": "Moses Kane",
      "text": "Sunt deserunt proident velit ea occaecat dolor culpa."
    },
    {
        "id": 5,
        "name": "Berlin Smith",
        "text": "Sunt deserunt proident velit ea occaecat dolor culpa."
    }
  ];