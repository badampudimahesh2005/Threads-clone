import { useSelector } from "react-redux";
import Post from "../../../components/home/Post";
import { Stack, useMediaQuery } from "@mui/material";

const Threads = () => {
  const { user } = useSelector((state) => state.service);


  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <>
      {user ? (
        user.user ? (
          user.user.threads.length > 0 ? (
            <Stack
              flexDirection={"column"}
              gap={2}
              mb={10}
              width={_700 ? "800px" : "90%"}
              mx={"auto"}
            >
              {user.user.threads.map((e) => {
                return <Post key={e._id} e={e} />;
              })}
            </Stack>
          ) : (
            <Typography variant="h6" textAlign={"center"}>
              No Thread yet !
            </Typography>
          )
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </>
  )
}

export default Threads