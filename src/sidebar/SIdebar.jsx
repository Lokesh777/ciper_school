import { NavLink } from "react-router-dom";
import {MdAddComment } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { IoMdCompass,IoIosCreate } from "react-icons/io";
import { BsDiscord } from "react-icons/bs";
import { GoSignIn,GoSignOut } from "react-icons/go";
import { ImFlag,ImHome3 } from "react-icons/im";
import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SideMenu";
import {
  RiListSettingsFill, RiUserFollowFill,
  RiMenuFoldFill, RiMenuUnfoldFill
} from "react-icons/ri";
import { Fade } from "react-awesome-reveal";
import "../App.css";
import Authentication from "../Other/Login";
import { Context } from "../context/Context";

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [showPopUp, setShowPopUp] = useState(false);
  const {user,dispatch} = useContext(Context);

    const handleLogout = ()=>{
      alert("Logged out successfully...!")
      dispatch({type:"LOGOUT"})
    }
   
  
  const handlePopUp = () => {
      setShowPopUp(!showPopUp);
    };

    const routes = [
      {
        path: "/",
        name: "Home",
        icon: <ImHome3 />,
      },
      {
        path: "/courses",
        name: "Courses",
        icon: <ImBooks />
      },
      {
        path: "/trending",
        name: "Trending",
        icon: <IoMdCompass />
        
      },
      {
        path: "/follow",
        name: "Following",
        icon: <RiUserFollowFill />
    
      },
      {
        path: "/discord",
        name: "Discord",
        icon: <BsDiscord />,
        icon2: '',
      },
      {
        path: "/creator",
        name: "Creator",
        icon: <IoIosCreate />
       
      },
      {
        path: "/feedback",
        name: "Feedback",
        icon: <MdAddComment />
       
      },
      
      {
        path: "/tour",
        name: "Tour",
        icon: <ImFlag />
      },
      {
        path: "/login",
        name:user ? "Logout":"Login",
        icon:<>{user?<GoSignOut onClick={handleLogout} />:<GoSignIn onClick={handlePopUp} />}
        </> ,
      },
      
      {
        path: "/settings",
        name: "Settings",
        icon: <RiListSettingsFill />,
      },
    ];

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "55px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar`}
        >

          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  {user?user.username:"Dashboard"}
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              {
                isOpen ?
                  <RiMenuFoldFill
                    size={25}
                    fontWeight={900}
                    onClick={toggle} /> :
                  <RiMenuUnfoldFill
                    size={30}
                    fontWeight={900}
                    onClick={toggle} />
              }
              {/* <FaBars onClick={toggle} /> */}
            </div>
          </div>



          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <Fade cascade duration={1000} delay={500}>

                    <SidebarMenu
                      setIsOpen={setIsOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                    />
                  </Fade>
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
               
                </NavLink>
              );
            })}
          </section>

        </motion.div>

        <main>{children}</main>
      </div>

      {showPopUp && (
        <div className="pop-up">
            <Authentication />
          <button onClick={handlePopUp}>❌</button>
        </div>
      )}

    </>
  );
};

export default SideBar;
