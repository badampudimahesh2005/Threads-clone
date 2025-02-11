

import {Avatar, Button, Stack, Typography, useMediaQuery} from '@mui/material'

const ProfileBar = () => {

  const _700 = useMediaQuery("(min-width:700px)");
  
  return (
    <>
    <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        px={1}
        py={2}
        mx={"auto"}
        boxShadow={"5px 5px 5px gray"}
        width={_700 ?'80%' :"90%"}
        maxWidth={"700px"}
        borderRadius={"15px"}
        sx={{ ":hover": { cursor: "pointer" } }}
      >
         <Stack flexDirection={"row"} gap={2}>
         <Avatar  src="" alt="" />
         <Stack flexDirection={'column'}>
         <Typography
                variant="h6"
                fontWeight={"bold"}
                fontSize={_700 ? "1rem" : "0.9rem"}
              >
               Mahesh
              </Typography>
           
            <Typography
              variant="caption"
              fontSize={_700 ?"1.1rem": "0.75rem"}
              color={"gray"}
            >
                This is bio
            </Typography>
            <Typography variant="caption" fontSize={_700 ?"1rem": "0.9rem"}>
             Hi ! I am a Good Boy
            </Typography>
         </Stack>
         </Stack>
         <Button
            size="medium"
            sx={{
              border: "1px solid gray",
              color:  "black",
              borderRadius: "10px",
              p: 2,
              height: 40,
            }}
          >
            Follow
          </Button>
        
      </Stack>
    </>
  )
}

export default ProfileBar