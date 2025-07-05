const express = require("express");
const router = express.Router();
const {
  sendWelcomeEmail,
  sendCreditPurchaseEmail,
  sendImageGeneratedEmail,
  sendProductCreatedEmail,
  healthCheck,
} = require("../controllers/notification.controller");

// Endpoint de santé
router.get("/health", healthCheck);

// 1. Confirmation d'inscription (Clerk)
router.post("/welcome", sendWelcomeEmail);

// 2. Confirmation d'achat de crédits
router.post("/credit-purchase", sendCreditPurchaseEmail);

// 3. Image générée avec succès
router.post("/image-generated", sendImageGeneratedEmail);

// 4. Produit créé avec succès
router.post("/product-created", sendProductCreatedEmail);

module.exports = router;
