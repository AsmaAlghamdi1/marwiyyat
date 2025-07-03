import React from "react";
import '../css/WhatIsIrth.css';
import { CiSearch } from "react-icons/ci";
import { GoPeople } from "react-icons/go";



export const Whatisirth =()=>{
    return(
      <div className="container">
        <h3>ماهو إرث ؟</h3>
        <hr className="line"/>
        <p>إرث ليست مجرد مبادرة، بل مشروع وطني رقمي يهدف لحفظ الهوية الثقافية السعودية من خلال توثيق التراث غير المادي بوسائل حديثة. تسعى إلى تمكين المجتمعات والباحثين من الوصول إلى هذا الكنز الثقافي بسهولة، والمساهمة في نقله للأجيال القادمة</p>
        <div className="icon-container">
            <div className="feature">
                <div className="circle-icon"><CiSearch /></div>
                <p>جمع و توثيق التراث غير المادي</p>
            </div>
            <div className="feature">
                <div className="circle-icon"><GoPeople /></div>
                <p>تعزيز المشاركة المجتمعية</p>
            </div>
            <div className="feature">
                <div className="circle-icon"></div>
                <p>رقمنة الفنون الشعبية</p>
            </div>
            <div className="feature">
                <div className="circle-icon"></div>
                <p>توفير محتوى موثوق</p>
            </div>
        </div>
      </div>
    );
};
