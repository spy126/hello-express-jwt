const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.get('/', (req, res) => {
  res.send('Hello Express')
})

app.get('/login', (req, res) => {
  const {user, pass} = req.query
 
  if (user === 'max' && pass === '123') {
    const token = jwt.sign({user: 'max'}, 'your_secret_key')

    return res.send(token)
  }

  res.send('Wrong username or password')
})

const handleJWTAuth = (req, res, next) => {
  const token = req.query.token || ''
   
  jwt.verify(token, 'your_secret_key', (error, decoded) => {
    if (error) return res.send('Auth failed: ' + error.message)

      req.user = decoded.user || decoded
      next()
  })
}

app.get('/protected', handleJWTAuth, (req, res) => {
  const {user} = req
  
  res.send(`Hello ${user}!`)
})

app.listen(5000, () => {
  console.log("The server is running: http://localhost:5000")
})
