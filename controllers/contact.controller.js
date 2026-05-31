// import { saveContactMessage } from "../services/contact.service.js";

// export const createContactMessage = async (req, res) => {
//   const { fullname, email, subject, message, phone } = req.body;

//   if (!fullname || !email || !message) {
//     return res.status(400).json({
//       message: "fullname, email, and message are required",
//     });
//   }

//   try {
//     const data = await saveContactMessage({
//       fullname,
//       email,
//       subject,
//       message,
//       phone,
//     });

//     return res.status(200).json({
//       message: "Data saved successfully",
//       data,
//     });
//   } catch (error) {
//     console.error("Contact controller error:", error.message);

//     return res.status(500).json({
//       message: "Database insert failed",
//       error: error.message,
//     });
//   }
// };
import { sendContactEmail } from "../services/contact.service.js";

export const createContactMessage = async (req, res) => {
  const { fullname, email, subject, message, phone } = req.body;

  if (!fullname || !email || !message) {
    return res.status(400).json({
      message: "fullname, email, and message are required",
    });
  }

  try {
    await sendContactEmail({ fullname, email, subject, message, phone });

    return res.status(200).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Email sending error:", error.message);

    return res.status(500).json({
      message: "Failed to send message",
      error: error.message,
    });
  }
};