import Header from '../components/Header'
import React, { useState, useEffect } from 'react';
import '../styles/globals.css'
import { StyledEngineProvider } from '@mui/material';
import { useRouter } from 'next/router'


function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState({})
    const router = useRouter();

    useEffect(()=> {
    let res = localStorage.getItem("user")
    const result = JSON.parse(res)
    setUser(result)
    }, [])
    console.log("App user: " + user?.email)
  return (
    <>
    <Header />
    <StyledEngineProvider injectFirst>
         <Component {...pageProps} />
    </StyledEngineProvider>
    </>
    
  )
}

export default MyApp
