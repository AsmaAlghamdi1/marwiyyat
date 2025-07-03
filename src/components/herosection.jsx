import React from "react";
import '../css/herosection.css';

export const Herosection = () => {
  return (
    <div id="home" className="hero">
      <div className="hero-section">
        <h2>الأحاديث كما لو تُروَ من قبل</h2>
        <p>استكشف المواقع التي ذُكرت فيها أحاديث النبي ﷺ</p>
        <button className="explore-btn">استكشف</button>
      </div>
    </div>
  );
};