const Blog = require('../models/blog')

exports.getProfile = (req, res, next) => {
    Blog.find({
            userId: req.user._id
        })
        .then(blog => {
            console.log(blog);
            res.render('profile/blog', {
                path: '/profile/blog',
                art: blog,
                name: req.user.name,
                isAuthenticated: req.session.isLoggedIn
            })
        })
        .catch(err => {
            console.log(err);
        })
}

exports.HomePage = (req, res, next) => {
    Blog.find()
        .then(article => {
            res.render('blog', {
                path: '/',
                art: article,
                isAuthenticated: req.session.isLoggedIn
            })
        })
        .catch(err => {
            console.log(err);
        })
}


exports.getDisplay = (req, res, next) => {
    const contentId = req.params.blogId
    Blog.findById(contentId)
        .then(article => {
            console.log(article)
            res.render('display', {
                path: '/display',
                blog: article,
                isAuthenticated: req.session.isLoggedIn
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getBlogPage = (req, res, next) => {
    res.render('add-blog', {
        editing: false,
        path: '/add-blog',
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.postBlogPage = (req, res, next) => {
    const image=req.file
    const title = req.body.title
    const blog = req.body.blog
    if(!image){
        return res.status(422).render('add-blog', {
            path:'/add-blog',
            editing:false,
            isAuthenticated:req.session.isLoggedIn,
            article:{
                title:title,
                blog:blog
            },
            errorMessage:'Attached File is not an Image',
        })
    }else if(image==null){
        res.redirect('/')
    }
    const imageUrl=image.path
    const article = new Blog({
        title: title,
        blog: blog,
        imageUrl:imageUrl,
        /* imageUrl:imageUrl, */
        userId: req.user
    })
    article
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/')
        })
        .catch(err => {
            console.log(err);
        })
}

exports.DeleteBlog = (req, res, next) => {
    const prodId=req.params.blogId;
    Blog.findByIdAndRemove(prodId)
    .then(()=>{res.status(200).json({message:'success'})})
    .catch(()=>{res.status(500).json({message:'product deletion failed'})});
}

exports.getEditBlog = (req, res, next) => {
    const editMode = req.query.edit;
    /* the edit used here is confirmation given by the client side that edit is tru 
    so if it is edit product u could normally just edit in the section where it is true */
    if (!editMode) {
        return res.redirect('/')
    }
    const prodId = req.params.blogId;
    Blog.findById(prodId)
        .then(article => {
            if (!prodId) {
                return res.redirect('/');
            } else {
                res.render('add-blog', {
                    path: '/edit-blog',
                    editing: editMode,
                    blog: article,
                    isAuthenticated: req.session.isLoggedIn
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postEditBlog = (req, res, next) => {
    const prodId = req.body.blogId;
    const updatedTitle = req.body.title;
    const updatedBlog = req.body.blog;
    Blog.findById(prodId)
        .then(blog => {
            blog.title = updatedTitle;
            blog.blog = updatedBlog;
            return blog.save()
        })
        .then(result => {
            console.log('updated product')
            res.redirect('/')
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getSaved = (req, res, next) => {
    req.user
        .populate('blogs.savedBlogs.blogId')
        .execPopulate()
        .then(user => {
            const blogs = user.blogs.savedBlogs;
            res.render('saved', {
                path: '/saved',
                art: blogs,
                name:req.user.name,
                isAuthenticated: req.session.isLoggedIn
            })
            console.log(blogs)
        })
        .catch(err => {
            console.log(err)
        })
}


exports.postDeleteSavedBlogs = (req, res, next) => {
    const prodId = req.body.blogId;
    req.user
        .removeFromBlog(prodId)
        .then(result => {
            res.redirect('/saved')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postSaved = (req, res, next) => {
    const prodId = req.body.blogId
    Blog.findById(prodId)
        .then(blog => {
            return req.user.savedBlog(blog)
        })
        .then(result => {
            res.redirect('/saved')
        })
        .catch(err => {
            console.log(err)
        })
}