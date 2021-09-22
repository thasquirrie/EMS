const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: './config.env' });

const app = require('./app');

if (process.env.NODE_ENV === 'development') {
 console.log('Welcome');
 app.use(morgan('dev'));
}

const DB = process.env.DATABASE_LOCAL;

const connectDB = async () => {
 try {
  const conn = await mongoose.connect(DB, {
   useCreateIndex: true,
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
  });

  console.log(`DB connected: ${conn.connection.host} ✔✔✔`.bgBlue.underline);
 } catch (err) {
  console.log(`Error: ${err.message} ❌❌❌`.red);
 }
};

connectDB();

const port = process.env.PORT || 4000;

app.listen(port, () => {
 console.log(`Server started on port: ${port}`);
});
