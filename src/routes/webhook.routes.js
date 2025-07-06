const express = require("express");
const router = express.Router();
const getRawBody = require("../middleware/rawBody");
const {
  handleClerkWebhook,
} = require("../controllers/clerkWebhook.controller");

/**
 * Route webhook Clerk
 * IMPORTANT: Utilise le middleware getRawBody pour parser le body brut
 * nécessaire à la vérification de signature avec svix
 */
router.post("/clerk", getRawBody, handleClerkWebhook);

module.exports = router;
