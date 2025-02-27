import React, { useState, useEffect } from 'react';
import Input from '../../components/home/Input'
import { Button, Stack } from '@mui/material'
import Post from '../../components/home/Post'
import {useAllPostQuery} from '../../redux/serviceApi'
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import Loading from '../../components/common/Loading';

const Home = () => {

  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(true);
  const {allPosts} = useSelector(state => state.service);


  // we had postData in data and allposts in state
  // but data only had limited number of posts-->where limit=page
  // we always store the posts in allPosts in state, so we use allPosts to display the posts
  // we use data to get the new posts and add them to allPosts
  const {data, isLoading} = useAllPostQuery(page);

 


  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  }

  useEffect(() => {
    if (data) {
      if (data.posts.length < 3) {
        setShowMore(false);
      }
    }
  }, [data]);



  return (
    <>

    <Input />

    <Stack
    flexDirection={"column"}
    gap={2}
    mb={10}
    >
      {allPosts ? (
          allPosts.length > 0 ? (
            allPosts.map((e) => {
              return <Post key={e._id} e={e} />;
            })
          ) : (
            <Typography variant="caption" textAlign={"center"}>
              No post yet !
            </Typography>
          )
        ) : isLoading ? (
          <Loading />
        ) : null}
      </Stack>
      {showMore ? (
        <Button
          size="large"
          sx={{ my: 5, p: 3, textDecoration: "underline", cursor: "pointer" }}
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      ) : (
        allPosts?.length > 0 && (
          <Typography variant="h6" textAlign={"center"} mb={5}>
            You have reached the end !
          </Typography>
        )
      )}
    </>
  )
}

export default Home