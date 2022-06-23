const nodemailer = require("nodemailer");
const mailConfig = {
  host: "smtp.yandex.ru",
  port: "465",
  secure: true,
  user: "alexey.kazurov@touch-station.com",
  pass: "alexey.kazurov123!",
};

async function sendEmail(fromText, toPersone, subject, text, html) {
  try {
    if (!mailConfig.user || !mailConfig.pass) {
      console.error(
        `The username or password for sending the message is not specified`
      );
      return false;
    }
    let transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.pass,
      },
    });

    let info = await transporter.sendMail({
      from: `"${fromText}" <${mailConfig.user}>`,
      to: toPersone,
      subject: subject,
      text: text,
      html: html,
    });
    console.info(`Send mail success Data: ${JSON.stringify(info)}`);

    return true;
  } catch (e) {
    console.error(
      `${e.message}, Config: ${mailConfig.host} ${mailConfig.port} ${mailConfig.user}, Data: "${fromText}" <${mailConfig.user}> - ${toPersone} - ${subject} - ${text}`
    );
    return true;
  }
}

module.exports = {
  sendEmail: (fromText, toPersone, subject, text, html) => {
    return sendEmail(fromText, toPersone, subject, text, html);
  },
};
