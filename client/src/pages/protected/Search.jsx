import React from 'react'
import SearchBar from '../../components/search/SearchBar'
import { Stack } from '@mui/material';
import ProfileBar from '../../components/search/ProfileBar';

const Search = () => {
  return (
    <>
    <SearchBar />
    <Stack flexDirection={"column"} gap={1} mb={5} width={"100%"} mx={"auto"}>
       <ProfileBar />
       <ProfileBar />
       <ProfileBar />
    </Stack>
    </>
  )
}

export default Search