const sgMail = require("@sendgrid/mail");
// const { createTransport, getTestMessageUrl } = require("nodemailer");
// const sendGridTransport = require("nodemailer-sendgrid-transport");
const { SENDGRID_API_KEY } = require("../_constants.js");
const { logger } = require("./logger.js");

async function sendMail(to, from, subject, html) {
  // const transport = createTransport(
  //   sendGridTransport({
  //     auth: { api_key: SENDGRID_API_KEY },
  //   })
  // );
  // const info = await transport.sendMail({
  //   from: "contact@ghettohustler.com",
  //   to,
  //   subject,
  //   html,
  // });

  sgMail.setApiKey(SENDGRID_API_KEY);
  const msg = {
    to,
    from,
    subject,
    html,
  };
  sgMail.send(msg).catch((error) => {
    logger.error(error.message, error);
  });
}

module.exports = sendMail;
