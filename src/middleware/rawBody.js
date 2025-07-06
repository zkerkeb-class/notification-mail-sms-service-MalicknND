/**
 * Middleware pour parser le body brut
 * Nécessaire pour la vérification des webhooks Clerk avec svix
 */
const getRawBody = (req, res, next) => {
  req.rawBody = "";

  req.on("data", (chunk) => {
    req.rawBody += chunk.toString();
  });

  req.on("end", () => {
    next();
  });
};

module.exports = getRawBody;
