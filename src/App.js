import { Route, Routes } from 'react-router-dom';
import './App.css';
import SideBar from './sidebar/SIdebar';
import Home from './Other/Home';
import Courses from './Other/Courses';
import Profile from './Profile/Profile';
import { useContext } from 'react';
import { Context } from './context/Context';
import Authentication from './Other/Login';

function App() {

  const {user} = useContext(Context);

  return (
    <div className="App">
     <SideBar />
     <Routes>
       <Route path='/' element={user?<Home />:<Authentication />} />  
       <Route path='/courses' element={user?<Courses />:<Authentication />} />  
       <Route path='/profile' element={user?<Profile />:<Authentication />} />  
     </Routes>
    </div>
  );
}

export default App;
