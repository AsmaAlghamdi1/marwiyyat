import React from "react";
import logo from '../assets/ddclogo.png';
import language from '../assets/blacklanguage.png';
import { FiAlignJustify } from "react-icons/fi";
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
                        <a href="#events" className="hover:text-primary transition-colors">الأهداف</a>
                    </li>
                    <li>
                        <a href="#map" className="hover:text-primary transition-colors">الخريطة التفاعلية</a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-primary transition-colors">تواصل معنا</a>
                    </li>
                </ul>

                <div className="language">
                    <span> English</span>
                    <img src={language} alt="language" />
                </div>
            </div>
        </nav>



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