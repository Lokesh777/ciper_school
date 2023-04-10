import { Route, Routes } from 'react-router-dom';
import './App.css';
import SideBar from './sidebar/SIdebar';
import Home from './Other/Home';
import Courses from './Other/Courses';
// import Login from './Other/Login';

function App() {
  return (
    <div className="App">
     <SideBar />
     <Routes>
       <Route path='/' element={<Home />} />  
       <Route path='/courses' element={<Courses />} />  
       {/* <Route path='/login' element={<Login />} />   */}
     </Routes>
    </div>
  );
}

export default App;
