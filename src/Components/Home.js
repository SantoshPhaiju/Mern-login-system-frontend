import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const getToken = localStorage.getItem("auth-token");
  useEffect(() =>{
    if(!getToken){
      navigate("/login");
    }
  })
  return (
    <>
      <h1 className='text-3xl'>Welcome </h1>
      this is the home page here
    </>
  )
}

export default Home
