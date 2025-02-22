import React from 'react'
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { FiArrowLeft } from "react-icons/fi";
import { Stack, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setOpenAddPostModal } from '../../redux/serviceSlice';


const Navbar = () => {
  const {darkMode} = useSelector((state) => state.service);


  const _300 = useMediaQuery("(min-width:300px)");

  const dispatch = useDispatch()

  const handleAddPost = () => {
    dispatch(setOpenAddPostModal(true));
  }

  return (
    <>
    <Stack
    flexDirection={"row"}
    maxWidth={"100%"}
    justifyContent={"space-around"}
    alignItems={"center"}
    >
      <FiArrowLeft size={_300 ? 32 : 24}  className='image-icon' color={darkMode? 'white':'black'}/>

       <Link to={"/"} className='link'> 
       <GoHome size={_300 ? 32 : 24} color={darkMode? 'white':'black'} />
       </Link>

       <Link to={"/search"} className='link'>
        <IoIosSearch size={_300 ? 32 : 24} color={darkMode? 'white':'black'}/> 
        </Link>

        <TbEdit  size={_300 ? 32 : 24} className='image-icon' color={darkMode? 'white':'black'} onClick={handleAddPost} />

        <CiHeart size={_300 ? 32 : 24} className='image-icon' color={darkMode? 'white':'black'}/>
        
       <Link to={"/profile"} className='link'>
        <RxAvatar size={_300 ? 32 : 24} color={darkMode? 'white':'black'} /> 
        </Link>

    </Stack>

    </>
  )
}

export default Navbar