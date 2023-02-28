const { User, Thought, Reaction } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__V")
      .then(
        (user) => {
            if (user) {
                return res.json(user)
            }
            return res.status(404).json({ message: 'No user with that ID' })
        })
        .catch(err => res.status(500).send(err));
},
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req,res){
    User.findOneAndDelete({_id: req.params.userId}).then((user)=>
    !user
    ? res.status(404).json({message: 'No user with this ID'})
    : Thought.deleteMany({_id:{$in: user.applications}})
    )
    .then(()=> res.json({message:'User and associated thoughts deleted!'}))
    .catch((err)=> res.status(500).json(err));
  },
  updateUser(req, res){
    User.findOneAndUpdate({
        _id: req.params.userId
    
    },
    {
        $set: req.body
    },
    {
        runValidators:true,
        new:true
    }
    ).then(user => res.json(user)).catch(err => res.status(500).send(err))
  },
  addFriend(req,res){
    User.findOneAndUpdate(
        {_id: req.params.userId},
        {$addToSet:{friends:req.params.friendId}},
        {
            new: true,
            runValidators:true,
        }
    ).then(user => res.json(user)).catch(err => res.status(500).send(err))
  },
  deleteFriend(req,res){
    User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: {friends: req.params.friendId}},
        {
            runValidators: true,
            new: true
        }
    ).then(user => res.json(user)).catch(err => res.status(500).send(err))
  }

};
