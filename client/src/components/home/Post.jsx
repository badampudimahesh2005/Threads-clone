import { Stack, Typography } from "@mui/material"
import {IoIosMore} from 'react-icons/io'
import Postone from "./posts/Postone"
import PostTwo from "./posts/PostTwo"

const Post = () => {
  return (
    <>
    <Stack flexDirection={'row'} justifyContent={'space-between'}  mx={'auto'} p={2} borderBottom={'3px solid gray'} width={'70%'} sx={{
        ":hover": {
         boxShadow: '10px 10px 10px gray',
          cursor: 'pointer'
        },
        transition: 'all 0.3s ease-in-out'

    }}>
        <Stack   flexDirection={'row'} gap={2} >
            <Postone />
            <PostTwo />
        </Stack>
        <Stack   flexDirection={'row'} gap={1} justifyContent={'center'} fontSize={'1rem'}   >

        <Typography variant="caption" color={"GrayText"} fontSize={'1rem'} position={'relative'} top={2}> 
            24h
            </Typography>

        {/* more icon */}
        <IoIosMore size={28} />
        </Stack>

    </Stack>
    </>
  )
}

export default Post