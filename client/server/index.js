const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.POST || 2105;
const route = require('./src/routes');
const cors = require('cors')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// morgan debug log server 
const morgan = require('morgan')
app.use(morgan('combined'))

//Connect Database 
const db = require('./src/app/config/database');
db.connect();


//routes 
route(app);
app.listen(port, () => {
  console.log(`Ecommerce Blockchain app listening on port ${port}`)
})