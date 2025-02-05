import React from 'react'

import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './components/common/Header'
import Home from './pages/protected/Home'
import Search from './pages/protected/Search'
import Error from './pages/Error'
import Register from './pages/Register'
const App = () => {
  return (
    <>
    <Register />
    {/* <BrowserRouter>
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