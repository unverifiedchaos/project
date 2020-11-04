const mongoose = require('mongoose')

const Schema = mongoose.Schema

const savedSchema = new Schema({
    title:[
        {
            blog:{type:Object, required:true}
        }
    ],
    user: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
})

module.exports = mongoose.model('Saved', savedSchema)