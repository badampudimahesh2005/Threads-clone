import { Stack, Typography, useMediaQuery } from "@mui/material"
import {IoIosMore} from 'react-icons/io'
import Postone from "./posts/Postone"
import PostTwo from "./posts/PostTwo"

import { useDispatch, useSelector } from 'react-redux'
import { toggleMyMenu } from '../../redux/serviceSlice';


const Post = () => {

  const {darkMode} = useSelector((state) => state.service);


  const _700 = useMediaQuery("(min-width:700px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _300 = useMediaQuery("(min-width:300px)");

  const dispatch = useDispatch()

  const handleOpenMenu = (e) => {
    dispatch(toggleMyMenu(e.currentTarget));

  }

  return (
    <>
    <Stack 
    flexDirection={'row'} 
    justifyContent={'space-between'} 
     mx={'auto'}
      p={_700 ? 2 : _400 ? 1: '5px'}
    borderBottom={'3px solid gray'}
    width={_700 ? '70%': _300 ? "90%" : '100%'} 
    sx={{
        ":hover": {
         boxShadow: _700 ?'10px 10px 10px gray' : "",
          cursor: 'pointer'
        },
        transition: 'all 0.3s ease-in-out'

    }}>
        <Stack   flexDirection={'row'} gap={_700 ? 2 : 1} >
            <Postone />
            <PostTwo />
        </Stack>
        <Stack  
         flexDirection={'row'}
          gap={1}
           justifyContent={'center'} 
           fontSize={'1rem'}   >

        <Typography variant="caption" color={darkMode? 'white': "GrayText"} fontSize={'1rem'} position={'relative'} top={2}> 
            24h
            </Typography>

        {/* more icon */}
        <IoIosMore size={_700 ? 28 : 20} onClick={handleOpenMenu}/>
        </Stack>

    </Stack>
    </>
  )
}

export default Post