"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProducts = exports.createNewProduct = exports.getAllUsers = exports.createNewUser = exports.products = exports.users = void 0;
exports.users = [
    {
        id: "u001",
        name: "Fulano",
        email: "fulano@gmail",
        password: "fulano123",
        createdAt: new Date().toISOString(),
    },
    {
        id: "u002",
        name: "Beltrano",
        email: "beltrano@gmail",
        password: "beltrano123",
        createdAt: new Date().toISOString(),
    }
];
exports.products = [
    {
        id: "prod001",
        name: "Mouse Gamer",
        price: 250,
        description: "Melhor mouse do mercado",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
    },
    {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Melhor monitor do mercado",
        imageUrl: "https://picsum.photos/seed/Monitor/400",
    }
];
function createNewUser(a, b, c, d) {
    const newUser = {
        id: a,
        name: b,
        email: c,
        password: d,
        createdAt: new Date().toISOString(),
    };
    exports.users.push(newUser);
    return (console.log("Usuário cadastrado com sucesso"));
}
exports.createNewUser = createNewUser;
function getAllUsers() {
    console.log(exports.users);
}
exports.getAllUsers = getAllUsers;
function createNewProduct(a, b, c, d, e) {
    const newProduct = {
        id: a,
        name: b,
        price: c,
        description: d,
        imageUrl: e,
    };
    exports.products.push(newProduct);
    return (console.log("Produto cadastrado com sucesso"));
}
exports.createNewProduct = createNewProduct;
function getAllProducts() {
    console.log(exports.products);
}
exports.getAllProducts = getAllProducts;
function searchProductsByName(a) {
    const result = exports.products.filter((product => {
        return product.name.toLowerCase().includes(a);
    }));
    return (console.log(result));
}
exports.searchProductsByName = searchProductsByName;
