const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    blogs:{
        savedBlogs: [{
            blogId: {
                type: Schema.Types.ObjectId,
                ref: 'Blog',
                required: true
            },
            }]
    }
})

userSchema.methods.savedBlog=function(blog){
    const blogIndex=this.blogs.savedBlogs.findIndex(b=>{
        return b.blogId.toString()===blog._id.toString()
    })
    const saved=[...this.blogs.savedBlogs]
    if(blogIndex>=0){
    }else{
        saved.push({
            blogId:blog._id,
        })
    }
    const updatedSavedBlogs={
        savedBlogs:saved
    }
    this.blogs=updatedSavedBlogs;
    return this.save()
}

userSchema.methods.removeFromBlog=function(blogId){
    const blog=this.blogs.savedBlogs.filter(i=>{
        return i.blogId.toString()!==blogId.toString()
    })
    this.blogs.savedBlogs=blog;
    return this.save()
}

module.exports = mongoose.model('User', userSchema)