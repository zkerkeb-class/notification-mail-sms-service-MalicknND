// Templates email pour le MVP Imagink
// 4 notifications essentielles : inscription, achat crédits, génération image, création produit

const baseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Imagink</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .highlight { background: #e8f4fd; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎨 Imagink</h1>
            <p>Créez des designs uniques avec l'IA</p>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <p>© 2025 Imagink. Tous droits réservés.</p>
            <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
        </div>
    </div>
</body>
</html>
`;

// 1. Confirmation d'inscription (Clerk)
const welcomeEmail = (userName, userEmail) => {
  const content = `
        <h2>🎉 Bienvenue sur Imagink !</h2>
        <p>Bonjour ${userName || "utilisateur"},</p>
        <p>Votre compte a été créé avec succès sur Imagink. Vous pouvez maintenant :</p>
        <ul>
            <li>🎨 Générer des images avec l'IA</li>
            <li>🛍️ Créer des produits personnalisés</li>
            <li>💳 Acheter des crédits pour plus de créations</li>
        </ul>
        <div class="highlight">
            <strong>Prochaine étape :</strong> Commencez par générer votre première image !
        </div>
        <a href="${
          process.env.FRONTEND_URL || "http://localhost:3000"
        }" class="button">Commencer à créer</a>
    `;
  return baseTemplate(content);
};

// 2. Confirmation d'achat de crédits
const creditPurchaseEmail = (userName, credits, amount, orderId) => {
  const content = `
        <h2>💳 Achat de crédits confirmé</h2>
        <p>Bonjour ${userName || "utilisateur"},</p>
        <p>Votre achat de crédits a été traité avec succès :</p>
        <div class="highlight">
            <strong>Détails de la commande :</strong><br>
            📦 Commande : #${orderId || "N/A"}<br>
            💎 Crédits achetés : ${credits}<br>
            💰 Montant : ${amount}€
        </div>
        <p>Vos crédits sont maintenant disponibles dans votre compte.</p>
        <a href="${
          process.env.FRONTEND_URL || "http://localhost:3000"
        }/generate" class="button">Créer maintenant</a>
    `;
  return baseTemplate(content);
};

// 3. Image générée avec succès
const imageGeneratedEmail = (userName, imageUrl, prompt) => {
  const content = `
        <h2>🎨 Votre image est prête !</h2>
        <p>Bonjour ${userName || "utilisateur"},</p>
        <p>Votre image a été générée avec succès :</p>
        <div class="highlight">
            <strong>Prompt utilisé :</strong> "${prompt || "N/A"}"
        </div>
        <p>Votre image est maintenant disponible dans votre galerie.</p>
        <a href="${
          process.env.FRONTEND_URL || "http://localhost:3000"
        }/gallery" class="button">Voir ma galerie</a>
    `;
  return baseTemplate(content);
};

// 4. Produit créé avec succès
const productCreatedEmail = (userName, productName, productUrl) => {
  const content = `
        <h2>🛍️ Produit créé avec succès</h2>
        <p>Bonjour ${userName || "utilisateur"},</p>
        <p>Votre produit a été créé avec succès sur Printify :</p>
        <div class="highlight">
            <strong>Produit :</strong> ${productName || "N/A"}
        </div>
        <p>Votre produit est maintenant disponible dans votre boutique Printify.</p>
        <a href="${
          productUrl || process.env.FRONTEND_URL || "http://localhost:3000"
        }" class="button">Voir mon produit</a>
    `;
  return baseTemplate(content);
};

module.exports = {
  welcomeEmail,
  creditPurchaseEmail,
  imageGeneratedEmail,
  productCreatedEmail,
};
