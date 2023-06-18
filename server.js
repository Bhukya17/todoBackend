
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/connectDB');

const app = express();

// routes
const todo = require('./routers/todo');
const user = require('./routers/user');

// connect database
connectDB();

// cors
app.use(cors({origin: true, credentials: true}));


app.use(express.json({extended: false}));
app.get('/', (req, res) => res.send('Server up and running'));

// use routes
app.use('/api/todo', todo);
app.use('/api/user', user);

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
