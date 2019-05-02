const bcrypt = require('bcryptjs')

module.exports = {
  getUsers: (req, res) => {
    const db = req.app.get('db')
    db.getAllUsers().then(data => {
      res.status(200).send(data)
    }).catch(err => {
      res.send('err:', err)
    })
  },

  register: async (req, res) => {
    const db = req.app.get('db')
    const {email, firstname, lastname, username, password} = req.body
    const {session} = req
    let emailTaken = await db.checkEmail({email})
    emailTaken = +emailTaken[0].count
    if (emailTaken !== 0){
      return res.sendStatus(409)
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const user_id = await db.registerUser({
      email,
      firstname,
      lastname,
      username,
      hash
    })
    session.user = {
      username, 
      hash,
      login_id: user_id[0].balance_id
    }
    res.sendStatus(200)
  },

  login: async (req, res) => {
    const db = req.app.get('db')
    const session = req.session
    
  }
}