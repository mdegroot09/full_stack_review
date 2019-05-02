const express = require('express')
const app = express()
require('dotenv').config()
const massive = require('massive')
const session = require('express-session')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const ctrl = require('./controllers/controller')

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 //resets after 24 hours
  }
}))

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('tables:', db.listTables())
  app.listen(SERVER_PORT, () => {
    console.log('listening on port:', SERVER_PORT)
  })
})

app.get('/api/users', ctrl.getUsers)