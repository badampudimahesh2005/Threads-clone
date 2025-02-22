
import { TextField, InputAdornment } from "@mui/material";
import {FaSearch} from "react-icons/fa";

import { useSelector } from "react-redux";

const SearchBar = () => {
  const {darkMode} = useSelector((state) => state.service);

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
    />
  </>
  )
}

export default SearchBar