const express = require("express");
const dotenv = require("dotenv");
const notificationRoutes = require("./routes/notification.routes");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/notify", notificationRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`📬 Notification service running on port ${PORT}`);
});
