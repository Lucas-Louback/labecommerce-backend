import { TUser, TProducts } from "./types";

export const users: TUser[] = [
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
]

export const products: TProducts[] = [
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
]

export function createNewUser(a: string, b: string, c: string, d: string) {
    const newUser: TUser = {
        id: a,
        name: b,
        email: c,
        password: d,
        createdAt: new Date().toISOString(),
    }
    users.push(newUser)
    return (
        console.log("Usuário cadastrado com sucesso")
    )
}
export function getAllUsers() {
    console.log(users)
}

export function createNewProduct(a: string, b: string, c: number, d: string, e: string) {
    const newProduct: TProducts = {
        id: a,
        name: b,
        price: c,
        description: d,
        imageUrl: e,
    }
    products.push(newProduct)
    return(
        console.log("Produto cadastrado com sucesso")
    )
}
export function getAllProducts () {
    console.log(products)
}

export function searchProductsByName (a:string) {
    const result = products.filter((product => {
        return product.name.toLowerCase().includes(a)
    }))

    return(console.log(result))
}
