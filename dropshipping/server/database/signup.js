const mongoose = require('mongoose')

const Schema=mongoose.Schema;

const SignUp = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    accessToken:{
        type:String
    },
    signIn_date: {
        type: Date,
        default:Date.now()
    },
    posts:[{
        type:Schema.Types.ObjectId,
        ref:"Posts"
    }]
})

module.exports = mongoose.model('SignUp', SignUp)