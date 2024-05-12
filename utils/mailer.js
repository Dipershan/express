const nodemailer = require("nodemailer");




const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const sendMail = async ({ email, subject, htmlMsg }) => {
    const { messageId } = await transporter.sendMail({
        from: '"Hello my friend 👻" <dipsestha321@gmail.com>', // sender address
        to: email, // list of receivers
        subject, // Subject line
        html: htmlMsg,
    });
    return messageId;
};
  

  module.exports = {sendMail};