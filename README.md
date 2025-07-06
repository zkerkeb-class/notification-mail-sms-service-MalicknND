# 📬 Service de Notifications - Imagink

Service de notifications par email pour l'écosystème Imagink avec **intégration webhooks Clerk** et notifications automatiques.

## 🎯 Fonctionnalités

### ✅ Notifications automatiques (Webhooks Clerk)

1. **🎉 Email de bienvenue automatique**
   - Déclenché automatiquement lors de l'inscription via Clerk
   - Email personnalisé avec le nom de l'utilisateur
   - Intégration complète avec le système d'authentification

### ✅ Notifications manuelles

2. **💳 Confirmation d'achat de crédits**
   - Détails de la commande
   - Montant et nombre de crédits

3. **🎨 Image générée avec succès**
   - Notification quand l'IA génère une image
   - Inclut le prompt utilisé

4. **🛍️ Produit créé avec succès**
   - Confirmation de création sur Printify
   - Lien vers le produit

## 🏗️ Architecture

### Structure des fichiers
```
src/
├── middleware/
│   └── rawBody.js              # Middleware pour body brut (webhooks)
├── controllers/
│   ├── notification.controller.js  # Contrôleurs notifications manuelles
│   └── clerkWebhook.controller.js  # Contrôleur webhooks Clerk
├── routes/
│   ├── notification.routes.js      # Routes notifications manuelles
│   └── webhook.routes.js           # Routes webhooks
├── services/
│   └── mail.service.js             # Service d'envoi d'emails
├── templates/
│   └── emailTemplates.js           # Templates HTML
└── app.js                          # Point d'entrée
```

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Créer le fichier .env
cp env.example .env
# Puis configurer vos credentials
```

## ⚙️ Configuration

Créez un fichier `.env` avec :

```env
# Configuration SMTP (Gmail recommandé)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-app

# URL du frontend
FRONTEND_URL=http://localhost:3000

# Configuration du serveur
PORT=9003
NODE_ENV=development

# Configuration Clerk Webhook
# Obtenez ce secret dans le dashboard Clerk > Webhooks > votre endpoint > "Signing Secret"
CLERK_WEBHOOK_SECRET=whsec_votre_secret_ici
```

### 🔐 Configuration Gmail

1. Activez l'authentification à 2 facteurs
2. Générez un "mot de passe d'application"
3. Utilisez ce mot de passe dans `SMTP_PASS`

### 🔧 Configuration Clerk Webhook

1. **Dashboard Clerk** : [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. **Webhooks** → **Add Endpoint**
3. **URL** : `https://votre-domaine.com/api/webhooks/clerk`
4. **Événements** : `user.created`, `user.updated`, `user.deleted`
5. **Signing Secret** : Copiez dans `CLERK_WEBHOOK_SECRET`

## 🏃‍♂️ Démarrage

```bash
# Mode développement
npm run dev

# Mode production
npm start
```

Le service démarre sur `http://localhost:9003`

## 📡 API Endpoints

### 🔗 Webhooks Clerk (Automatiques)

#### Endpoint principal
```
POST /api/webhooks/clerk
```

#### Test de l'endpoint
```
GET /api/webhooks/clerk/test
```

### 📧 Notifications manuelles

#### Health Check
```
GET /api/notify/health
```

#### 1. Email de bienvenue (manuel)
```
POST /api/notify/welcome
{
  "email": "user@example.com",
  "userName": "John Doe"
}
```

#### 2. Confirmation d'achat
```
POST /api/notify/credit-purchase
{
  "email": "user@example.com",
  "userName": "John Doe",
  "credits": 50,
  "amount": 29.99,
  "orderId": "ORD-2024-001"
}
```

#### 3. Image générée
```
POST /api/notify/image-generated
{
  "email": "user@example.com",
  "userName": "John Doe",
  "imageUrl": "https://example.com/image.jpg",
  "prompt": "Un chat noir"
}
```

#### 4. Produit créé
```
POST /api/notify/product-created
{
  "email": "user@example.com",
  "userName": "John Doe",
  "productName": "T-shirt Chat Noir",
  "productUrl": "https://printify.com/product/123"
}
```

## 🔄 Flux de fonctionnement

### Webhook automatique (Inscription)
```
1. Utilisateur s'inscrit → Frontend Clerk
2. Clerk traite l'inscription
3. Clerk envoie webhook → POST /api/webhooks/clerk
4. Service vérifie la signature (svix)
5. Service extrait les données utilisateur
6. Service envoie email de bienvenue
7. Réponse 200 OK à Clerk
```

