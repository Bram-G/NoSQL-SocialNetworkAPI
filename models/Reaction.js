const {Schema, model} = require('mongoose')

reactionSchema = new Schema(
    {
        reactionBody:{
            type:String,
            required: true,
            maxLength:280
        },
        userName: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (createdAt) {
                const datify = createdAt.toDateString()
                return datify
            }
        }
        

    },
    {
        toJSON: {
            getters: true,
        },
       
    }
)

module.exports = reactionSchema