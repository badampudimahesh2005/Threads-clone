
import { TextField, InputAdornment } from "@mui/material";
import {FaSearch} from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useLazySearchUsersQuery } from "../../redux/serviceApi";
import { addToSearchedUsers } from "../../redux/serviceSlice";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";


const SearchBar = () => {
  const {darkMode} = useSelector((state) => state.service);
  const [query, setQuery] = useState();

  const [searchUser, searchUserData] = useLazySearchUsersQuery();

  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    if (query.trim() && e.key === "Enter") {
      await searchUser(query.trim());
      setQuery("");
    }
  };

  useEffect(() => {
    if (searchUserData.isSuccess) {
      dispatch(addToSearchedUsers(searchUserData.data.users));
      toast.success(searchUserData.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
    if (searchUserData.isError) {
      toast.success(searchUserData.error.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [searchUserData.isSuccess, searchUserData.isError]);

  return (
    <>
    <TextField
      sx={{
        width: "90%",
        maxWidth: "750px",
        boxShadow: "5px 5px 5px gray",
        borderRadius: "15px",
        px: 2,
        py: 1,
        my: 5,
        mx: "auto",
        "& .MuiOutlinedInput-root": {
          color: darkMode?"whitesmoke":"black",
          "& fieldset": {
            border: "none",
          },
        },
      }}
      placeholder="search user..."
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            sx={{ color: darkMode?"whitesmoke": "black" }}
          >
            <FaSearch />
          </InputAdornment>
        ),
      }}
      onChange={(e) => setQuery(e.target.value)}
      onKeyUp={handleSearch}
    />
  </>
  )
}

export default SearchBar