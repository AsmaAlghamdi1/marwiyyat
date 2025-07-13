import React from "react";
import '../css/contactus.css';
import { useTranslation } from "react-i18next";



export const Contactus = ()=>{
    const {t,i18n}=useTranslation();
    const isArabic = i18n.language === "ar";
    return(    
    <section className="contact" >
        <h2 className="headind">{t("contactsection.contacttitle")}</h2>
        <form id="contact-form" className={`contact-form ${isArabic ? 'rtl' : 'ltr'}`}>
            {/* <div className="input-group-2">
                 <textarea name="" id="message" cols="30" rows="10" placeholder={t("contactsection.message")}
            style={{
              direction: isArabic ? "rtl" : "ltr",
              textAlign: isArabic ? "right" : "left",
            }}
                 >
                </textarea>
                 <input type="submit" id="submit" value={t("contactsection.send")} className="btn"/>
                </div> */}
            <div className="input-group">
                <div className="input-box">
                     <input type="text"
                     placeholder={t("contactsection.name")} id="full-name" name="full-name"
                       style={{
                direction: isArabic ? "rtl" : "ltr",
                textAlign: isArabic ? "right" : "left",
              }}
                     />
                     <input type="email"
                     placeholder={t("contactsection.email")} id="email" name="email"
                      style={{
                direction: isArabic ? "rtl" : "ltr",
                textAlign: isArabic ? "right" : "left",
              }}
                     />
                </div>
                 <div className="input-box">
                        <input type="text"
                        placeholder={t("contactsection.phone")} id="phone-number" name="phone-number"
                         style={{
                direction: isArabic ? "rtl" : "ltr",
                textAlign: isArabic ? "right" : "left",
              }}
                        />
                        <input type="text"
                        placeholder={t("contactsection.subject")} id="subject" name="subject"
                         style={{
                direction: isArabic ? "rtl" : "ltr",
                textAlign: isArabic ? "right" : "left",
              }}
                        />
                        
                </div>
                
            </div>
            <div className="input-group-2">
                 <textarea name="" id="message" cols="30" rows="10" placeholder={t("contactsection.message")}
            style={{
              direction: isArabic ? "rtl" : "ltr",
              textAlign: isArabic ? "right" : "left",
            }}
                 >
                </textarea>
                 <input type="submit" id="submit" value={t("contactsection.send")} className="btn"/>
                </div>
        </form>
    </section>
    );
};