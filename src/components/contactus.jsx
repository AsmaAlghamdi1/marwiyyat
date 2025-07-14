import React, { useState } from "react";
import '../css/contactus.css';
import { useTranslation } from "react-i18next";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(t("contactsectionV.success"));
      console.log(form);
    }
  };

  return (
    <section className="contact">
      <h2 className="headind">{t("contactsectionV.contacttitle")}</h2>
      <form
        id="contact-form"
        className={`contact-form ${isArabic ? 'rtl' : 'ltr'}`}
        onSubmit={handleSubmit}
      >
        {/* <div className="input-group-2">
                 <textarea name="" id="message" cols="30" rows="10" placeholder={t("contactsectionV.message")}
            style={{
              direction: isArabic ? "rtl" : "ltr",
              textAlign: isArabic ? "right" : "left",
            }}
                 >
                </textarea>
                 <input type="submit" id="submit" value={t("contactsectionV.send")} className="btn"/>
                </div> */}
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
          <input
            type="submit"
            id="submit"
            value={t("contactsectionV.send")}
            className="btn"
          />
        </div>
      </form>
    </section>
  );
};
