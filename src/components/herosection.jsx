import React, { useEffect, useRef } from "react";
import '../css/herosection.css';
import { useTranslation } from 'react-i18next';
import heroImage from '../assets/background.png';

export const Herosection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const btnRef = useRef(null);

  const handleExploreClick = () => {
    const mapElement = document.getElementById("map");
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e) => {
      const x = e.pageX - btn.offsetLeft;
      const y = e.pageY - btn.offsetTop;

      btn.style.setProperty('--x', `${x}px`);
      btn.style.setProperty('--y', `${y}px`);
    };

    btn.addEventListener('mousemove', handleMouseMove);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div id="home" className="hero">
      <img
        src={heroImage}
        alt="background"
        className={`hero-background ${isArabic ? '' : 'flipped'}`}
      />
      <div className={`hero-section ${isArabic ? 'rtl' : 'ltr'}`}>
        <h2>{t("herosection.herotitle")}</h2>
        <p>{t("herosection.herodescription")}</p>
        
        <button
          ref={btnRef}
          onClick={handleExploreClick}
          className={`explore-btn ${!isArabic ? 'flipped' : ''}`}
        >
          <span className="button-text">
            {t("herosection.explore")}
          </span>
        </button>
      </div>
    </div>
  );
};
