import nodemailer from "nodemailer";

export const sendContactEmail = async ({
  fullname,
  email,
  subject,
  message,
  phone,
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Marwiyat Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.RECEIVER_EMAIL,
    replyTo: email,
    subject: subject || "New Contact Message",
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${fullname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Subject:</strong> ${subject || "No subject"}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });
};