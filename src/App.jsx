import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate} from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'

const App = () => {

  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if(user){
        console.log("Login")
        navigate('/')
      } else{
        console.log("Logout")
        navigate('/login')
      }
    })
  }, [])

  return (
    <div>
      <ToastContainer theme="dark"/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* /player/:id: Đây là một đường dẫn động.
        /player/: Phần tĩnh của đường dẫn.
        :id: Phần động của đường dẫn, đại diện 
        cho một tham số có thể thay đổi. Trong 
        trường hợp này, id có thể là bất kỳ giá 
        trị nào */}
        <Route path="/player/:id" element={<Player />}></Route>
      </Routes>
    </div>
  );
};

export default App
