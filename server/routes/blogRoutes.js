const express = require('express')
const { getAllBlogController, createBlogController, updateBlogController, deleteBlogController, getBlogByIdController, userBlogController } = require('../controllers/blogController')

//router object
const router = express.Router()

//routes
//GET || all blogs
router.get('/all-blog', getAllBlogController)

//POST || create blog
router.post('/create-blog', createBlogController)

//PUT || update blog
router.put('/update-blog/:id', updateBlogController)

//GET || single blog details
router.get('/get-blog/:id', getBlogByIdController);

//DELETE || delete-blog
router.delete('/delete-blog/:id', deleteBlogController)

//GET || user blog
router.get('/user-blog/:id', userBlogController)
module.exports = router
