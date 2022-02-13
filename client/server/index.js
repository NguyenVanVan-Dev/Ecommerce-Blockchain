const express = require('express')
const app = express()
const port = 2105

app.get('/', (req, res) => {
  res.send('Hello World! Ecommerce Blockchain haha')
})

app.listen(port, () => {
  console.log(`Ecommerce Blockchain app listening on port ${port}`)
})