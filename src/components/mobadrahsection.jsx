import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../css/mobadrahsection.css';


export const Mobadrahsection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); 
  }, []);

  return (
    <div className="mobadrah">
      <div className="mobadrah-section1" data-aos="fade-down">
        <h2>مرحبا بكم في</h2>
      </div>
      <div className="mobadrah-section2" data-aos="zoom-in" data-aos-delay="300">
        <h2>مبادرة الإرث الثقافي</h2>
      </div>
    </div>
  );
};

