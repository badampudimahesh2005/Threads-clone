
const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

const cloudinary = require('../config/cloudinary');
const formidable = require('formidable');

const mongoose = require('mongoose');


exports.createPost = async (req, res) => {
    try {

        const form = formidable({});

        form.parse(req, async (error, fields, files) => {
            if (error) {
                return res.status(500).json({ msg: error.message });
            }
            // Create a new post
            const post = new Post();

            // Check if the user has entered text
            if(fields.text){
                post.text = fields.text;
            }
            // Check if the user has uploaded an image
            if(files.media){

                const uploadedImage = await cloudinary.uploader.upload(files.media.filepath,{
                    folder: 'Threads_clone/posts'
                });
                
                if(!uploadedImage){
                    return res.status(500).json({ msg: 'Error while uploading image' });
                }
                post.media = uploadedImage.secure_url;
                post.publicId = uploadedImage.public_id;
            }
            post.admin = req.user._id;

            // Save the post
            const newPost = await post.save();

            await User.findByIdAndUpdate( req.user._id , {
                $push: {
                    threads: newPost._id
                },
                
            }, { new: true });
            
            return res.status(201).json({ msg: 'Post created successfully', newPost });

        });
    
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

exports.getAllPosts = async (req, res) => {

    try{
        const {page} = req.query;
        let pageNumber = (!page || page == undefined) ? 1 : page;

        const posts = await Post.find({})
        .sort({createdAt: -1}) // Sort the posts in descending order -> latest post first
        .skip((pageNumber - 1) * 3).limit(3)// Pagination -> 3 posts per page
        .populate({path: 'admin', select: '-password'})
        .populate({path: 'likes', select: '-password'})
        .populate({
            path: 'comments',
            populate: {
                path: "admin",
                model: "User",
                },
        });

        return res.status(200).json({ mesg:"posts fetched successfully", posts });


    }catch(error){
        return res.status(500).json({ msg: error.message });
    }
}

exports.deletePost = async (req, res) => {
    try{
        //logic to delete the post
        //1.we need to delete image from cloudinary
        //2.delete post from database
        //3.delete post from user's threads array
        //4.delete all the comments of the post


        const {id}=req.params;
        if(!id){
            return res.status(400).json({msg:"Post id is required"});
        }

        const post = await Post.findById(id);
        if(!post){
            return res.status(404).json({msg:"Post not found"});
        }

        //check if the user is authorized to delete the post
        const userId = req.user._id.toString();
        const adminId = post.admin._id.toString();
        if(userId !== adminId){
            return res.status(401).json({msg:"You are not authorized to delete this post"});
        }

        //if the user is authorized to delete the post
        // check the if post has media ,then  delete the image from cloudinary
        if(post.media){
            await cloudinary.uploader.destroy(post.publicId,
                (error,result) => { console.log(error,result)}
            ); 

        }

        //delete all the comments of the post 
        await Comment.deleteMany({_id: { $in: post.comments }});

        //delete the post from user's threads array
        //delete the post from user's reposts array
        //delete the post from user's replies array

        await User.updateMany(
            {
                $or:[
                    {threads: id},
                    {reposts: id},
                    {replies: id}
                ]

            },
            {
                $pull: {
                    threads: id,
                    reposts: id,
                    replies: id
                },
            },
            {new:true}
    );
    
        //delete the post from database
        await Post.findByIdAndDelete(id);

        return res.status(200).json({msg:"Post deleted successfully"});

    }catch(error){
        return res.status(500).json({ msg: error.message });
    }
}

exports.likePost = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({msg:"Post id is required"});
        }

        const post = await Post.findById(id);
        if(!post){
            return res.status(404).json({msg:"Post not found"});
        }

        //check if the user has already liked the post
        const isLiked = post.likes.includes(req.user._id);
        if(isLiked){
            await Post.findByIdAndUpdate(id,
                {
                    $pull: {likes: req.user._id}
                },
                {new:true}
            );
            return res.status(200).json({msg:"Post unliked !"});
        }
        //add the user to the likes array
        await Post.findByIdAndUpdate(id,
            {
                $push: {likes: req.user._id}
            },
            {new:true}
        );
        return res.status(200).json({msg:"Post liked !"});

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }   
}

exports.repost = async (req, res) => {

    try{

        const {id} = req.params;
       
        if(!id){
            return res.status(400).json({msg:"Post id is required"});
        }

        const post = await Post.findById(id);
        if(!post){
            return res.status(404).json({msg:"Post not found"});
        }

        const newId = new mongoose.Types.ObjectId(id);
        if(req.user.reposts.includes(newId)){
            return res.status(400).json({msg:"Post already reposted"});
        }

        //add the post to the user's reposts array
        await User.findByIdAndUpdate(
            req.user._id,
            {
              $push: { reposts: post._id },
            },
            { new: true }
          );

    return res.status(200).json({msg:"Post reposted successfully"});

    }catch(error){
        return res.status(500).json({ msg: error.message });
    }
}

exports.singlePost = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ msg: "Id is required !" });
      }
      
      const post = await Post.findById(id)
        .populate({
          path: "admin",
          select: "-password",
        })
        .populate({ path: "likes",select:'-password' })
        .populate({
          path: "comments",
          populate: {
            path: "admin",
          },
        });
      res.status(200).json({ msg: "Post Fetched !", post });
    } catch (err) {
      res.status(400).json({ msg: "Error in singlePost !", err: err.message });
    }
  };