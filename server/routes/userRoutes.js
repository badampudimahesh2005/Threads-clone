const { login, signup, userDetails, followUser, updateProfile, searchUser, logout, myInfo} = require('../controllers/userController');

const express = require('express');
const auth = require('../middlewares/auth');
const {Router} = express;

const userRoutes = Router();

//route to login
userRoutes.post('/login',login);
//route to signup
userRoutes.post('/signup',signup);
//route to get the user details
userRoutes.get('/:id', userDetails);
//route to follow a user
userRoutes.put('/follow/:id', auth , followUser);
//route to update the user profile
userRoutes.put('/update-profile', auth , updateProfile);
//route to search a user
userRoutes.get('/search/:query', auth, searchUser);
//route to get the user info
userRoutes.get('/', auth, myInfo);

//route to logout
userRoutes.post('/logout', auth, logout);




module.exports = userRoutes;