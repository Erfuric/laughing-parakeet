const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

router
  .route('/thoughts')
  .get(getAllThoughts)
  .post(createThought);

router
  .route('/thoughts/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router
  .route('/thoughts/:thoughtId/reactions')
  .post(createReaction);

router
  .route('/thoughts/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;