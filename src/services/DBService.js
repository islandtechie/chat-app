const CREATE_USER = 'INSERT INTO users(username, createddate) VALUES($1, $2)';
const CREATE_USER_MESSAGE = 'INSERT INTO messages(userid, text, createddate) VALUES($1, $2, $3)';
const GET_ALL_USERS = 'SELECT * FROM users';
const GET_ALL_MESSAGES = 'SELECT * FROM messages';

const getAllMessages = (req, res, db) => {
  db.query(GET_ALL_MESSAGES)
  .then(messages => res.json(messages.rows))
  .catch(e => console.error(e.stack));
}

const postMessage = (req, res, db) => {
  db.query(CREATE_USER_MESSAGE, [req.body.id, req.body.text, new Date()])
  .then(item => {res.status(201).json()})
  .catch(err => res.status(400).json(err));
} 

const createUser = (req, res, db) => {
  db.query(CREATE_USER, [req.body.username, new Date()])
    .then(item => {res.status(201).json()})
    .catch(err => res.status(400).json(err));
} 

const getAllUsers = (req, res, db) => {
  db.query(GET_ALL_USERS)
    .then(users => res.json(users.rows))
    .catch(e => console.error(e.stack));
}

const getUser = (req, res, db) => {
  db.query(`SELECT * FROM users WHERE id = ${req.params.id}`)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

module.exports = {
    postMessage,
    getAllUsers,
    getAllMessages,
    getUser,
    createUser
}