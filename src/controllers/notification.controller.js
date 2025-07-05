const { sendMail } = require("../services/mail.service");
const {
  welcomeEmail,
  creditPurchaseEmail,
  imageGeneratedEmail,
  productCreatedEmail,
} = require("../templates/emailTemplates");

// 1. Confirmation d'inscription (Clerk)
const sendWelcomeEmail = async (req, res) => {
  try {
    const { email, userName } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email requis",
      });
    }

    const html = welcomeEmail(userName, email);
    await sendMail(email, "🎉 Bienvenue sur Imagink !", html);

    res.json({
      success: true,
      message: "Email de bienvenue envoyé avec succès",
    });
  } catch (error) {
    console.error("❌ Erreur envoi email de bienvenue:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi de l'email de bienvenue",
    });
  }
};

// 2. Confirmation d'achat de crédits
const sendCreditPurchaseEmail = async (req, res) => {
  try {
    const { email, userName, credits, amount, orderId } = req.body;

    if (!email || !credits || !amount) {
      return res.status(400).json({
        success: false,
        message: "Email, crédits et montant requis",
      });
    }

    const html = creditPurchaseEmail(userName, credits, amount, orderId);
    await sendMail(email, "💳 Achat de crédits confirmé - Imagink", html);

    res.json({
      success: true,
      message: "Email de confirmation d'achat envoyé avec succès",
    });
  } catch (error) {
    console.error("❌ Erreur envoi email d'achat:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi de l'email de confirmation d'achat",
    });
  }
};

// 3. Image générée avec succès
const sendImageGeneratedEmail = async (req, res) => {
  try {
    const { email, userName, imageUrl, prompt } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email requis",
      });
    }

    const html = imageGeneratedEmail(userName, imageUrl, prompt);
    await sendMail(email, "🎨 Votre image est prête ! - Imagink", html);

    res.json({
      success: true,
      message: "Email de notification d'image envoyé avec succès",
    });
  } catch (error) {
    console.error("❌ Erreur envoi email d'image:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi de l'email de notification d'image",
    });
  }
};

// 4. Produit créé avec succès
const sendProductCreatedEmail = async (req, res) => {
  try {
    const { email, userName, productName, productUrl } = req.body;

    if (!email || !productName) {
      return res.status(400).json({
        success: false,
        message: "Email et nom du produit requis",
      });
    }

    const html = productCreatedEmail(userName, productName, productUrl);
    await sendMail(email, "🛍️ Produit créé avec succès - Imagink", html);

    res.json({
      success: true,
      message: "Email de notification de produit envoyé avec succès",
    });
  } catch (error) {
    console.error("❌ Erreur envoi email de produit:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi de l'email de notification de produit",
    });
  }
};

// Endpoint de santé du service
const healthCheck = (req, res) => {
  res.json({
    success: true,
    message: "📬 Notification service is running",
    timestamp: new Date().toISOString(),
    version: "2.0.0",
    features: [
      "Welcome emails (Clerk integration)",
      "Credit purchase confirmations",
      "Image generation notifications",
      "Product creation notifications",
    ],
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCreditPurchaseEmail,
  sendImageGeneratedEmail,
  sendProductCreatedEmail,
  healthCheck,
};
