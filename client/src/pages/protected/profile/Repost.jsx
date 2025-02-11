import Post from "../../../components/home/Post";
import { Stack } from "@mui/material";

const Repost = () => {
  return (
    <>
    <Stack
    flexDirection={"column"}
    gap={2}
    mb={10}
    width={"800px"}
    mx={"auto"}
  >
    <Post />
   
  </Stack>
 </>
  )
}

export default Repost