const twilio = require("twilio");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendWhatsApp = async (phone, message) => {
  try {
    await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio sandbox number
      to: `whatsapp:${phone}`,
      body: message,
    });
  } catch (err) {
    console.error("WhatsApp error:", err);
  }
};

module.exports = sendWhatsApp;
