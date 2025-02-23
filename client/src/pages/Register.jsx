


import { Button, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLoginMutation, useSigninMutation } from '../redux/serviceApi';

const Register = () => {
    const _700 =useMediaQuery('(min-width:700px)');

    const [signinUser, signinUserData] = useSigninMutation();
    const [loginUser, loginUserData] = useLoginMutation();
    //signinUserData contains the isloding, isFetching, error, data, etc
    //signinUser is the function that we will call to signin the user
    //signinUser({email, password}) will signin the user
    //signinUserData.data will contain the user data
    //signinUserData.error will contain the error
    //signinUserData.isLoading will contain the loading state


    const [login, setLogin] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    const toggleLogin = () => {
        setLogin((prev) => !prev)
    }

    
    const handleRegister = async () => {
        const data = { email, password, userName};
        await signinUser(data);
    }

    const handleLogin = async () => {
       const data = { email, password};
        await loginUser(data);
          
    }

    useEffect(() => {
        if(signinUserData.isSuccess) {
            console.log(signinUserData.data);
        }

        if(loginUserData.isSuccess) {
            console.log(loginUserData.data);
        }

    }, [signinUserData.isSuccess, loginUserData.isSuccess]);

        


  return (
    <>
    <Stack 
    width={"100%"}
    height={"100vh"}
    flexDirection={"row"}   
    justifyContent={"center"}
    alignItems={"center"}
    sx={_700?{
        backgroundImage:"url('/register-bg.webp')",
        backgroundRepeat:"no-repeat",
        backgroundSize:"100% 600px",    
    }:null}
    >
        <Stack 
        flexDirection={"column"}
        width={_700 ? '40%' :'90%'}
        gap={2}
        mt={_700 ? 26 : 0}
        >
            <Typography variant={"h4"}
             fontSize={_700 ? '1.5rem' : '1rem'}
             fontWeight={'bold'}
             alignSelf={'center'}
            >
                {login ? 'Login with email' : 'Register with email'}
            </Typography>

           {
            login? null : <TextField variant='outlined' label='Enter your name' type='text'  onChange={(e)=>{setUserName(e.target.value)}}/>
           }
            <TextField variant='outlined' label='Enter your email' type='email' onChange={(e)=>setEmail(e.target.value)}/>
            <TextField variant='outlined' label='Enter your password' type='password' onChange={(e)=>setPassword(e.target.value)}/>
            <Button size='large'
            sx={{
                width:'100%',
                height:52,
                bgcolor:'green',
                color:'white',
                fontSize:'1rem',
                ":hover":{
                    bgcolor:'blue',
                    cursor:'pointer'
                }
            }}
            onClick={login? handleLogin:handleRegister}
            >{login ? "login":"sign Up"}</Button>
            <Typography 
            variant='subtitle1' 
            fontSize={_700 ? '1.3rem': '1rem'} 
            alignSelf='center'
            >
                {login? "Don't have an account?":"Already have an account?"} 
                <span className='login-link' onClick={toggleLogin}>
                    {login? "Sign Up":"login"}
                </span>
            </Typography>

        </Stack>

    </Stack>
    </>
  )
}

export default Register