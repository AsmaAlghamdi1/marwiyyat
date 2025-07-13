import React from "react";
import logo from "../assets/ddclogo-white.png";
import "../CSS/footer.css";
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export const Footer = () => {
    const {t,i18n}=useTranslation();
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-sections">
                    <div className="footer-section">
                        <h4>{t("footer.portal")}</h4>
                        <p>{t("footer.goals")}</p>
                    </div>
                    <div className="footer-section">
                        <h4>{t("footer.support")}</h4>
                        <p>{t("footer.faqs")}</p>
                        <p>{t("footer.supportcenter")}</p>
                    </div>
                    <div className="footer-section">
                        <h4>{t("footer.contact")}</h4>
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
            <span className="copy-right">{t("footer.rights")}</span>
        </footer>
    );
};