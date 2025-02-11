import Post from "../../../components/home/Post";
import { Stack ,useMediaQuery} from "@mui/material";

const Repost = () => {

  const _700 = useMediaQuery("(min-width:700px)");

  return (
    <>
    <Stack
    flexDirection={"column"}
    gap={2}
    mb={10}
    width={_700 ? "800px" : "90%"}
    mx={"auto"}
  >
    <Post />
   
  </Stack>
 </>
  )
}

export default Repost