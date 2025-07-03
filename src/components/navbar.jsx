import React from "react";
import logo from '../assets/ddclogo.png';
import language from '../assets/blacklanguage.png';
import { FaBars,FaTimes } from "react-icons/fa";
import '../CSS/navbar.css';
import {useRef} from 'react'
import Scrollspy from "react-scrollspy";

export const Navbar = () => {
    const navRef=useRef();

    const showNavbar=()=>{
        navRef.current.classList.toggle("responsive_nav");
    }
    return (
        <header>
            <img src={logo} alt="DDC LOGO" width={120} height={50}/>
            <nav ref={navRef}>
                {/* <Scrollspy items={['home','goals']}
                currentClassName="active-link"
                offset={-100}
                componentTag='div'
                > */}
                    <a href="#home">الرئيسية</a>
                    <a href="#goals">الأهداف</a>
                    <a href="#map">الخريطة التفاعلية</a>
                    <a href="#contact">تواصل معنا</a> 
                {/* </Scrollspy> */}
                 
                <span><img src={language} alt="language" width={20} height={20} /> English</span>
                   
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}> 
                <FaBars/>
            </button>
        </header>
            
    );
};

