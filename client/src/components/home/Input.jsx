import { Avatar, Button, Stack, Typography, useMediaQuery } from "@mui/material"

import { useDispatch } from "react-redux";
import { setOpenAddPostModal } from "../../redux/serviceSlice";

const Input = () => {

  const _700 = useMediaQuery("(min-width:700px)");

  const dispatch = useDispatch();


  const handleAddPost = () => {
    dispatch(setOpenAddPostModal(true));
  }

  return (
    <>
    {
      _700 ? (<Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"70%"}
        height={28}
        p={3}
        borderBottom={'2px solid gray'}
        my={5}
        mx={'auto'}
        onClick = {handleAddPost}
        >
          <Stack  flexDirection={'row'} alignItems={"center"} gap={2}>
            <Avatar src="" alt="AJ" />
            <Typography color={"GrayText"}> Start a thread...</Typography>
          </Stack>
    
          <Button size="medium" sx={{
            bgcolor:'gray',
            color:'aliceblue',
            ":hover": {
              bgcolor: 'black',
              cursor: 'pointer'
            }
          }}>
            POST 
          </Button>
    
        </Stack>) : (
          null

        )
    }
    </>
  )
}

export default Input