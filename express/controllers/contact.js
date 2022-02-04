const sendMail = require("../utils/sendMail.js");
const { DOMAIN, APP_EMAIL } = require("../_constants.js");

exports.contactUs = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  await sendMail(
    "mainmangenious@gmail.com",
    APP_EMAIL,
    subject,
    `<div>
    <strong>From : ${DOMAIN}</strong>
    <br/>
    <br/>
    <p>${message}</p>
    <br/>
    <hr/>
    <strong>Sender Name: ${name}</strong>
    <br/>
    <strong>Sender Email: ${email}</strong>
    <br/>
    <strong>Sender Phone Number: ${phone}</strong>
    <br/>
    </div>`
  );
  req.flash("success", `message sent successfully.`);
  return res.redirect("/");
};
