
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: " no token, Unauthorized " }); 
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decoded){
            return res.status(401).json({ message: "token verfication failed,Unauthorized" });
        }

        const user = await User.findById(decoded.userId)
        .populate('followers')
        // .populate('threads')
        // .populate('replies')
        // .populate('reposts');

        if (!user) {
            return res.status(401).json({ message: " No User ,Unauthorized" });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }


}


module.exports = auth;