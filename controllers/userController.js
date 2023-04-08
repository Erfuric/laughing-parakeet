const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // GET all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // GET a single user by ID
  getUserById({ params }, res) {
    User.findOne({ _id: ObjectId(params.userId) })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // POST a new user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(500).json(err));
  },

  // PUT update a user by ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: ObjectId(params.userId) }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(500).json(err));
  },

  // DELETE a user by ID
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: ObjectId(params.userId) })
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }

        // Remove the user's associated thoughts when deleted
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: 'User and associated thoughts deleted successfully!' });
      })
      .catch(err => res.status(500).json(err));
  },

  // POST add a friend to a user's friend list
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: ObjectId(params.userId) },
      { $addToSet: { friends: ObjectId(params.friendId) } },
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(500).json(err));
  },

  // DELETE remove a friend from a user's friend list
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: ObjectId(params.userId) },
      { $pull: { friends: ObjectId(params.friendId) } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
}