### Notification manuelle
```
1. Autre service appelle → POST /api/notify/[type]
2. Service valide les données
3. Service envoie email avec template
4. Réponse de succès
```

## 🔒 Sécurité

### Vérification des webhooks Clerk
- **Signature cryptographique** : Utilisation de `svix` (bibliothèque officielle Clerk)
- **Headers requis** : `svix-id`, `svix-timestamp`, `svix-signature`
- **Secret webhook** : Vérification avec `CLERK_WEBHOOK_SECRET`
- **Rejet automatique** : Des webhooks non signés ou mal signés

### Headers de sécurité
```javascript
// Headers requis pour les webhooks Clerk
{
  'svix-id': 'unique-webhook-id',
  'svix-timestamp': 'timestamp',
  'svix-signature': 'cryptographic-signature'
}
```

## 🧪 Tests

```bash
# Test complet du service
npm test

# Test de santé uniquement
npm run test:health

# Test manuel d'email de bienvenue
curl -X POST http://localhost:9003/api/notify/welcome \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "userName": "Test User"}'

# Test de l'endpoint webhook
curl http://localhost:9003/api/webhooks/clerk/test
```

## 🔗 Intégration avec les autres services

### Service IA (Génération d'images)
```javascript
// Après génération réussie d'une image
await axios.post('http://localhost:9003/api/notify/image-generated', {
  email: user.email,
  userName: user.name,
  imageUrl: generatedImage.url,
  prompt: userPrompt
});
```

### Service de paiement
```javascript
// Après achat de crédits
await axios.post('http://localhost:9003/api/notify/credit-purchase', {
  email: user.email,
  userName: user.name,
  credits: purchasedCredits,
  amount: paymentAmount,
  orderId: order.id
});
```

### Service Printify
```javascript
// Après création d'un produit
await axios.post('http://localhost:9003/api/notify/product-created', {
  email: user.email,
  userName: user.name,
  productName: product.title,
  productUrl: product.url
});
```

## 📊 Monitoring et Logs

### Logs disponibles
```
📨 Webhook Clerk reçu: user.created
👤 Nouvel utilisateur créé: user_xxx
📧 Envoi email de bienvenue à: email@example.com
✅ Email de bienvenue envoyé avec succès
❌ Erreur webhook Clerk: [détails]
```

### Endpoints de monitoring
- `/api/notify/health` - État général du service
- `/api/webhooks/clerk/test` - Test de l'endpoint webhook

## 🎨 Templates

Les emails utilisent des templates HTML responsifs avec :
- Design moderne et professionnel
- Couleurs de la marque Imagink
- Boutons d'action clairs
- Compatible mobile
- Templates personnalisés pour chaque type de notification

## 🔧 Développement

### Dépendances ajoutées
```json
{
  "svix": "^1.68.0"  // Vérification des signatures webhook Clerk
}
```

### Commandes utiles
```bash
# Redémarrer le service
npm run dev

# Voir les logs en temps réel
tail -f logs/app.log

# Test rapide d'un endpoint
curl http://localhost:9003/api/notify/health
```

## 🐛 Dépannage

### Problèmes courants

#### Webhook non reçu
- Vérifiez l'URL dans le dashboard Clerk
- Assurez-vous que `CLERK_WEBHOOK_SECRET` est configuré
- Vérifiez que les événements sont cochés

#### Email non envoyé
- Vérifiez la configuration SMTP
- Consultez les logs d'erreur
- Testez manuellement l'endpoint

#### Signature invalide
- Vérifiez que le secret correspond
- Assurez-vous que le middleware `rawBody` est utilisé

## 📝 Notes techniques

- **Clerk Integration** : Intégration complète avec Clerk pour l'authentification
- **Webhooks automatiques** : Notifications déclenchées automatiquement
- **SMTP Gmail** : Configuration recommandée pour la fiabilité
- **Templates HTML** : Responsifs et optimisés pour tous les clients mail
- **Error Handling** : Gestion d'erreurs robuste avec logs détaillés
- **Sécurité** : Vérification cryptographique des webhooks
- **Monitoring** : Endpoints de santé et logs détaillés

## 🚀 Évolution future

- [ ] Notifications SMS
- [ ] Notifications push
- [ ] Templates d'email personnalisables
- [ ] Analytics des notifications
- [ ] Gestion des préférences utilisateur
- [ ] Support multi-langues 