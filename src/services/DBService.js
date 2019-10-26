const CREATE_USER = 'INSERT INTO users(username, sessionid, createddate) VALUES($1, $2, $3)';
const CREATE_USER_MESSAGE = 'INSERT INTO messages(userid, text, createddate) VALUES($1, $2, $3)';
const GET_USER = 'SELECT * FROM users WHERE sessionid = $1';
const GET_ALL_USERS = 'SELECT * FROM users';
const GET_ALL_MESSAGES = 'SELECT users.username, users.id, users.sessionid, messages.text  FROM messages LEFT JOIN users ON users.id = messages.userid';

const getAllMessages = (req, res, db) => {
  db.query(GET_ALL_MESSAGES)
  .then(messages => res.json(messages.rows))
  .catch(e => console.error(e.stack));
}

const postMessage = (req, res, db) => {
  console.log(req.body);
  db.query(CREATE_USER_MESSAGE, [req.body.id, req.body.text, new Date()])
  .then(item => {res.status(201).json()})
  .catch(err => res.status(400).json(err));
} 

const createUser = (req, res, db) => {
  db.query(CREATE_USER, [req.body.username, req.body.session_id, new Date()])
    .then(item => {res.status(201).json()})
    .catch(err => res.status(400).json(err));
} 

const getAllUsers = (req, res, db) => {
  db.query(GET_ALL_USERS)
    .then(users => res.json(users.rows))
    .catch(e => console.error(e.stack));
}

const getUser = (req, res, db) => {
  db.query(GET_USER, [req.params.id])
    .then(user => res.json(user.rows))
    .catch(err => console.log(err));
}

module.exports = {
    postMessage,
    getAllUsers,
    getAllMessages,
    getUser,
    createUser
}