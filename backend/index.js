const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const PORT = 4000;
require('dotenv').config();
const db = require('./services/db');



const loginroutes = require('./routes/login');
const instructorroutes = require('./routes/instructor');
const getinstructorroutes = require('./routes/getinstructor');
const createcourseroutes = require('./routes/createcourse');
const getcourseroutes = require('./routes/getcourse');
const lecturesroutes = require('./routes/lectures');
const getlecturesroutes = require('./routes/getlecture');


// Apply cors middleware
app.use(cors());

// Use the login routes
app.use('/api', loginroutes);
app.use('/api', instructorroutes);
app.use('/api', getinstructorroutes);
app.use('/api', createcourseroutes);
app.use('/api', getcourseroutes);
app.use('/api', lecturesroutes);
app.use('/api', getlecturesroutes);

// Define a route
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
