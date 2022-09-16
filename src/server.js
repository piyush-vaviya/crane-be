require('dotenv').config();
require('colors');
const DBConnect = require('./utils/dbConnect');
process.on('uncaughtException', (error) => {
  // using uncaughtException event
  console.log(' uncaught Exception => shutting down..... ');
  console.log(error.name, error.message);
  process.exit(1); //  immediately exists all from all the requests
});

console.log();
const app = require('./app');
const buckets = require('./utils/buckets');

// database connection
DBConnect();

// server
const port = process.env.PORT || 7000;

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

// handle Globally  the unhandled Rejection Error which is  outside the express
// e.g database connection
process.on('unhandledRejection', (error) => {
  console.log('🚀 ~ process.on ~ error', error);
  // it uses unhandledRejection event
  // using unhandledRejection event
  console.log(' Unhandled Rejection => shutting down..... ');
  server.close(() => {
    process.exit(1); //  immediately exists all from all the requests sending OR pending
  });
});