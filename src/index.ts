import { users, products, createNewUser, getAllUsers, createNewProduct, getAllProducts, searchProductsByName } from "./database";
console.log("foi transpilado e executado com sucesso")
createNewUser("u003", "Astrodev", "astrodev@email.com", "astrodev99")
createNewProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.","google.com")
getAllUsers()
getAllProducts()
searchProductsByName("gamer")
