const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    blog: {
        type: String,
        required: true
    },
    imageUrl:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Blog', blogSchema)

/* const mongodb=require('monrequired;truegodb');
const ObjectId=mongodb.ObjectId;
const getDb=require('../util/database').getDb;

class Blog {
    constructor(title, blog,imageUrl, id) {
        this.title=title;
        this.blog=blog;
        this.imageUrl=imageUrl;
        this._id=id;
    }

    save(){
        const db=getDb();
        let dbOp;
        if(this._id){
            dbOp=db.collection('blogs')
            .updateOne({_id: new ObjectId(this._id)}, {$set: this})
        }else{
            dbOp=db.collection('blogs').insertOne(this)
        }
        return dbOp
        .then(result=>{
            console.log(result)
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static fetchAll(){
        const db=getDb();
        return db
        .collection('blogs')
        .find()
        .toArray()
        .then(blogs=>{
            console.log('works')
            return blogs
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static findById(contentId){
        const db = getDb()
        return db
        .collection('blogs')
        .find({_id: new ObjectId(contentId)})
        .next()
        .then(result=>{
            console.log(result)
            return result
        })
        .catch(err=>{
            console.log(err);
        })
    }
    static deleteById(prodId){
        const db=getDb();
        return db.collection('blogs')
        .deleteOne({_id:new ObjectId(prodId)})
        .then(result=>{
            console.log('deleted')
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

module.exports= Blog; */