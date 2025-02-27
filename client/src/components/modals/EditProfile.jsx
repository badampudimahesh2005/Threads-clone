import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Stack, Typography, useMediaQuery } from "@mui/material"
import { RxCross2 } from "react-icons/rx"
import { useRef, useState, useEffect } from "react"
import Loading from "../common/Loading"

import { useDispatch, useSelector } from "react-redux"
import { setOpenEditProfileModal} from "../../redux/serviceSlice"
import { useParams } from "react-router"
import { useUpdateProfileMutation, useUserDetailsQuery } from "../../redux/serviceApi"
import { toast } from "react-toastify"
import { Bounce } from "react-toastify"


const EditProfile = () => {

  const { openEditProfileModal, myInfo } = useSelector((state) => state.service);
  const dispatch = useDispatch();


    const _700 = useMediaQuery('(min-width:700px)');

    const [pic, setPic] = useState('');
    const [bio, setBio] = useState('');

    const params = useParams();

    const imageRef = useRef();
    const [updateProfile, updateProfileData] = useUpdateProfileMutation();
    const { refetch } = useUserDetailsQuery(params?.id);
    
    const handleClose = () => {
        dispatch(setOpenEditProfileModal(false));
    }

    const handlePhoto = () => {
        imageRef.current.click();

    }
    const handleUpdate =  async() => {
      if (pic || bio) {
        const data = new FormData();
        if (bio) {
          data.append("text", bio);
        }
        if (pic) {
          data.append("media", pic);
        }
        await updateProfile(data);
      }
      dispatch(setOpenEditProfileModal(false));
    }

    useEffect(() => {
      if (updateProfileData.isSuccess) {
        refetch();
        toast.success(updateProfileData.data.msg, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
        });
      }
      if (updateProfileData.isError) {
        toast.error(updateProfileData.error.data.msg, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
        });
      }
    }, [updateProfileData.isError, updateProfileData.isSuccess]);


  return (
    <>
    <Dialog
      open={openEditProfileModal}
      onClose={handleClose}
      fullWidth
      fullScreen={_700 ? false : true}
    >
      {
        updateProfileData.isLoading ? (
          <Stack height={'60vh'}>
            <Loading />
          </Stack>):
          <>
           <Box
            position={"absolute"}
            top={20}
            right={20}
            onClick={handleClose}
          >
            <RxCross2 size={28} className="image-icon" />
          </Box>
          <DialogTitle textAlign={"center"} mb={5}>
            Edit Profile
          </DialogTitle>
          <DialogContent>
            <Stack flexDirection={"column"} gap={1}>
            <Avatar
                  src={
                    pic
                      ? URL.createObjectURL(pic)
                      : myInfo
                      ? myInfo.profilePic
                      : ""
                  }
                  alt={myInfo ? myInfo.userName : ""}
                  sx={{ width: 96, height: 96, alignSelf: "center" }}
                />

              <Button
                size="large"
                sx={{
                  border: "2px solid gray",
                  borderRadius: "10px",
                  width: 96,
                  height: 40,
                  alignSelf: "center",
                  my: 2,
                  ":hover": { cursor: "pointer" },
                }}
                onClick={handlePhoto}
              >
                Change
              </Button>
              <input
                type="file"
                className="file-input"
                accept="image/*"
                ref={imageRef}
                onChange={(e) => setPic(e.target.files[0])}
              />
              <Typography
                variant="subtitle1"
                fontWeight={"bold"}
                fontSize={"1.2rem"}
                my={2}
              >
                Username
              </Typography>
              <input
                type="text"
                value={ myInfo ? myInfo.userName : ""}
                readOnly
                className="text1"
              />
            </Stack>
            <Stack flexDirection={"column"} gap={1}>
              <Typography
                variant="subtitle1"
                fontWeight={"bold"}
                fontSize={"1.2rem"}
                my={2}
              >
                email
              </Typography>
              <input
                type="text"
                value={myInfo ? myInfo.email : ""}
                readOnly
                className="text1"
              />
            </Stack>
            <Stack flexDirection={"column"} gap={1}>
              <Typography
                variant="subtitle1"
                fontWeight={"bold"}
                fontSize={"1.2rem"}
                my={2}
              >
                bio
              </Typography>
              <input
                type="text"
                className="text1"
                placeholder={myInfo ? myInfo.bio : ""}
                value={bio? bio : ""}
                onChange={(e) => setBio(e.target.value)}
                
              />
            </Stack>
            <Button
              size="large"
              sx={{
                border: "2px solid gray",
                borderRadius: "10px",
                bgcolor: "GrayText",
                color: "white",
                width: "100%",
                my: 2,
                fontSize: "1.2rem",
                ":hover": { cursor: "pointer", bgcolor: "gray" },
              }}
              onClick={handleUpdate}
            >
              {" "}
              Update{" "}
            </Button>
          </DialogContent>

          </>
      }
         
    </Dialog>
  </>
  );
}

export default EditProfile