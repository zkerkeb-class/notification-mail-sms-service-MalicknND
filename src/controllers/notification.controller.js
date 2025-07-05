const { sendMail } = require("../services/mail.service");

const sendMailHandler = async (req, res) => {
  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    await sendMail(to, subject, html);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("❌ Error sending email:", err);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};

module.exports = { sendMailHandler };
