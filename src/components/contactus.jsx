import React, { useState, useRef } from "react";
import '../css/contactus.css';
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";

export const Contactus = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const iconRef = useRef(null); // 🔹 مرجع للأيقونة

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = t("contactsectionV.errors.nameRequired");
    } else if (!/^[\u0600-\u06FFa-zA-Z\s]+$/.test(form.fullName.trim())) {
      newErrors.fullName = t("contactsectionV.errors.nameInvalid");
    }

    if (!form.email.trim()) {
      newErrors.email = t("contactsectionV.errors.emailRequired");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email.trim())) {
      newErrors.email = t("contactsectionV.errors.emailInvalid");
    }

    if (form.phoneNumber.trim() && !/^\d{8,15}$/.test(form.phoneNumber.trim())) {
      newErrors.phoneNumber = t("contactsectionV.errors.phoneInvalid");
    }

    if (!form.subject.trim()) {
      newErrors.subject = t("contactsectionV.errors.subjectRequired");
    }

    if (!form.message.trim()) {
      newErrors.message = t("contactsectionV.errors.messageRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    // الرسوم المتحركة للأيقونة
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const icon = iconRef.current;

    icon.classList.add("fly");

    const tl = gsap.timeline();
    tl.to(icon, {
      duration: 1,
      x: screenWidth,
      y: -screenHeight,
      scale: 1.2,
      rotation: -30,
      ease: "power2.inOut",
      opacity: 1,
    })
      .set(icon, {
        x: -screenWidth,
        y: screenHeight,
        scale: 0.8,
        rotation: 30,
        opacity: 0,
      })
      .to(icon, {
        duration: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        ease: "power2.out",
        onComplete: () => {
          icon.classList.remove("fly");
        },
      });

    // 👇 الإرسال إلى الباك-إند
    const response = await fetch("http://localhost:5050/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  fullname: form.fullName,
  email: form.email,
  phone: form.phoneNumber,
  subject: form.subject,
  message: form.message,
}),
    });

    const data = await response.json();

    if (response.ok) {
      alert("تمم"); // تنبيه النجاح
      console.log("Success:", data);

      // تفريغ الفورم
      setForm({
        fullName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
      });

      setErrors({});
    } else {
      console.error("Server Error:", data);
          alert("حدث خطأ");

    }
  } catch (error) {
    console.error("Fetch Error:", error);
    alert("حدث خطأ");
  }
};



  return (
    <section className="contact">
      <h2 className="headind">{t("contactsectionV.contacttitle")}</h2>
      <form
        id="contact-form"
        className={`form ${isArabic ? 'rtl' : 'ltr'}`}
        onSubmit={handleSubmit}
      >
        <div className="input-group">
          <div className="input-box">
            <input
              type="text"
              placeholder={t("contactsectionV.name")}
              id="full-name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              style={{
                direction: isArabic ? "rtl" : "ltr",
                textAlign: isArabic ? "right" : "left",
              }}
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
            <input
              type="email"
              placeholder={t("contactsectionV.email")}
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={{
                direction: isArabic ? "rtl" : "ltr",
                textAlign: isArabic ? "right" : "left",
              }}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder={t("contactsectionV.phone")}
              id="phone-number"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              style={{
                direction: isArabic ? "rtl" : "ltr",
                textAlign: isArabic ? "right" : "left",
              }}
            />
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
            <input
              type="text"
              placeholder={t("contactsectionV.subject")}
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              style={{
                direction: isArabic ? "rtl" : "ltr",
                textAlign: isArabic ? "right" : "left",
              }}
            />
            {errors.subject && <p className="error">{errors.subject}</p>}
          </div>
        </div>
        <div className="input-group-2">
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            placeholder={t("contactsectionV.message")}
            value={form.message}
            onChange={handleChange}
            style={{
              direction: isArabic ? "rtl" : "ltr",
              textAlign: isArabic ? "right" : "left",
            }}
          ></textarea>
          {errors.message && <p className="error">{errors.message}</p>}
          
         <button className="btn" type="submit">
  <span className="text">{t("contactsectionV.send")}</span>
  <span className="icon">
    <svg
      ref={iconRef}
      viewBox="0 0 512.005 512.005"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M511.658 51.675c2.496-11.619-8.895-21.416-20.007-17.176l-482 184a15 15 0 00-.054 28.006L145 298.8v164.713a15 15 0 0028.396 6.75l56.001-111.128 136.664 101.423c8.313 6.17 20.262 2.246 23.287-7.669C516.947 34.532 511.431 52.726 511.658 51.675zm-118.981 52.718L157.874 271.612 56.846 232.594zM175 296.245l204.668-145.757c-176.114 185.79-166.916 176.011-167.684 177.045-1.141 1.535 1.985-4.448-36.984 72.882zm191.858 127.546l-120.296-89.276 217.511-229.462z"/>
    </svg>
  </span>
</button>
        </div>
      </form>
    </section>
  );
};

