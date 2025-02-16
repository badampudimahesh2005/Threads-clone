
const express = require('express');
const auth = require('../middlewares/auth');
const {createComment, deleteComment} = require('../controllers/commentController');

const {Router} = express;

const commentRoutes = Router();


commentRoutes.post('/:id', auth, createComment);
commentRoutes.delete('/:postId/:id', auth, deleteComment);


module.exports = commentRoutes;