import {  useContext, useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from "axios";
import { Context } from '../context/Context';
import "./All.css"

const initialFormData = {
  username: "",
  email: "",
  password: "",
};

export default function Authentication() {
  const [loginSignup, setLoginSignup] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [error,setError]=useState(false);
  const { user,dispatch, isFetching } = useContext(Context);

  const loginSubmit = async (e) => {
    e.preventDefault();
  dispatch({type:"LOGIN_START"})
  try{
    const response = await axios.post('http://localhost:5000/blogify/auth/login',{
        email: formData.email,
        password: formData.password
    });
   dispatch({type: "LOGIN_SUCCESS", payload: response.data})
    alert(response.data.message);
    console.log(response.data);

  }catch(err){
    
    dispatch({type:"LOGIN_FAILURE"});
    if (err.response) {
      alert(err.response.data.message);
      console.log(err.response.data);
    } else if (err.request) {
      console.log(err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', err.message);
    }
  }

  }
console.log(user,isFetching)
  const signupSubmit = async (e) => {
    e.preventDefault();
    setError(false)
    try {
      let res = await axios.post("http://localhost:5000/blogify/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      alert("Your account register successfully!")
      console.log(res.data);
      setLoginSignup(!loginSignup)
    } catch (err) {
        setError(true);
      console.log(err);
    }
  }
  



  // events and functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }


  



  return (
    
    <form onSubmit={loginSignup ? signupSubmit:loginSubmit}>
      <Box 
          display="flex" 
          flexDirection={"column"}
          maxWidth={400} 
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          padding={4}
          marginTop={2}
        
        >
       <Typography fontWeight={600} fontSize={30}>
       {loginSignup?"Signup":"Login" }
        </Typography>
         
     { loginSignup&& <TextField
        margin="normal"
        variant="outlined"
        label="username"
        name='username'
        value={formData.username}
        onChange={handleChange}
         
      />}
      <TextField
       margin="normal"
       variant="outlined"
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
         
      />
        <TextField
        margin="normal"
          variant="outlined"
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          
        />


        <Button disabled={isFetching}
        className="loginButton"
        sx={{marginTop:"5px"}}
        variant="contained" color="warning" type="submit">
          Submit
        </Button>

        <Typography onClick={()=>setLoginSignup(!loginSignup)} 
         paddingTop={1} sx={{fontWeight:"bolder"}} > 
         Change to {loginSignup ? "Login":"Signup"}
         </Typography>
     
      {error && <p style={{color:'red'}} >Something went wrong!!!</p>}
      </Box>
    </form>
  );
};

