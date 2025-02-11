import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material"
import { useMediaQuery } from "@mui/material"
import { RxCross2 } from "react-icons/rx"
import { FaImages } from "react-icons/fa"
import { useRef, useState } from "react"



const AddPost = () => {

    const _700 = useMediaQuery('(min-width:700px)');
    const _500 = useMediaQuery('(min-width:500px)');
    const _300 = useMediaQuery('(min-width:300px)');


    const [text,setText] = useState('');
    const [media, setMedia] = useState('');

    const mediaref = useRef();

    const handleClose = () => {
    } 

    const handleMediaRef = () => {
        mediaref.current.click();
    }


  return (
    <>
   <Dialog
        open={true}
        onClose={handleClose}
        fullWidth
        fullScreen={_700 ? false : true}
      >
        <Box
        position={'absolute'}
        top={20}
        right={20}
        onClick={handleClose}
        >
        <RxCross2 size={28} className="image-icon"/>
        </Box>
        <DialogTitle textAlign={'center'} mb={5}>New Thread...</DialogTitle>
        <DialogContent>
            <Stack flexDirection={'row'} gap={2} mb={5}>
                <Avatar src="" alt=""  />
                <Stack>
                    <Typography variant={'h6'} fontWeight={'bold'} fontSize={'1rem'}>
                        Mahesh_4221
                    </Typography>
                    {/* text area */}
                    <textarea cols={_500 ? 40: 25} rows={2} className="text1" placeholder="Start a Thread..." autoFocus
                    onChange={(e) => setText(e.target.value)}
                     />
                  {
                    media ?(
                        <img src={URL.createObjectURL(media)} alt="" id="url-img" width={_500 ? 300 : _300? 200:100}
                        height={_500 ? 300 : _300? 200:100}
                         />
                    ) :null
                  }
                     <FaImages  size={28} className='image-icon' onClick={handleMediaRef}/>
                     <input type="file" accept="image/*" className="file-input" ref={mediaref}
                     onChange={(e) => setMedia(e.target.files[0])} 
                     />
                </Stack>
            </Stack>
            <Stack
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            >
                <Typography variant={'h6'} color="gray" fontSize={'1rem'}>Anyone can reply</Typography>
                <Button size='large' sx={{
                    bgcolor: 'GrayText',
                    color: 'white',
                    borderRadius: '10px',
                    '&:hover': {
                        bgcolor: 'gray',
                        cursor: 'pointer',
                    }
                    }}>Post</Button>
            </Stack>
        </DialogContent>
    </Dialog>
    </>
  )
}

export default AddPost