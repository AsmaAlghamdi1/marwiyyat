// src/components/WhatWeOffer.jsx
import React from "react";
import "../css/whatWeOffer.css";
import { FaMapMarkedAlt, FaTags, FaHeadphonesAlt, FaLightbulb } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { GrLanguage } from "react-icons/gr";
export const WhatWeOffer = () => {
  const {t,i18n} =useTranslation();

  return (
    <section id="goals" className="offer-section">
      <h2 className="offer-title">{t("whatweoffer.offertitle")}</h2>
      <div className="card-wrapper">

      <div className="card-content">
          <div className="icon-circle">
            <FaMapMarkedAlt />
          </div>
          <h3 className="main-feature">{t("whatweoffer.feature2")}</h3>
          <p className="explain-feature">{t("whatweoffer.desfeature2")}</p>
      </div>
      <div className="card-content">
          <div className="icon-circle">
            <FaTags />
          </div>
          <h3 className="main-feature"> {t("whatweoffer.feature1")} </h3>
          <p className="explain-feature">{t("whatweoffer.desfeature1")}</p>
      
      </div>
      <div className="card-content">
          <div className="icon-circle">
            <FaHeadphonesAlt />
          </div>
          <h3 className="main-feature">{t("whatweoffer.feature4")}</h3>
          <p className="explain-feature">{t("whatweoffer.desfeature4")}</p>
      
      </div>
      <div className="card-content">
          <div className="icon-circle">
            <GrLanguage />
          </div>
          <h3 className="main-feature">{t("whatweoffer.feature3")}</h3>
          <p className="explain-feature">{t("whatweoffer.desfeature3")}</p>
      </div>
      </div>
    </section>
  );
};
