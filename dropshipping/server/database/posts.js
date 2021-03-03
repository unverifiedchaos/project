const mongoose=require('mongoose')

const Schema=mongoose.Schema

const Posts=new Schema({
    postedBy:{
        type:Schema.Types.ObjectId,
        ref:"SignUp",
    },
    name:{type:String},
    post:{type:String}
})

module.exports=mongoose.model('Posts', Posts)