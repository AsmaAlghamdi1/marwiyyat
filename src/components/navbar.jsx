import React from "react";
import logo from '../assets/ddclogo.png';
import language from '../assets/blacklanguage.png';
import '../CSS/navbar.css';

export const Navbar = () => {
    return (
        <nav>
            <div className="navbar">
                <div className="logo">
                    <img src={logo} alt="DDC Logo" />
                </div>
                
                <ul>
                    <li>
                        <a href="#home" className="hover:text-primary transition-colors">الرئيسية</a>
                    </li>
                    <li>
                        <a href="#events" className="hover:text-primary transition-colors">الأحداث</a>
                    </li>
                    <li>
                        <a href="#map" className="hover:text-primary transition-colors">الخريطة التفاعلية</a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-primary transition-colors">تواصل معنا</a>
                    </li>
                </ul>

                <div className="language">
                    <img src={language} alt="language" />
                    <span> English</span>
                </div>
            </div>
        </nav>
    );
};