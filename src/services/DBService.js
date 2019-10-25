const postMessage = (req, res, db) => {
    console.log('called');
    db.query('SELECT * FROM chats.users')
    .then(res => console.log(res.rows[0]))
    .catch(err => console.log(err.stack));
   /*  const { first, last, email, phone, location, hobby } = req.body
    const added = new Date()
    db('testtable1').insert({first, last, email, phone, location, hobby, added})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  } */
}

const getAllUsers = (db) => {
  console.log('in get users');
  db
  .query('SELECT NOW() as now')
  .then(res => console.log(res.rows[0]))
  .catch(e => console.error(e.stack))
}

module.exports = {
    postMessage,
    getAllUsers
}