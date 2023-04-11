import {  useContext, useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from "axios";
import { Context } from '../context/Context';
import "./All.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { api_url } from '../API/Api';


const initialFormData = {
  username: "",
  email: "",
  password: "",
  interest:"",
};

export default function Authentication({handleAuth}) {
  const [loginSignup, setLoginSignup] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [error,setError]=useState(false);
  const {dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate()

  const loginSubmit = async (e) => {
    e.preventDefault();
    setError(false)
  dispatch({type:"LOGIN_START"})
  try{
    const response = await axios.post(`${api_url}auth/login`,{
      email: formData.email,
      password: formData.password
    });

    if(!response){
      toast.error(response.data.message);
    }
    dispatch({type: "LOGIN_SUCCESS", payload: response.data})
    // alert(response.data.message);    
    toast.success(response.data.message);
    navigate("/");
    console.log(response.data);
    handleAuth()

  }catch(err){
    setError(true);
    dispatch({type:"LOGIN_FAILURE"});
    if (err.response) {
      // alert(err.response.data.message);
      toast.error(err.response.data.message);
      console.log(err.response.data);
    } else if (err.request) {
      console.log(err.request);
    } else {
      toast.error(err.message)
      console.log('Error', err.message);
    }
  }

  }

  const signupSubmit = async (e) => {
    e.preventDefault();
    setError(false)
    try {
      let res = await axios.post(`${api_url}auth/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        interest:formData.interest
      });
      toast.success(res.data.message); 
      setLoginSignup(!loginSignup)
    } catch (err) {
        setError(true);
      console.log(err);
      toast.error(err.response.data.message)
    }
  }
  
 // events and functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  
  return (    
    <form onSubmit={loginSignup ? signupSubmit:loginSubmit}>
      <ToastContainer position="top-center" />
      <Box 
          display="flex" 
          flexDirection={"column"}
          maxWidth={400} 
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          padding={2}
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
         { loginSignup&& <TextField
        margin="normal"
        variant="outlined"
        label="interest"
        name='interest'
        value={formData.interest}
        onChange={handleChange}
         
      />}


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

