const path = require('path')

const express = require('express');

const router = express.Router()

const controller = require('../controllers/admin')

const isAuth = require('../middleware/is-auth')

router.get('/', controller.HomePage)

router.get('/profile', isAuth, controller.getProfile)

router.get('/add-blog', isAuth, controller.getBlogPage);

router.get('/display/:blogId', controller.getDisplay);

router.post('/add-blog', isAuth, controller.postBlogPage)

router.delete('/profile/blog/:blogId', isAuth, controller.DeleteBlog)

router.get('/edit-blog/:blogId', isAuth, controller.getEditBlog)

router.post('/edit-blog', isAuth, controller.postEditBlog)

router.post('/', isAuth, controller.postBlogPage);

router.get('/saved', isAuth, controller.getSaved);

router.post('/delete-saved', isAuth, controller.postDeleteSavedBlogs);

router.post('/saved', isAuth, controller.postSaved)

module.exports = router;