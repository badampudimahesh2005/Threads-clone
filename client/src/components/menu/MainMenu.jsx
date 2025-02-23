import { Menu, MenuItem } from "@mui/material"
import { Link } from "react-router-dom"

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMyInfo, toggleColorMode, toggleMainMenu } from '../../redux/serviceSlice';
import { useLogoutMeMutation } from "../../redux/serviceApi";

const MainMenu = () => {

  const { anchorE1 } = useSelector((state) => state.service)

  const [logoutMe, logoutMeData] = useLogoutMeMutation();

  const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(toggleMainMenu(null));

    }

    const handleToggleTheme = () => {
      handleClose();
      dispatch(toggleColorMode());

    }

    const handleLogout = async () => {
      handleClose();
     await  logoutMe();

    }

    useEffect(() => {
      if(logoutMeData.isSuccess){
        // dispatch(addMyInfo(null));
        console.log('logout success');
        // window.location.reload();
      }
    }, [logoutMeData.isSuccess])

  return (
    <>
      <Menu
        anchorEl={anchorE1}
        open={anchorE1 !== null ? true : false} 
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleToggleTheme}>Toggle Theme</MenuItem>
        <Link to={'/profile/threads/2'} className="link">
          <MenuItem>My Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default MainMenu