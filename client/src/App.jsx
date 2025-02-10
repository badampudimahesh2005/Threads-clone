import React from 'react'

import { BrowserRouter, Route, Routes} from 'react-router-dom'

import Header from './components/common/Header'
import Home from './pages/protected/Home'
import Search from './pages/protected/Search'
import Error from './pages/Error'
import Register from './pages/Register'
import ProtectedLayout from './pages/protected/ProtectedLayout'

import { Box } from '@mui/material'
const App = () => {
  return (
    <>

    <Box minHeight={'100vh'}>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<ProtectedLayout />}>
      <Route path="" element={<Home />} />
      <Route path="post/:id" element={<h1>Single post</h1>} />
      <Route path="search" element={<Search />} />
      </Route>
      </Routes>
      </BrowserRouter>
    </Box>
    {/*<Register />
     <BrowserRouter>
    <Header />
    <Routes>
    <Route  path="/" element={<Home />} />
    <Route path="/search" element={<Search />} />
    <Route path="*" element={<Error />} />
    </Routes>
    </BrowserRouter> */}
    </>
  )
}

export default App