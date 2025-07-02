import React from "react";
import logo from '../assets/ddclogo.png';
import language from '../assets/blacklanguage.png';
import { FaBars,FaTimes } from "react-icons/fa";
import '../CSS/navbar.css';
import {useRef} from 'react'

export const Navbar = () => {
    const navRef=useRef();

    const showNavbar=()=>{
        navRef.current.classList.toggle("responsive_nav");
    }
    return (
        <header>
            <img src={logo} alt="DDC LOGO" width={120} height={50}/>
            <nav ref={navRef}>

                <a href="/#">الرئيسية</a>
                <a href="/#">الأهداف</a>
                <a href="/#">الخريطة التفاعلية</a>
                <a href="/#">تواصل معنا</a>  
                <span><img src={language} alt="language" width={20} height={20} /> English</span>
                   
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}> 
                <FaBars/>
            </button>
        </header>
        // <nav>
        //     <div className="navbar">
        //         <div className="logo">
        //             <img src={logo} alt="DDC Logo" />
        //         </div>
                
        //         <ul>
        //             <li>
        //                 <a href="#home" className="hover:text-primary transition-colors">الرئيسية</a>
        //             </li>
        //             <li>
        //                 <a href="#events" className="hover:text-primary transition-colors">الأهداف</a>
        //             </li>
        //             <li>
        //                 <a href="#map" className="hover:text-primary transition-colors">الخريطة التفاعلية</a>
        //             </li>
        //             <li>
        //                 <a href="#contact" className="hover:text-primary transition-colors">تواصل معنا</a>
        //             </li>
        //         </ul>

        //         <div className="language">
        //             <span> English</span>
        //             <img src={language} alt="language" />
        //         </div>
        //     </div>
        // </nav>



/* <div className="header">
    <a href="#" class="logo">
       <img src={logo} alt="DDC Logo"/>
    </a>
            <FiAlignJustify />
         <nav className="navbar">     
            <a href="#">Home</a>                       
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a> 
                <span> English</span>
                <img src={language} alt="language" />
           </nav> 
</div>  */
            
    );
};



// import React from "react";
// import logo from '../assets/ddclogo.png';
// import lang from "../assets/blacklanguage.png";
// import '../CSS/navbar.css';

// const Navbar = () => {
//     return (
//         <nav className="navbar">
//             <div className="logo-container">
//                 <img src={logo} alt="الشعار" className="logo" />
//             </div>

//             <div className="nav-links">
//                 <a href="#">تواصل معنا</a>
//                 <a href="#">الخريطة التفاعلية</a>
//                 <a href="#">الأهداف</a>
//                 <a href="#">الرئيسة</a>
//                 <a href="#" className="lang-link">
//                     <img src={lang} alt="اللغة" className="lang-icon" />
//                     <span> English </span>
//                 </a>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;