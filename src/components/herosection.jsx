import React from "react";
import '../css/herosection.css';
import { useTranslation } from 'react-i18next';
import heroImage from '../assets/background.png'
export const Herosection = () => {
  const {t,i18n} =useTranslation();
  const isArabic = i18n.language === 'ar';
  return (
    <div id="home" className="hero">
        <img
        src={heroImage}
        alt="background image"
        className={`hero-background ${isArabic ? '' : 'flipped'}`}
      />
      <div className={`hero-section ${isArabic ? 'rtl' : 'ltr'}`}>
        <h2>{t("herosection.herotitle")}</h2>
        <p>{t("herosection.herodescription")}</p>
        <button className={`explore-btn ${!isArabic ? 'flipped' : ''}`}> 
         <span className="button-text" >
            {t("herosection.explore")}
          </span> 
        </button>
      </div>
    </div>
  );
};