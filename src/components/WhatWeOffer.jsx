// src/components/WhatWeOffer.jsx
import React from "react";
import "../css/whatWeOffer.css";
import { FaMapMarkedAlt, FaTags, FaHeadphonesAlt, FaLightbulb } from "react-icons/fa";

export const WhatWeOffer = () => {
  const features = [
    {
      icon: <FaMapMarkedAlt />,
      title: "خريطة تفاعلية للأماكن النبوية",
    },
    {
      icon: <FaTags />,
      title: "فلترة الأحاديث بسهولة",
    },
    {
      icon: <FaHeadphonesAlt />,
      title: "الإستماع الى الأحاديث صوتيا",
    },
    {
      icon: <FaLightbulb />,
      title: "تصنيف الأحاديث تلقائيا",
    },
  ];

  return (
    <section className="offer-section">
      <div className="offer-flex-container">
        <div className="offer-content">
          <h2 className="offer-title">ماذا تقدم لك المنصة؟</h2>
          <div className="offer-grid">
            {features.map((item, index) => (
              <div className="offer-item" key={index}>
                <div className="icon-circle">{item.icon}</div>
                <p className="offer-text">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
