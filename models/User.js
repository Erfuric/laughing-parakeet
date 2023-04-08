/*
* `username`
  * String
  * Unique
  * Required
  * Trimmed

* `email`
  * String
  * Required
  * Unique
  * Must match a valid email address (look into Mongoose's matching validation)

* `thoughts`
  * Array of `_id` values referencing the `Thought` model

* `friends`
  * Array of `_id` values referencing the `User` model (self-reference)
  * 
**Schema Settings**:

Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
*/

const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create the new user

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true, // No duplicate usernames allowed
      required: true,
      trim: true, // Removes white spaces at the start and end of text
    },
    email: {
      type: String,
      required: true,
      unique: true, // One account per email.
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.']  // Checks that the format of the email is correct
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;