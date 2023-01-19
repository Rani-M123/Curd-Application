import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
// import {Zelarlogo} from '../Images/Zelarlogo.jpg'
const Header = () => {
  return (
    <div className='header'>
      <img src="https://zelarsoft.com/wp-content/uploads/2021/10/logo.png " alt='logo'/>
      <div>
          <Link className='btn' to="view">View</Link>
          <Link className='btn' to="create">Create</Link>
        </div>
    </div>
  )
}
export default Header











