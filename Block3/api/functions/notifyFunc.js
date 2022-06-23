const { CLIENTS } = require("../ws/main");
const nodeMailer = require("../functions/nodemailer");

async function sendNotify(message) {
  let profile = await prisma.profiles.findFirst({
    where: {
      ReceiverID: message.ReceiverID,
      SystemID: message.SystemID,
    },
    include: {
      Receiver: true,
      System: true,
    },
  });
  if (!profile) {
    console.error("Profile not found");
    return;
  }
  if (profile.isEmail && profile.Receiver.Email) {
    nodeMailer.sendEmail(
      profile.System.Name,
      profile.Receiver.Email,
      `Notification from ${profile.System.Name}`,
      message.Text
    );
    console.log("Email was sended");
  }
  if (profile.isTelegram && profile.Receiver.TelegramID) {
    console.log("Telegram was sended");
  }
  if (CLIENTS[message.ReceiverID]) {
    CLIENTS[message.ReceiverID].send(
      JSON.stringify({
        status: "Success",
        events: message,
      })
    );
  }
}

module.exports = {
  sendNotify: sendNotify,
};
