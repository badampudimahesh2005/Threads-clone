import React from 'react'
import SearchBar from '../../components/search/SearchBar'
import { Stack } from '@mui/material';
import ProfileBar from '../../components/search/ProfileBar';
import { useSelector } from 'react-redux';

const Search = () => {

  const {searchedUsers} = useSelector((state) => state.service);
  return (
    <>
      <SearchBar />
      <Stack flexDirection={"column"} gap={1} mb={5} width={"100%"} mx={"auto"}>
        {searchedUsers ? (
          searchedUsers.length > 0 ? (
            searchedUsers.map((e) => {
              return <ProfileBar key={e._id} e={e} />;
            })
          ) : (
            ""
          )
        ) : (
          <Typography variant="h6" textAlign={"center"} mb={5}>
            Start searching...
          </Typography>
        )}
      </Stack>
    </>
  )
}

export default Search