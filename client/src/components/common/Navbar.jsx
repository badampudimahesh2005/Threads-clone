import React from 'react'
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { FiArrowLeft } from "react-icons/fi";
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <>
    <Stack
    flexDirection={"row"}
    maxWidth={"100%"}
    justifyContent={"space-around"}
    alignItems={"center"}
    >
       <Link to={"/"}> <GoHome size={32} /></Link>
       <Link to={"/search"}> <IoIosSearch size={32} /> </Link>
        <TbEdit size={32} />
        <CiHeart size={32} />
       <Link to={"/profile"}> <RxAvatar size={32} /> </Link>

    </Stack>

    </>
  )
}

export default Navbar