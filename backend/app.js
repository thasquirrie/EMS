const path = require('path');
const express = require('express');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

const userRouter = require('./routes/userRoutes');
const enrolleeRouter = require('./routes/enrolleeRoutes');
const centerRouter = require('./routes/centerRoutes');
const branchRouter = require('./routes/branchRoutes');

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/enrollees', enrolleeRouter);
app.use('/api/v1/centers', centerRouter);
app.use('/api/v1/branches', branchRouter);

console.log(__dirname);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res, next) => {
    res.status(200).send('API is running on port 4000');
  });
}

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `The requested page: ${req.originalUrl} not found on this server`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
