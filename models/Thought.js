const { Schema, model } = require("mongoose");
const Reaction =  require('./Reaction.js')

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    }
  }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return `${this.reactions.length}`
})

const Thought = model('thought',thoughtSchema)
module.exports = Thought;
