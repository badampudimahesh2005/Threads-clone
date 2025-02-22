import { Menu, MenuItem } from "@mui/material"
import { Link } from "react-router-dom"

import { useDispatch, useSelector } from 'react-redux'
import { toggleColorMode, toggleMainMenu } from '../../redux/serviceSlice';

const MainMenu = () => {

  const { anchorE1 } = useSelector((state) => state.service)

  const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(toggleMainMenu(null));

    }

    const handleToggleTheme = () => {
      handleClose();
      dispatch(toggleColorMode());

    }

    const handleLogout = () => {

    }

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