import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <>
      <div className='navbar'>  
        <Link to="/" className="linkbanner">GOOGLE FOTOS</Link>
      </div>
      </>    
  )
}
export default Navbar;
