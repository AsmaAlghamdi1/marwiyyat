import React from "react";
import '../css/contactus.css';

export const Contactus = ()=>{
    return(    
    <section className="contact" >
        <h2 className="headind">! ساعدنا في تحسين المحتوى</h2>
        <form id="contact-form" className="contact-form">
            <div className="input-group-2">
                 <textarea name="" id="message" cols="30" rows="10" placeholder="رسالتك">
                </textarea>
                 <input type="submit" id="submit" value="إرسال" className="btn"/>
                </div>
            <div className="input-group">
                <div className="input-box">
                     <input type="text"
                     placeholder="الاسم" id="full-name" name="full-name"/>
                     <input type="email"
                     placeholder="البريد الالكتروني" id="email" name="email"/>
                </div>
                 <div className="input-box">
                        <input type="text"
                        placeholder="رقم الجوال" id="phone-number" name="phone-number"/>
                        <input type="text"
                        placeholder="الموضوع" id="subject" name="subject"/>
                </div>
            </div>
        </form>
    </section>
    );
};