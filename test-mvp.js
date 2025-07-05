const axios = require("axios");

const BASE_URL = "http://localhost:9003/api/notify";
const TEST_EMAIL = "ndiayemalick062@gmail.com";

console.log("🧪 Test du MVP - Service de notifications Imagink");
console.log("================================================");

// Test 1: Vérification de la santé du service
async function testHealth() {
  try {
    console.log("\n1️⃣ Test de santé du service...");
    const response = await axios.get(`${BASE_URL}/health`);
    console.log("✅ Service accessible:", response.data.message);
    console.log("📊 Version:", response.data.version);
    console.log("🎯 Fonctionnalités:", response.data.features);
  } catch (error) {
    console.log("❌ Service inaccessible:", error.message);
  }
}

// Test 2: Email de bienvenue (Clerk)
async function testWelcomeEmail() {
  try {
    console.log("\n2️⃣ Test email de bienvenue...");
    const response = await axios.post(`${BASE_URL}/welcome`, {
      email: TEST_EMAIL,
      userName: "Malick",
    });
    console.log("✅ Email de bienvenue envoyé:", response.data.message);
  } catch (error) {
    console.log(
      "❌ Erreur email de bienvenue:",
      error.response?.data?.message || error.message
    );
  }
}

// Test 3: Confirmation d'achat de crédits
async function testCreditPurchaseEmail() {
  try {
    console.log("\n3️⃣ Test confirmation achat crédits...");
    const response = await axios.post(`${BASE_URL}/credit-purchase`, {
      email: TEST_EMAIL,
      userName: "Malick",
      credits: 50,
      amount: 29.99,
      orderId: "ORD-2024-001",
    });
    console.log("✅ Email d'achat envoyé:", response.data.message);
  } catch (error) {
    console.log(
      "❌ Erreur email d'achat:",
      error.response?.data?.message || error.message
    );
  }
}

// Test 4: Image générée
async function testImageGeneratedEmail() {
  try {
    console.log("\n4️⃣ Test notification image générée...");
    const response = await axios.post(`${BASE_URL}/image-generated`, {
      email: TEST_EMAIL,
      userName: "Malick",
      imageUrl: "https://example.com/image.jpg",
      prompt: "Un chat noir sur un fond blanc",
    });
    console.log("✅ Email d'image envoyé:", response.data.message);
  } catch (error) {
    console.log(
      "❌ Erreur email d'image:",
      error.response?.data?.message || error.message
    );
  }
}

// Test 5: Produit créé
async function testProductCreatedEmail() {
  try {
    console.log("\n5️⃣ Test notification produit créé...");
    const response = await axios.post(`${BASE_URL}/product-created`, {
      email: TEST_EMAIL,
      userName: "Malick",
      productName: "T-shirt Chat Noir",
      productUrl: "https://printify.com/product/123",
    });
    console.log("✅ Email de produit envoyé:", response.data.message);
  } catch (error) {
    console.log(
      "❌ Erreur email de produit:",
      error.response?.data?.message || error.message
    );
  }
}

// Exécution des tests
async function runTests() {
  await testHealth();
  await testWelcomeEmail();
  await testCreditPurchaseEmail();
  await testImageGeneratedEmail();
  await testProductCreatedEmail();

  console.log("\n🎉 Tests MVP terminés !");
  console.log("📧 Vérifiez votre boîte mail:", TEST_EMAIL);
}

runTests().catch(console.error);
