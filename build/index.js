"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
console.log("foi transpilado e executado com sucesso");
(0, database_1.createNewUser)("u003", "Astrodev", "astrodev@email.com", "astrodev99");
(0, database_1.createNewProduct)("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "google.com");
(0, database_1.getAllUsers)();
(0, database_1.getAllProducts)();
(0, database_1.searchProductsByName)("gamer");
