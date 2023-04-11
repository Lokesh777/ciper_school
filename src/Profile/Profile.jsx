import { Avatar } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Context } from '../context/Context';
import "./Profile.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api_url } from '../API/Api';

export default function Profile() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [interest, setInterest] = useState("");
    const [success, setSuccess] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
   
    const { user, dispatch } = useContext(Context);
  
    const PopUphandle = () => {
        setShowPopup(!showPopup);
      };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch({ type: "UPDATE_START" });
      const updatedUser = {
        userId: user.userId,
        username,
        email,
        password,
        interest,
      };
      
      try {
        const res = await axios.put(`${api_url}user/` + user.userId, updatedUser);
        setSuccess(true);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        toast.success(res.data.message)
        console.log(res.data)
        PopUphandle();
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
        if (err.response) {
          toast.error(err.response.data.message);
          console.log(err.response.data);
        } else if (err.request) {
          console.log(err.request);
        } else {
          toast.error(err.message)
          console.log('Error', err.message);
        }
      }
    };
  
    const handleDeleteAccount =async(e)=>{
      e.preventDefault();
      try{
      let res =  await axios.delete(`${api_url}user/${user.userId}`);
        // alert("Account deleted successfully!")
        toast.success(res.data.message)
        window.location.replace("/login" );
       }catch(err){  
        //  alert("Network Error in deleting process")
         toast.error(err.message)
        console.log("Error deleting",err)
       }
  
    }

    return (
        <div className='profile_container'>
            <div className='profile_head'>
                <Avatar sx={{ width: 80, height: 80, backgroundColor: "rgb(70, 4, 4)" }} alt={user.username&&username} src="#" />
                <div className='head_details'>
                    <p>Hello,</p>
                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                </div>
            </div>
            <ToastContainer position="top-center" />

            <div className="settings">
                <div className="settingsWrapper">

                    <div className="settingsTitle">
                        <span className="settingsTitleUpdate">Update Your Account</span>
                        <span onClick={handleDeleteAccount} className="settingsTitleDelete">Delete Account</span>
                    </div>

                    <form onSubmit={handleSubmit}
                        className="settingsForm">

                        <label>Username</label>
                        <input
                            type="text" placeholder={user.username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="name" />

                        <label>Email</label>
                        <input type="email"
                            placeholder={user.email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email" />

                        <label>Password</label>
                        <input type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            name="password" />
                       
                       <label>Interests</label>
                           <input type="text"
                           onClick={PopUphandle}
                           placeholder={user.interest}
                        //    onChange={(e) => setPassword(e.target.value)}
                           name="interest" />


                        <button className="settingsSubmitButton" type="submit">
                            Update
                        </button>

                        {success &&
                            <p style={{ color: "green", textAlign: "center", marginTop: "30px" }}
                            >Profile has been updated ...</p>
                        }

                    {showPopup && (
                            <div className="pop-up2"  >
                               <select multiple  className='select-popup' style={{ overflow: 'hidden' }}
                                onChange={(e) => setInterest(Array.from(e.target.selectedOptions, option => option.value))} name="interests">
                                <option value="web development">Web Development</option>
                                <option value="game development">Game Development</option>
                                <option value="android development">Android Development</option>
                                <option value="linux development">Linux Developement</option>
                                <option value="machine learning">Machine Learning</option>
                                <option value="data structure">Data Structure</option>
                                <option value="others">Others</option>
                                </select>
                            <button onClick={PopUphandle}>❌</button>
                            
                            </div>
                        )}

                    </form>

                </div>
            </div>

        </div>
    )
}
