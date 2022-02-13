const express = require('express')
const app = express()
const port = 2105
const route = require('./src/routes');

const db = require('./src/app/config/database');
db.connect();
route(app);


// app.get('/', (req, res) => {
//   res.send('Hello World! Ecommerce Blockchain haha')
// })

app.listen(port, () => {
  console.log(`Ecommerce Blockchain app listening on port ${port}`)
})