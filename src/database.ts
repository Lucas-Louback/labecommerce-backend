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