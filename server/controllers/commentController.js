const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const mongoose = require('mongoose');

exports.createComment = async (req, res) => {

    try{
        const { id } = req.params;
        const { text } = req.body;
        if (!id) {
          return res.status(400).json({ msg: "id is required !" });
        }
        if (!text) {
          return res.status(400).json({ msg: "No comment is added !" });
        }

        const postExists = await Post.findById(id);
        if (!postExists) {
          return res.status(400).json({ msg: "No such post !" });
        }

        const comment = new Comment({
            text,
            admin: req.user._id,
            post: postExists._id,
          });
        const newComment = await comment.save();
        //Now comment is saved to the database, but we 
        //also need to add the comment to the post's comments array
        await Post.findByIdAndUpdate(
            id,
            {
              $push: { comments: newComment._id },
            },
            { new: true }
          );
        
        //add the comment to the user's comments array ->replies
          await User.findByIdAndUpdate(
            req.user._id,
            {
              $push: { replies: newComment._id },
            },
            { new: true }
          );
        return res.status(200).json({msg:"Comment added successfully"});

    }catch(error){
        return res.status(500).json({ msg: error.message });
    }
}


exports.deleteComment = async (req, res) => {

    try{

    const { postId, id } = req.params;
    if (!postId || !id) {
      return res.status(400).json({ msg: "Error in deleteComment !" });
    }

    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(400).json({ msg: "No such post !" });
    }
    const commentExists = await Comment.findById(id);
    if (!commentExists) {
      return res.status(400).json({ msg: "No such comment !" });
    }

    const newId = new mongoose.Types.ObjectId(id);
    if (postExists.comments.includes(newId)) {
      const id1 = commentExists.admin._id.toString();
      const id2 = req.user._id.toString();
      if (id1 !== id2) {
        return res
          .status(400)
          .json({ msg: "You are not authorized to delete the comment !" });
      }
      await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { comments: id },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { replies: id },
        },
        { new: true }
      );
      await Comment.findByIdAndDelete(id);
      return res.status(201).json({ msg: "Comment deleted !" });
    }
    res.status(400).json({ msg: "No such comment !" });

    }catch(error){
        return res.status(500).json({ msg: error.message });
    }
}

