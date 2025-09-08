const MAXSALEPERCENT = 0.75;
const MINSALEPERCENT = 0.25;
const MAXTIMEINSECONDREMAINING = 240;

const fs = require("fs");

// on charge le fichier products.json
const products = JSON.parse(fs.readFileSync("src/data/products.json", "utf-8"));

// on méeange les produits
const shuffledProducts = products.sort(() => 0.5 - Math.random());

// on prend les 250 premiers produits
const selectedProducts = shuffledProducts.slice(0, 250);

// ajouter une date d'expiration et un pourcentage de reduction aleatoire
const currentDate = Date.now();
const saleProducts = selectedProducts.map((product) => {
  let expirationDate = new Date(currentDate + Math.floor(Math.random() * MAXTIMEINSECONDREMAINING * 1000)); // ajouter un nombre aleatoire de jours entre 0 et 30

  return {
    ...product,
    expirationDate: expirationDate.toISOString(),
    salePercentage: parseFloat(Math.random() * (MAXSALEPERCENT - MINSALEPERCENT) + MINSALEPERCENT), // pourcentage entre 0 et 1
  };
});

// Save to sale_products.json
fs.writeFileSync("src/data/saleProducts.json", JSON.stringify(saleProducts, null, 2));
