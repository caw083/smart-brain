import React from "react";
import Tilt from 'react-parallax-tilt';
import './logo.css'
import brain from './brain.png'

const Logo = () => {
  return (
    <Tilt className="Tilt br2 shadow-2 ml4" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3">
            <img src={ brain } alt="logo" style={{paddingTop: '5px'}} width={100}></img>
        </div>
    </Tilt>
  );
};

export default Logo;