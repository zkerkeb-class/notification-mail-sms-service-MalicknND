const { Webhook } = require("svix");
const { sendMail } = require("../services/mail.service");
const { welcomeEmail } = require("../templates/emailTemplates");

/**
 * Handler principal des webhooks Clerk
 * Vérifie la signature et traite les événements
 */
const handleClerkWebhook = async (req, res) => {
  try {
    // 1. Récupération des headers de signature
    const svix_id = req.headers["svix-id"];
    const svix_timestamp = req.headers["svix-timestamp"];
    const svix_signature = req.headers["svix-signature"];

    // 2. Vérification de la présence des headers
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error("❌ Headers de signature manquants:", {
        svix_id: !!svix_id,
        svix_timestamp: !!svix_timestamp,
        svix_signature: !!svix_signature,
      });
      return res.status(400).json({
        success: false,
        message: "Headers de signature manquants",
      });
    }

    // 3. Vérification de la présence du secret
    if (!process.env.CLERK_WEBHOOK_SECRET) {
      console.error("❌ CLERK_WEBHOOK_SECRET non configuré");
      return res.status(500).json({
        success: false,
        message: "Configuration webhook manquante",
      });
    }

    // 4. Création de l'instance Webhook avec le secret
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // 5. Vérification et parsing du payload
    let payload;
    try {
      payload = webhook.verify(req.rawBody, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      console.error("❌ Erreur de vérification webhook:", err.message);
      return res.status(400).json({
        success: false,
        message: "Signature webhook invalide",
      });
    }

    // 6. Traitement des événements
    const { type, data } = payload;

    console.log(`📨 Webhook Clerk reçu: ${type}`, {
      userId: data.id,
      timestamp: new Date().toISOString(),
    });

    // 7. Dispatch des événements
    switch (type) {
      case "user.created":
        await handleUserCreated(data);
        break;

      case "user.updated":
        await handleUserUpdated(data);
        break;

      case "user.deleted":
        await handleUserDeleted(data);
        break;

      case "session.created":
        await handleSessionCreated(data);
        break;

      default:
        console.log(`ℹ️ Événement Clerk non géré: ${type}`);
    }

    // 8. Réponse de succès
    res.status(200).json({
      success: true,
      message: "Webhook Clerk traité avec succès",
      event: type,
      userId: data.id,
    });
  } catch (error) {
    console.error("❌ Erreur webhook Clerk:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors du traitement du webhook Clerk",
    });
  }
};

/**
 * Handler pour nouvel utilisateur créé
 */
const handleUserCreated = async (userData) => {
  try {
    console.log("👤 Nouvel utilisateur créé:", userData.id);

    // Extraction des données utilisateur
    const email = userData.email_addresses?.[0]?.email_address;
    const firstName = userData.first_name;
    const lastName = userData.last_name;
    const userName = firstName
      ? `${firstName} ${lastName || ""}`.trim()
      : "Nouvel utilisateur";

    // Envoi de l'email de bienvenue
    if (email) {
      console.log(`📧 Envoi email de bienvenue à: ${email}`);

      const html = welcomeEmail(userName, email);
      await sendMail(email, "🎉 Bienvenue sur Imagink !", html);

      console.log("✅ Email de bienvenue envoyé avec succès");
    } else {
      console.log("⚠️ Aucun email trouvé pour l'utilisateur:", userData.id);
    }

    // Autres actions possibles :
    // - Créer un profil utilisateur en base
    // - Envoyer des notifications internes
    // - Initialiser des données par défaut
    // - Intégrer avec d'autres services
  } catch (error) {
    console.error("❌ Erreur handleUserCreated:", error);
  }
};

/**
 * Handler pour utilisateur mis à jour
 */
const handleUserUpdated = async (userData) => {
  try {
    console.log("🔄 Utilisateur mis à jour:", userData.id);

    // Mise à jour des données en base
    // Synchronisation avec d'autres services
    // Notifications si nécessaire
  } catch (error) {
    console.error("❌ Erreur handleUserUpdated:", error);
  }
};

/**
 * Handler pour utilisateur supprimé
 */
const handleUserDeleted = async (userData) => {
  try {
    console.log("🗑️ Utilisateur supprimé:", userData.id);

    // Nettoyage des données utilisateur
    // Anonymisation des données
    // Notifications internes
  } catch (error) {
    console.error("❌ Erreur handleUserDeleted:", error);
  }
};

/**
 * Handler pour nouvelle session créée
 */
const handleSessionCreated = async (sessionData) => {
  try {
    console.log("🔑 Nouvelle session:", sessionData.id);

    // Logging des connexions
    // Analyse de sécurité
    // Notifications si nécessaire
  } catch (error) {
    console.error("❌ Erreur handleSessionCreated:", error);
  }
};

module.exports = {
  handleClerkWebhook,
  handleUserCreated,
  handleUserUpdated,
  handleUserDeleted,
  handleSessionCreated,
};
