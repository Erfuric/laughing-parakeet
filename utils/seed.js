const connection = require('../config/connection');
const { User, Thought } = require('../models');

const users = [
  {
    username: 'johnDoe',
    email: 'johnDoe@example.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'janeDoe',
    email: 'janeDoe@example.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'bobSmith',
    email: 'bobSmith@example.com',
    thoughts: [],
    friends: []
  }
];

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  try {
    // Delete existing Users and Thoughts
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create new Users
    const createdUsers = await User.create(users);

    console.log(`Created ${createdUsers.length} users`);

  } catch (err) {
    console.error(err);
  }

  // Close the database connection
  connection.close();
});

