import React from 'react'

import { BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from './pages/protected/Home'
import Search from './pages/protected/Search'
import Error from './pages/Error'
import Register from './pages/Register'
import ProtectedLayout from './pages/protected/ProtectedLayout'
import ProfileLayout from './pages/protected/profile/ProfileLayout'
import Threads from './pages/protected/profile/Threads'
import Replies from './pages/protected/profile/Replies'
import Repost from './pages/protected/profile/Repost'
import SinglePost from './pages/protected/SinglePost'


import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { useMyInfoQuery } from './redux/serviceApi'

const App = () => {
  const {darkMode} = useSelector((state) => state.service);

  const {data, isError} = useMyInfoQuery();

  if(isError || !data){
    return (
      <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Register />}/>
      </Routes>
      </BrowserRouter>
    );
    }

  return (
    <>

    <Box minHeight={'100vh'}  className={darkMode ? 'mode' : ''}>
      <BrowserRouter>
      <Routes>
       
            <Route path='/' element={<ProtectedLayout />}>
            <Route path="" element={<Home />} />
            <Route path="post/:id" element={<SinglePost />} />
            <Route path="search" element={<Search />} />
           
     
           <Route  path="profile" element={<ProfileLayout />}>
             <Route  path="threads/:id" element={<Threads />} />
             <Route  path="replies/:id" element={<Replies />} />
             <Route  path="reposts/:id" element={<Repost />} />
           </Route>
           </Route>

        <Route path='*' element={<Error />} />
      </Routes>
      </BrowserRouter>
    </Box>
    </>
  )
}

export default App