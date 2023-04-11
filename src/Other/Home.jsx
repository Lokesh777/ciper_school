import { useContext, useState } from "react"
import { Context } from "../context/Context"
import {  Avatar } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home(){
  const {user}=useContext(Context);
  const [data, setData] = useState([
    {
      image:"https://ik.imagekit.io/cipherschools/CipherMentors/Rajan-Coding_Mentor.png",
      name:"Ranjan Sharma",
      occupation:"Collage Students",
      follower:"20",
      followState: false
    },
    {
      image:"https://ik.imagekit.io/cipherschools/CipherMentors/Shreyas-PayPal.png",
      name:"Shreyash Verma",
      occupation:"Collage Students",
      follower:"12",
      followState: true
    },
    {
        image:"https://ik.imagekit.io/cipherschools/CipherMentors/Rajan-Coding_Mentor.png",
        name:"Ranjan Sharma",
        occupation:"Collage Students",
        followState: false,
        follower:"20"
      },
      {
        image:"https://ik.imagekit.io/cipherschools/CipherMentors/Shreyas-PayPal.png",
        name:"Shreyash Verma",
        occupation:"Collage Students",
        followState: false,
        follower:"12"
      },
      {
        image:"https://ik.imagekit.io/cipherschools/CipherMentors/Anurag-Coding_Mentor.png",
        name:"Anurag Verma",
        occupation:"Collage Students",
        followState: false,
        follower:"09"
      },
      {
        image:"https://ik.imagekit.io/cipherschools/CipherMentors/Aditya-100ms.png",
        name:"Aditya Verma",
        occupation:"Collage Students",
        followState: false,
        follower:"11"
      },
      {
        image:"https://ik.imagekit.io/cipherschools/CipherMentors/Aditya-100ms.png",
        name:"Aman tyagi",
        occupation:"Collage Students",
        followState: false,
        follower:"82"
      },
      {
        image:"https://ik.imagekit.io/cipherschools/CipherMentors/Harshit-Coding_Mentor.png",
        name:"Harshit Mehta",
        occupation:"University Students",
        followState: false,
        follower:"301"
      },
      {
        image:"https://ik.imagekit.io/cipherschools/CipherMentors/Harshit-Swiggy.png",
        name:"Raja raman",
        occupation:"University Students",
        followState: false,
        follower:"321"
      },
      {
        image:"https://ik.imagekit.io/cipherschools/CipherMentors/Rajan-Coding_Mentor.png",
        name:"Rana Singh",
        occupation:"University Students",
        followState: false,
        follower:"31"
      },
      {
        image:"https://ik.imagekit.io/cipherschools/CipherMentors/Rajan-Coding_Mentor.png",
        name:"Ravi Singh",
        occupation:"University Students",
        followState: false,
        follower:"11"
      },
      {
        image:"https://ik.imagekit.io/cipherschools/CipherMentors/Rajan-Coding_Mentor.png",
        name:"Ranjan Sharma",
        occupation:"Collage Students",
        followState: false,
        follower:"20"
      },
      {
        image:"https://ik.imagekit.io/cipherschools/CipherMentors/Shreyas-PayPal.png",
        name:"Shreyash Verma",
        occupation:"Collage Students",
        followState: false,
        follower:"12"
      },
      {
        image:"https://ik.imagekit.io/cipherschools/CipherMentors/Anurag-Coding_Mentor.png",
        name:"Anurag Verma",
        occupation:"Collage Students",
        followState: false,
        follower:"09"
      },
      {
        image:"https://ik.imagekit.io/cipherschools/CipherMentors/Aditya-100ms.png",
        name:"Aditya Verma",
        occupation:"Collage Students",
        followState: false,
        follower:"11"
      },
      {
        image:"https://ik.imagekit.io/cipherschools/CipherMentors/Aditya-100ms.png",
        name:"Aman tyagi",
        occupation:"Collage Students",
        followState: false,
        follower:"82"
      },
  ]);

  const handleFollowClick = (index) => {
    const newData = [...data];
    newData[index].followState = true;
    setData(newData);
    toast.success(`${user.username} is following ${newData[index].name}`);
    // alert(`${user.username} is Following ${newData[index].name}`)
  };

  const handleUnfollowClick = (index) => {
    const newData = [...data];
    newData[index].followState = false;
    setData(newData);
    toast.error(`${user.username} unfollowed ${newData[index].name}`);
  };

  const renderFollowButton = (index) => {
    const { followState } = data[index];
    if (followState) {
      return <button style={{backgroundColor:"orangered"}}
       onClick={() => handleUnfollowClick(index)}>Unfollow</button>;
    } else {
      return <button style={{backgroundColor:"green"}}
       onClick={() => handleFollowClick(index)}>Follow</button>;
    }
  };

  return (
    <div className="HomeBox">
         <ToastContainer position="top-center"
          // limit={3}  
          />

      <div className='home_head'>
        <Avatar sx={{ width: 80, height: 80, backgroundColor: "rgb(70, 4, 4)" }} alt={user.username} src="#" />
        <div className='home_details'>
          <p>Hello,</p>
          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </div>
      </div>
      

      <div className="home_container">
        {data.map((ele,i)=> (
          <div key={i} className="home_card">
            <img src={ele.image} alt={ele.name}  className="home_avtar"/>
            <h3>{ele.name}</h3>
            <p>{ele.occupation}</p>
            <p><span style={{fontWeight:"900",fontSize:"14px"}}>{ele.follower} </span> followers</p>
            {renderFollowButton(i)}
          </div>
        ))}
      </div>

      
    </div>
  );
}