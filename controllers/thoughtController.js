const { application } = require("express");
const { Thought, User } = require("../models");

module.exports = {
  // gets all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).send(err));
  },
  getSingleThought(req, res) {
    Thought.find({
      _id: req.params.thoughtId,
    })
      .then((thought) => {
        if (thought) {
          return res.json(thought);
        }
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      })
      .catch((err) => res.status(500).send(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { userName: req.body.userName },
          { $addToSet: { thoughts: thought._id } }
        ).then((user) => {
          if (user) {
            return res.status(200).json("Thought created!");
          }
          return res.status(400).json("Thought created, but no user found");
        });
      })
      .catch((err) => res.status(500).send(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought with this ID" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (thought) {
          return res.json(thought);
        }
        return res.status(404).json({ message: "No thought with this ID" });
      })
      .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (thought) {
          return res.json(thought);
        }
        return res.status(404).json({ message: "No thought with this ID" });
      })
      .catch((err) => res.status(500).send(err));
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.body.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (thought) {
          return res.json(thought);
        }
        return res.status(404).json({ message: "No reaction with this ID" });
      })
      .catch((err) => res.status(500).send(err));
  },
};
