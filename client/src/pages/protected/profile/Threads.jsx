import Post from "../../../components/home/Post";
import { Stack } from "@mui/material";

const Threads = () => {
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
      <Post />
    </Stack>
   </>
  )
}

export default Threads