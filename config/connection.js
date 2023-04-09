// const { connect, connection } = require('mongoose');

// const connectionString =
//   process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/laughing-parakeet';

// connect(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// module.exports = connection;

const { connect, connection } = require('mongoose');

connect('mongodb://localhost/laughing-parakeet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;