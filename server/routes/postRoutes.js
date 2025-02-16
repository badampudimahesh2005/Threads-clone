const express=require('express');
const auth = require('../middlewares/auth');
const { createPost, getAllPosts, deletePost, likePost, repost, singlePost } = require('../controllers/postController');
const {Router} = express;


const postRoutes = Router();


//routes for post creation 
postRoutes.post('/',auth, createPost);
//routes for getting all posts
postRoutes.get('/',auth, getAllPosts);
//routes for deleting a post
postRoutes.delete('/:id', auth, deletePost);
//routes for liking a post
postRoutes.put('/like/:id', auth, likePost);
//routes for reposting a post
postRoutes.put('/repost/:id', auth, repost);
//routes for getting a single post
postRoutes.get('/:id', auth, singlePost);

module.exports = postRoutes;