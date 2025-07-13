// src/components/WhatWeOffer.jsx
import React from "react";
import "../css/whatWeOffer.css";
import { FaMapMarkedAlt, FaTags, FaHeadphonesAlt, FaLightbulb } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
export const WhatWeOffer = () => {
  const {t,i18n} =useTranslation();
  // const features = [
  //   {
  //     icon: <FaMapMarkedAlt />,
  //     title: "خريطة تفاعلية للأماكن النبوية",
  //   },
  //   {
  //     icon: <FaTags />,
  //     title: "فلترة الأحاديث بسهولة",
  //   },
  //   {
  //     icon: <FaHeadphonesAlt />,
  //     title: "الإستماع الى الأحاديث صوتيا",
  //   },
  //   {
  //     icon: <FaLightbulb />,
  //     title: "تصنيف الأحاديث تلقائيا",
  //   },
  // ];

  return (
    <section id="goals" className="offer-section">
      {/* <div className="offer-flex-container">
        <div className="offer-content">
          <h2 className="offer-title">ماذا تقدم لك المنصة ؟</h2>
          <div className="offer-grid">
            {features.map((item, index) => (
              <div className="offer-item" key={index}>
                <div className="icon-circle">{item.icon}</div>
                <p className="offer-text">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div> */}
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
            <FaLightbulb />
          </div>
          <h3 className="main-feature">{t("whatweoffer.feature3")}</h3>
          <p className="explain-feature">{t("whatweoffer.desfeature3")}</p>
      </div>
      </div>
    </section>
  );
};
