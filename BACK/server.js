const express = require('express');
require('dotenv').config(); 
const cors = require('cors');


const connectToMongo = require('./db');
// const cors = require('cors');
// const bodyParser = require('body-parser');

const app = express();
app.use(cors());


const port = process.env.PORT || 5000;

// Connect to MongoDB
connectToMongo();

// Middleware
// app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());

// Test Route
// app.get('/', (req, res) => {
//   res.send("hello!! AUTHOR||READER");
// });

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/book', require('./routes/book'))


// Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
