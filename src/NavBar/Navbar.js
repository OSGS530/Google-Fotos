import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <>
      <div className='navbar'>  
        <Link to="/">GOOGLE FOTOS</Link>
      </div>
      </>    
  )
}
export default Navbar;
