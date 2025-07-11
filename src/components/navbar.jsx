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
        <header className="navbar">
            <img src={logo} alt="DDC LOGO" width={120} height={50}/>
            <nav className="nav" ref={navRef}>
                {/* <Scrollspy items={['home','goals','map','contact']}
                currentClassName="active-link"
                offset={-100}
                componentTag='div'
                > */}
                    <a href="#contact" className="hover-underline">تواصل معنا</a> 
                    <a href="#map" className="hover-underline">الخريطة التفاعلية</a>
                    <a href="#goals" className="hover-underline">الأهداف</a>
                    <a href="#home" className="hover-underline">الرئيسية</a>
                    
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

