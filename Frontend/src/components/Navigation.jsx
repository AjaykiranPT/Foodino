import React from 'react'
import {NavLink} from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
        <ul>
          <li> <NavLink to="/"> Home </NavLink>  </li>
          <li> <NavLink to="/login"> Login </NavLink>  </li>
          <li> <NavLink to="/register"> Registration </NavLink>  </li>
          <li> <NavLink to="/">  </NavLink>  </li>
        </ul>
    </nav>
  )
}

export default Navigation