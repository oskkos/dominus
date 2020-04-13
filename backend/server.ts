import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to dominus.' });
});
authRoutes(app);
userRoutes(app);


// set port, listen for requests
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
