

import {Avatar, Button, Stack, Typography} from '@mui/material'

const ProfileBar = () => {
  return (
    <>
    <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        px={1}
        py={2}
        mx={"auto"}
        boxShadow={"5px 5px 5px gray"}
        width={"90%"}
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
                fontSize={"0.9rem"}
              >
               Mahesh
              </Typography>
           
            <Typography
              variant="caption"
              fontSize={"0.75rem"}
              color={"gray"}
            >
                @mahesh
            </Typography>
            <Typography variant="caption" fontSize={"0.9rem"}>
              5k followers
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