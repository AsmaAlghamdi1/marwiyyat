import React from "react";
import logoDDC from '../assets/ddc.png';
import FullLogo from '../assets/ddc-fullLogo.png';
import { FaBars,FaTimes } from "react-icons/fa";
import '../CSS/mainNavbar.css';
import {useRef} from 'react'

export const MainNavbar = () => {
    const navRef=useRef();

    const showNavbar=()=>{
        navRef.current.classList.toggle("responsive_nav");
    }
    return (
        <header>
            <img src={logoDDC} alt="DDC LOGO" width={95} height={40}/>
            <nav ref={navRef}>

                <a href="/#">الرئيسية</a>
                <a href="/#">وصف المبادرة</a>
                <a href="/#">المشاريع</a>
            <img src={FullLogo} alt="DDC LOGO" className='FullLogo' width={170} height={80}/>    
                <button className="navbar-btn navbar-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className="navbar-btn" onClick={showNavbar}> 
                <FaBars/>
            </button>
        </header>
            
    );
};
