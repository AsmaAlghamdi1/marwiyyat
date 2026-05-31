import React from "react";
import logo from '../assets/ddclogo.png';
import language from '../assets/blacklanguage.png';
import { FaBars,FaTimes } from "react-icons/fa";
import '../CSS/navbar.css';
import {useRef} from 'react'
import Scrollspy from "react-scrollspy";
import { useTranslation } from 'react-i18next';


export const Navbar = () => {
    const {t,i18n} =useTranslation();
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
                    <a href="#home" className="hover-underline">{t("navbar.home")}</a>
                    <a href="#goals" className="hover-underline">{t("navbar.goals")}</a>
                    <a href="#map" className="hover-underline">{t("navbar.map")}</a> 
                    <a href="#contact" className="hover-underline">{t("navbar.contact")}</a> 
                 
                <span
                    onClick={() => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
                    style={{ cursor: 'pointer' }}
                ><img src={language} alt="language" width={18} height={18} />{t("navbar.language")}</span>
                   
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

