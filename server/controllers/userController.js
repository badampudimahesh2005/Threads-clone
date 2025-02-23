
const jwt= require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const formidable = require('formidable');
const cloudinary = require('../config/cloudinary');


const maxAge = 3*24*60*60*1000;

const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: maxAge});
}


const signup = async (req, res) => {
    try {
        const {userName, email, password} = req.body;

        if(!userName || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User exists with this email"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({userName, email, password: hashedPassword});
        const result =await user.save();
        if(!result){
            return res.status(400).json({message: "User not created"});
        }

        res.cookie(
            'token',
             generateToken(result._id), 
             {maxAge: maxAge,
             httpOnly: true,
              secure: true,
                sameSite: 'none',
             partitioned: true

            }
        );
    
        res.status(201).json({message: "User signup successfully"});

    } catch (err) {
        res.status(400).json({ message: "Error in sinup",error: err.message });
    }
}


const login = async (req, res) => {
   
   try{
         const {email, password} = req.body;

            if(!email || !password){
                return res.status(400).json({message: "All fields are required"});
            }

         const user = await User.findOne({email});

         if(!user){
            return res.status(400).json({message: "User not found"});
             }

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return res.status(400).json({message: "Invalid password"});
            }

        res.cookie(
            'token',
            generateToken(user._id),
            {maxAge: maxAge,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            partitioned: true,
            }
        ) ;
        res.status(200).json({message: "User login successfully"});

   }catch(err){
       res.status(400).json({message: "Error in login", error:err.message});
   }
}


const userDetails = async (req, res) => {
    try {

        const {id}=req.params;
        if(!id){
            return res.status(400).json({message: "user id is required"});
        }

        const user = await User.findById(id)
        .select('-password')
        .populate("followers")
        .populate({path:"threads", populate:[{path:"likes"},{path:"comments"},{path:"admin"}]})
        .populate({path:"replies", populate:{path:"admin"}})
        .populate({path:"reposts", populate:[{path:"likes"},{path:"comments"},{path:"admin"}]});

        res.status(200).json({mesg: "User details fetched successfully", user});

    } catch (err) {
        res.status(400).json({message: "Error in user details", error: err.message});
    }
}


const followUser = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({message: "user id is required"});
        }

        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        
        //if user is already following then remove the follower -> unfollow
        if(user.followers.includes(req.user._id)){
            await User.findByIdAndUpdate(id, 
            {
                $pull: {followers: req.user._id}
            }, 
            {new: true}
        );

        return res.status(200).json({message: `unfollowed ${user.userName}`}); 
        }
        //if user is not following then add the follower -> follow
        await User.findByIdAndUpdate(id, 
            {
                $push: {followers: req.user._id}
            }, 
            {new: true}
        );

        return res.status(200).json({message: `following ${user.userName}`}); 



    } catch (err) {
        res.status(400).json({message: "Error in following user", error: err.message});
    }
    }

const updateProfile = async (req, res) => {
    try {
        
        //check the existence of the user
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(400).json({message: "No such user exists"});
        }

        //parse the form data
        const form = formidable({});
        form.parse(req, async (err, fields, files) => {
            if(err){
                return res.status(400).json({message: "Error in formidale parsing", error: err.message});
            }

            if(fields.text){
                await User.findByIdAndUpdate(req.user._id,{bio: fields.text}, {new: true});
            }

            if(files.media){
                //if user already has a profile pic, then delete the previous one
                if(user.publicId){
                    await cloudinary.uploader.destroy(user.publicId, 
                        (err, result) => {
                            console.log({result, err}) 
                        });
                }
                const uploadedImage = await cloudinary.uploader.upload(files.media.filepath,
                    // telling cloudinary to upload the image in the folder 'Threads_clone/profiles'
                    //if the folder does not exist, it will create one
                    {folder: 'Threads_clone/profiles'},
                );
                if(!uploadedImage){
                    return res.status(400).json({message: "Error in uploading image"});
                }
                //update the user with the new image
                await User.findByIdAndUpdate(req.user._id, {publicId: uploadedImage.public_id, profilePic:uploadedImage.secure_url}, {new: true});
            }


        });
        res.status(201).json({message: "Profile updated successfully"});

    } catch (err) {
        res.status(400).json({message: "Error in updating profile", error: err.message});
        
    }
}

const searchUser = async (req, res) => {

    try{
        const { query } = req.params;
        const users = await User.find({
          $or: [
           { userName: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
          ],
        });
        res.status(200).json({ msg: "Searched !", users });

    }catch(err){
        res.status(400).json({message: "Error in searching user", error: err.message});
    }
}

const logout = (req, res) => {
    try{
        // res.cookie("token", "", {
        //     maxAge: 0,
        //     httpOnly: true,
        //     sameSite: "none",
        //     secure: true,
        //     partitioned: true,
        //   });

        //clear the cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            partitioned: true,
        });

      
        res.status(200).json({ msg: "You logged out !" });

    }catch(err){
        res.status(400).json({message: "Error in logout", error: err.message});
    }
}

const myInfo = async (req, res) => {
    try{
        if(!req.user){
            return res.status(400).json({message: "User not found"});
        }
        
        res.status(200).json({ me: req.user});
    }catch(err){
        res.status(400).json({message: "Error in fetching user", error: err.message});
    }
}

module.exports = {
     login,
      signup ,
       userDetails,
        followUser,
         updateProfile,
          searchUser,
          logout,
            myInfo
        };