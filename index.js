const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello Express')
})

const handleBasic = (req, res, next) => {
  const {user, pass} = req.query

  if (user !== 'admin' || pass !== '123') return res.send('You cannot use this resource')

  next() 
}

app.get('/basic', handleBasic, (req, res) => {
 res.send('All done. We were protected by basic auth.')
})

app.listen(5000, () => {
  console.log("The server is running: http://localhost:5000")
})
