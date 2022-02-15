const express = require('express');
const app = express();

const port = 2105
const route = require('./src/routes');
const cors = require('cors')

// morgan debug log server 
const morgan = require('morgan')
app.use(morgan('combined'))

//Connect Database 
const db = require('./src/app/config/database');
db.connect();

app.use(express.json());
app.use(cors());


//routes 
route(app);
app.listen(port, () => {
  console.log(`Ecommerce Blockchain app listening on port ${port}`)
})