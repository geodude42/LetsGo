const express = require('express');
const cors = require('cors');
const path = require('path');

// Establish Port and Server
const PORT = 3000;
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable Cors
app.use(cors());

// Routes
const userRouter = require('./router/userRouter');

app.use(express.static(path.join(__dirname, '../../dist/')));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../../dist/index.html'));
});

// Re-direct to route handlers:
app.use('/user', userRouter);

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware',
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => { console.log(`Listening on port' ${PORT}...`); });