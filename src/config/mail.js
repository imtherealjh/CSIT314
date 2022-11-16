const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "csit314qwerty@gmail.com",
    pass: "dgrsuipxslojebwf",
  },
});

module.exports = {
  transporter: transporter,
  sendMail: (mailOptions) => {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) return reject(err);
        resolve(info);
      });
    });
  },
};
