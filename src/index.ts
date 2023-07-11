import { users, products, createNewUser, getAllUsers, createNewProduct, getAllProducts, searchProductsByName } from "./database";
import express, { Request, Response } from 'express';
import { TUser, TProducts } from "./types";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!");
});

app.get("/users", (req: Request, res: Response) => {
    res.status(201).send(users)
});

app.get("/products", (req: Request, res: Response) => {

    const nameToFind = req.query.name as string

    if (nameToFind) {
        const result: TProducts[] = products.filter(
            (product) => product.name.toLowerCase().includes(nameToFind.toLowerCase())
        )
        res.status(200).send(result)
    }

    res.status(200).send(products)
});

app.post('/users', (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const email = req.body.email as string
    const password = req.body.password as string

    const newUser: TUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
    }
    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso")

})

app.post('/products', (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const description = req.body.description as string
    const imageUrl = req.body.imageUrl as string

    const newProduct: TProducts = {
        id,
        name,
        price,
        description,
        imageUrl,
    }
    products.push(newProduct)
    res.status(201).send("Cadastro realizado com sucesso")
})

app.delete('/users/:id', (req: Request, res: Response) => {
    const idToDelete = req.params.id
    const userIndex = users.findIndex((user) => user.id === idToDelete)

    if (userIndex >= 0) {
        users.splice(userIndex, 1)
    }
    res.status(200).send("Item deletado com Sucesso")
})

app.delete('/products/:id', (req: Request, res: Response) => {
    const productIdToDelete = req.params.id
    const productIndex = products.findIndex((product) => product.id === productIdToDelete)

    if (productIndex >= 0) {
        products.splice(productIndex, 1)
    }
    res.status(200).send("Item deletado com Sucesso")
})

app.put('/products/:id', (req: Request, res: Response) => {
    const idToEdit = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.imageUrl as string | undefined

    const product = products.find((product) => product.id === idToEdit)

    if (product) {
        product.id = newId || product.id
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.description = newDescription || product.description
        product.imageUrl = newImageUrl || product.imageUrl
    }
    res.status(200).send("Atualização realizada com sucesso")
})







console.log("foi transpilado e executado com sucesso")
createNewUser("u003", "Astrodev", "astrodev@email.com", "astrodev99")
createNewProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "google.com")
getAllUsers()
getAllProducts()
searchProductsByName("gamer")
