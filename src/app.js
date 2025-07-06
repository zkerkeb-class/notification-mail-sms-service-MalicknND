const express = require("express");
const dotenv = require("dotenv");
const notificationRoutes = require("./routes/notification.routes");
const webhookRoutes = require("./routes/webhook.routes");

dotenv.config();
const app = express();

// IMPORTANT: Les routes webhook doivent être définies AVANT express.json()
// car elles ont besoin du body brut pour la vérification de signature
app.use("/api/webhooks", webhookRoutes);

// Puis le reste de la configuration
app.use(express.json());
app.use("/api/notify", notificationRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`📬 Notification service running on port ${PORT}`);
  console.log(
    `🔗 Webhook Clerk endpoint: http://localhost:${PORT}/api/webhooks/clerk`
  );
});
