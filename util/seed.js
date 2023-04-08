const mongoose = require('mongoose');
const { users } = require('./data');
const { User } = require('../models');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/laughing-parakeet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    console.log('Users removed from database.');

    await User.create(users);
    console.log('Users seeded to database.');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();
