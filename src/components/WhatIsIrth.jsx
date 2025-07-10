import React, { useEffect } from "react";
import '../css/WhatIsIrth.css';
import { CiSearch } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import art from "../assets/arts.png";
import content from "../assets/trusted-content.png";
import { TypeAnimation } from 'react-type-animation';
import AOS from "aos";
import "aos/dist/aos.css";

export const Whatisirth = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="container">
      <TypeAnimation
        sequence={['ماهو إرث ؟']}
        wrapper="h3"
        speed={50}
        repeat={0}
      />
      <hr className="line" />
      <p>
        إرث ليست مجرد مبادرة، بل مشروع وطني رقمي يهدف لحفظ الهوية الثقافية السعودية
        من خلال توثيق التراث غير المادي بوسائل حديثة. تسعى إلى تمكين المجتمعات
        والباحثين من الوصول إلى هذا الكنز الثقافي بسهولة، والمساهمة في نقله للأجيال القادمة.
      </p>
      <div className="icon-container">
        <div className="feature" data-aos="fade-up" data-aos-delay="100">
          <div className="circle-icon"><CiSearch /></div>
          <p>جمع و توثيق التراث غير المادي</p>
        </div>
        <div className="feature" data-aos="fade-up" data-aos-delay="200">
          <div className="circle-icon"><GoPeople /></div>
          <p>تعزيز المشاركة المجتمعية</p>
        </div>
        <div className="feature" data-aos="fade-up" data-aos-delay="300">
          <div className="circle-icon"><img src={art} height={30} width={30} /></div>
          <p>رقمنة الفنون الشعبية</p>
        </div>
        <div className="feature" data-aos="fade-up" data-aos-delay="400">
          <div className="circle-icon"><img src={content} height={30} width={30} /></div>
          <p>توفير محتوى موثوق</p>
        </div>
      </div>
    </div>
  );
};
