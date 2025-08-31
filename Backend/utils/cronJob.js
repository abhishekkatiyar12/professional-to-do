const cron = require("node-cron");
const User = require("../models/User");
const sendWhatsApp = require("./sendWhatsApp");

const sendDueReminders = () => {
  // Schedule cron job to run every day at 9 AM
  cron.schedule("0 9 * * *", async () => {
    console.log("Running daily WhatsApp reminders...");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const dayAfter = new Date(tomorrow);
    dayAfter.setHours(23, 59, 59, 999);

    try {
      // Get all users who have a phone number
      const users = await User.find({ phone: { $exists: true, $ne: "" } });

      users.forEach(user => {
        user.todos.forEach(todo => {
          // Only pending todos due tomorrow
          if (
            todo.status === "pending" &&
            todo.dueDate >= tomorrow &&
            todo.dueDate <= dayAfter
          ) {
            const message = `Reminder: Your task "${todo.name}" is due on ${todo.dueDate.toDateString()}`;
            sendWhatsApp(user.phone, message);
            console.log(`Reminder sent to ${user.phone} for task: ${todo.name}`);
          }
        });
      });
    } catch (err) {
      console.error("Error sending reminders:", err);
    }
  });
};

module.exports = sendDueReminders;
