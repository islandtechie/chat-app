require('dotenv').config({ path: '../chat-app/.env.local'});
const { Client } = require('pg');

const CREATE_USER = 'INSERT INTO users(username, sessionid, createddate) VALUES($1, $2, $3)';
const CREATE_USER_MESSAGE = 'INSERT INTO messages(userid, text, createddate) VALUES($1, $2, $3)';
const GET_USER = 'SELECT * FROM users WHERE sessionid = $1';
const GET_ALL_USERS = 'SELECT * FROM users';
const GET_ALL_MESSAGES = 'SELECT users.username, users.sessionid, messages.id, messages.text  FROM messages LEFT JOIN users ON users.id = messages.userid';

let db;

const init = () => {
    db = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'chat_app',
        password: 'biggtits',
        port: 5432,
      });

      db.connect().then(() => console.log('CONNECTED'));
}

const getAllMessages = (req, res) => {
    db.query(GET_ALL_MESSAGES)
    .then(messages => res.json(messages.rows))
    .catch(e => console.error(e.stack));
  }
  
  const postMessage = (req, res) => {
    console.log(req.body);
    db.query(CREATE_USER_MESSAGE, [req.body.id, req.body.text, new Date()])
    .then(item => {res.status(201).json()})
    .catch(err => res.status(400).json(err));
  } 
  
  const createUser = (req, res) => {
    db.query(CREATE_USER, [req.body.username, req.body.session_id, new Date()])
      .then(item => {res.status(201).json()})
      .catch(err => res.status(400).json(err));
  } 
  
  const getAllUsers = (req, res) => {
    db.query(GET_ALL_USERS)
      .then(users => res.json(users.rows))
      .catch(e => console.error(e.stack));
  }
  
  const getUser = (req, res) => {
    db.query(GET_USER, [req.params.id])
      .then(user => res.json(user.rows))
      .catch(err => console.log(err));
  }

module.exports = {
    init,
    postMessage,
    getAllUsers,
    getAllMessages,
    getUser,
    createUser
}