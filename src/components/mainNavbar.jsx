import React from "react";
import logoDDC from '../assets/ddclogo-white.png';
import FullLogo from '../assets/ddc-fullLogo.png';
import { FaBars, FaTimes } from "react-icons/fa";
import '../CSS/mainNavbar.css';
import { useRef } from 'react'

export const MainNavbar = () => {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }
    return (
        <header>
            {/* Logo on the left */}
            <div className="DDC-left">
                <img src={logoDDC} alt="DDC LOGO" width={105} height={59} />
            </div>

            <nav ref={navRef}>
                {/* Center links */}
                <div className="DDC-center">
                    <a href="/#">الرئيسية</a>
                    <a href="/#">وصف المبادرة</a>
                    <a href="/#">المشاريع</a>
                </div>

                {/* Right logo */}
                <div className="DDC-right">
                    <img src={FullLogo} alt="DDC Full LOGO" width={210} height={80} />
                </div>

                {/* Close button inside nav */}
                <button
                    className="navbar-btn navbar-close-btn"
                    onClick={showNavbar}
                >
                    <FaTimes />
                </button>
            </nav>

            <button
                className="navbar-btn"
                onClick={showNavbar}
            >
                <FaBars />
            </button>
        </header>
    );
};
