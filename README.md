# 📬 Service de Notifications - MVP Imagink

Service de notifications par email pour l'écosystème Imagink avec **4 notifications essentielles**.

## 🎯 Fonctionnalités MVP

### ✅ Notifications implémentées

1. **🎉 Confirmation d'inscription** (Clerk)
   - Email de bienvenue personnalisé
   - Intégration avec Clerk pour l'authentification

2. **💳 Confirmation d'achat de crédits**
   - Détails de la commande
   - Montant et nombre de crédits

3. **🎨 Image générée avec succès**
   - Notification quand l'IA génère une image
   - Inclut le prompt utilisé

4. **🛍️ Produit créé avec succès**
   - Confirmation de création sur Printify
   - Lien vers le produit

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Créer le fichier .env
cp env.example .env
# Puis configurer vos credentials SMTP
```

## ⚙️ Configuration

Créez un fichier `.env` avec :

```env
# SMTP (Gmail recommandé)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-app

# Frontend
FRONTEND_URL=http://localhost:3000

# Serveur
PORT=9003
NODE_ENV=development
```

### 🔐 Configuration Gmail

1. Activez l'authentification à 2 facteurs
2. Générez un "mot de passe d'application"
3. Utilisez ce mot de passe dans `SMTP_PASS`

## 🏃‍♂️ Démarrage

```bash
# Mode développement
npm run dev

# Mode production
npm start
```

Le service démarre sur `http://localhost:9003`

## 🧪 Tests

```bash
# Test complet du MVP
npm test

# Test de santé uniquement
npm run test:health
```

## 📡 API Endpoints

### Health Check
```
GET /api/notify/health
```

### 1. Email de bienvenue (Clerk)
```
POST /api/notify/welcome
{
  "email": "user@example.com",
  "userName": "John Doe"
}
```

### 2. Confirmation d'achat
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

### 3. Image générée
```
POST /api/notify/image-generated
{
  "email": "user@example.com",
  "userName": "John Doe",
  "imageUrl": "https://example.com/image.jpg",
  "prompt": "Un chat noir"
}
```

### 4. Produit créé
```
POST /api/notify/product-created
{
  "email": "user@example.com",
  "userName": "John Doe",
  "productName": "T-shirt Chat Noir",
  "productUrl": "https://printify.com/product/123"
}
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

## 🎨 Templates

Les emails utilisent des templates HTML responsifs avec :
- Design moderne et professionnel
- Couleurs de la marque Imagink
- Boutons d'action clairs
- Compatible mobile

## 📊 Monitoring

Le service expose un endpoint de santé pour le monitoring :
- Vérification de la connectivité SMTP
- Statut des templates
- Version et fonctionnalités disponibles

## 🔧 Développement

```bash
# Redémarrer le service
npm run dev

# Voir les logs
tail -f logs/app.log
```

## 📝 Notes

- **Clerk Integration** : Le service est conçu pour fonctionner avec Clerk
- **SMTP Gmail** : Configuration recommandée pour la fiabilité
- **Templates HTML** : Responsifs et optimisés pour tous les clients mail
- **Error Handling** : Gestion d'erreurs robuste avec logs détaillés 