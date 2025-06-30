import React from "react";
import logo from "../assets/ddclogo-white.png";
import "../CSS/footer.css";
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-sections">
                    <div className="footer-section">
                        <h4>البوابة</h4>
                        <p>عن البوابة</p>
                    </div>
                    <div className="footer-section">
                        <h4>الدعم</h4>
                        <p>الأسئلة الشائعة</p>
                        <p>مركز الدعم</p>
                    </div>
                    <div className="footer-section">
                        <h4>التواصل</h4>
                        <div className="footer-icons">
                            <FaLinkedinIn />
                            <FaInstagram />
                            <FaFacebookF />
                            <FaXTwitter />
                        </div>
                    </div>
                </div>

                <div className="footer-logo">
                    <img src={logo} alt="DDC Logo" />
                </div>
            </div>

            <hr className="footer-line" />
        </footer>
    );
};