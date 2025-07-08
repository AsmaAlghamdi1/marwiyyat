// src/components/WhatWeOffer.jsx
import React from "react";
import "../css/whatWeOffer.css";
import { FaMapMarkedAlt, FaTags, FaHeadphonesAlt, FaLightbulb } from "react-icons/fa";

export const WhatWeOffer = () => {
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
      <h2 className="offer-title">ماذا تقدم لك المنصة ؟</h2>
      <div className="card-wrapper">

      <div className="card-content">
          <div className="icon-circle">
            <FaMapMarkedAlt />
          </div>
          <h3 className="main-feature">خريطة تفاعلية للاماكن النبوية</h3>
          <p className="explain-feature">استكشف الأماكن المرتبطة بالأحاديث من خلال تجربة بصرية مميزة</p>
      </div>
      <div className="card-content">
          <div className="icon-circle">
            <FaTags />
          </div>
          <h3 className="main-feature">فلترة الأحاديث بسهولة</h3>
          <p className="explain-feature">ابحث وركّز على الأحاديث اللي تهمك بأقل جهد وبشكل أسرع</p>
      
      </div>
      <div className="card-content">
          <div className="icon-circle">
            <FaHeadphonesAlt />
          </div>
          <h3 className="main-feature">الإستماع الى الحديث صوتيًا</h3>
          <p className="explain-feature">استمع للأحاديث بكل وضوح وبطريقة تسهّل عليك الفهم والاستيعاب</p>
      
      </div>
      <div className="card-content">
          <div className="icon-circle">
            <FaLightbulb />
          </div>
          <h3 className="main-feature">تصنيف الأحاديث تلقائيًا</h3>
          <p className="explain-feature">تجربة منظّمة تسهّل عليك الوصول إلى الحديث المناسب بكل يسر</p>
      </div>
      </div>
    </section>
  );
};
