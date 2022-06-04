require("dotenv").config();
const nodemailer = require("nodemailer");

// Config untuk menentukan dengan apa kita akan mengirim email
const courier = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "Oauth2",
    user: "rfkih23@gmail.com",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

const sendEmail = async ({ recipient, subject, url }) => {
  try {
    const htmlBody = `<h2>Hi ${recipient}, please click the link for verify your email</h2>
      <a href= ${url} > Click Here </a>
    `;
    const mail = {
      from: "Abab Corporation <rfkih23@gmail.com>",
      to: recipient,
      subject: subject,
      url: url,
      html: htmlBody,
    };

    // Melakukan proses pengiriman
    courier.sendMail(mail);

    console.log("Email has been sent");
  } catch (error) {
    console.log({ error });
  }
};



module.exports = { sendEmail };