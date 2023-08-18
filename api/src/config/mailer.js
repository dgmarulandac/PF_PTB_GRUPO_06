require('dotenv').config();
const nodemailer = require("nodemailer");

const { USER, PASS } = process.env;
 
 // create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: USER, //testAccount.user,// generated ethereal user
      pass: PASS, //testAccount.pass// generated ethereal password
    },
  });

  transporter.verify().then(() => {
    console.log("Ready for send emails");
  });

 