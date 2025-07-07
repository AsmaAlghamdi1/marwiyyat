import React, { useEffect, useRef, useState } from "react";
import logoDDC from '../assets/ddclogo-white.png';
import FullLogo from '../assets/ddc-fullLogo.png';
import logoDark from '../assets/ddclogo-removedback.png'; // شعار اليسار بعد السكروول
import fullDark from '../assets/ddcfulllogo-removedback.png'; // شعار اليمين بعد السكروول
import { FaBars, FaTimes } from "react-icons/fa";
import '../CSS/mainNavbar.css';

export const MainNavbar = () => {
  const navRef = useRef();
  const [scrolled, setScrolled] = useState(false); // نتحقق هل نزل تحت ولا لا

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.9;
      const header = document.querySelector("header");

      if (window.scrollY > threshold) {
        header.classList.add("navbar-light");
        setScrolled(true); // نزل تحت
      } else {
        header.classList.remove("navbar-light");
        setScrolled(false); // فوق
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      {/* Logo on the left */}
      <div className="DDC-left">
        <img
          src={scrolled ? logoDark : logoDDC}
          alt="DDC LOGO"
          width={105}
          height={59}
        />
      </div>

      <nav ref={navRef}>
        {/* Center links */}
        <div className="DDC-center">
          <a href="/#">المشاريع</a>
          <a href="/#">وصف المبادرة</a>
          <a href="/#">الرئيسية</a>
        </div>

        {/* Right logo */}
        <div className="DDC-right">
          <img
            src={scrolled ? fullDark : FullLogo}
            alt="DDC Full LOGO"
            width={210}
            height={80}
          />
        </div>

        {/* Close button inside nav */}
        <button className="navbar-btn navbar-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>

      <button className="navbar-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};