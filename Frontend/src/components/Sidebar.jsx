import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaUtensils,
  FaUsers,
  FaCogs,
  FaStar,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { IoIosAddCircle } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";
import { TbBroadcast } from "react-icons/tb";
const Sidebar = () => {
  const location = useLocation();
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'Guest');


  useEffect(() => {
    const handleStorageChange = () => {
      const role = localStorage.getItem('userRole');
      console.log('User role changed to:', role); 
      setUserRole(role || 'Guest');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const getMenuItems = (role) => {
    switch (role) {
      case 'masterchef':
        return [
          { path: '/explore' ,icon: <FaUtensils /> },
          { path: '/broadcast', icon: <TbBroadcast /> },
          { path: '/addrecipe' ,icon:<IoIosAddCircle/>},
          { path: '/setting' ,icon:<IoMdSettings/>},
          { path: '/profile' ,icon:<FaUserCircle/>},  
        ];
      case 'foodie':
        return [
          { path: '/explore' ,icon: <FaUtensils size={'15px'}/> },
          { path: '/chat', icon: <FiMessageCircle  size={'20px'}/> },
          { path: '/addrecipe' ,icon:<IoIosAddCircle size={'20px'}/>},
          { path: '/setting' ,icon:<IoMdSettings size={'20px'}/>},
          { path: '/profile' ,icon:<FaUserCircle size={'18px'}/>}
        ];
      default:
        return [
          { path: '/explore' ,icon: <FaUtensils size={'15px'}/> },
          { path: '/chat', icon: <FiMessageCircle  size={'20px'}/> },
          { path: '/login' ,icon:<IoIosAddCircle size={'20px'}/>},
          { path: '/login' ,icon:<IoMdSettings size={'20px'}/>},
          { path: '/login' ,icon:<FaUserCircle size={'18px'}/>},
                    
        ];
    }
  };

  const menuItems = getMenuItems(userRole);

  return (
    <div className="sidebar bg-dark text-light mx-2 px-3" style={{ Height:'80vh',borderRadius:'1.5rem'}}>
     <ul className="list-unstyled mt-4" style={{ display: 'flex',flexDirection:'column', justifyContent: 'space-evenly',height:'100%' }}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`mb-3 ${location.pathname === item.path ? 'bg-secondary rounded' : ''}`}
          >
            <Link
              to={item.path}
              className="text-light text-decoration-none d-flex align-items-center p-2"
              aria-label={item.label}
            >
              {item.icon} 
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
