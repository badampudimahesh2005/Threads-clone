import React from 'react'
import Input from '../../components/home/Input'
import { Stack } from '@mui/material'
import Post from '../../components/home/Post'

const Home = () => {
  return (
    <>

    <Input />

    <Stack
    flexDirection={"column"}
    gap={2}
    mb={10}
    >
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </Stack>
    </>
  )
}

export default Home