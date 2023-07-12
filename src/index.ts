import { users, products, createNewUser, getAllUsers, createNewProduct, getAllProducts, searchProductsByName } from "./database";
import express, { Request, Response } from 'express';
import { TUser, TProducts } from "./types";
import cors from 'cors';
import { type } from "os";
import { getSystemErrorMap } from "util";

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
    try {
        res.status(201).send(users)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
});

app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get("/products/search", (req: Request, res: Response) => {
    try {
        const nameToFind = req.query.name as string;
        if (nameToFind === undefined) {
            throw new Error("A pesquisa deve pelo menos um caracter")
        }
        if (nameToFind.length === 0) {
            throw new Error("A pesquisa deve ter mais de um caracter")
        }
        const result = products.filter((prod) =>
            prod.name.toLowerCase().includes(nameToFind.toLowerCase())
        );
        res.status(200).send(result);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
})

app.post('/users/login', (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string

        if (typeof id !== "string" || typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
            throw new Error("Todos os parâmetros de usuário devem ser strings")
        }
        const newUser: TUser = {
            id,
            name,
            email,
            password,
            createdAt: new Date().toISOString(),
        }
        const idExist = users.find((identification) => identification.id === id)
        const emailExist = users.find((identification) => identification.email === email)
        if (idExist || emailExist) {
            throw new Error("O id e o email devem ser diferentes dos já cadastrados")
        }
        users.push(newUser)
        res.status(201).send("Cadastro realizado com sucesso")
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

app.post('/products/create', (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const price = req.body.price as number
        const description = req.body.description as string
        const imageUrl = req.body.imageUrl as string

        if (typeof id !== "string" || typeof name !== "string" || typeof price !== "number" || typeof id !== "string" || typeof id !== "string") {
            throw new Error("Todos os parâmetros devem ser string, com exceção do price que deve ser number")
        }

        const newProduct: TProducts = {
            id,
            name,
            price,
            description,
            imageUrl,
        }

        const idExist = products.find((identification) => identification.id === id)

        if (idExist) {
            throw new Error("O id do produto deve ser diferente")
        }

        products.push(newProduct)
        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error: any) {
        res.status(400).send(error.message)
    }


})

app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const userIndex = users.findIndex((user) => user.id === idToDelete)
        if (userIndex >= 0) {
            users.splice(userIndex, 1)
        } else {
            throw new Error("Usuário não encontrado")
        }
        res.status(200).send("Usuário excluido.")
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        const productToDelete = req.params.id
        const productIndex = products.findIndex((product) => product.id === productToDelete)
        if (productIndex >= 0) {
            products.splice(productIndex, 1)
        } else {
            throw new Error("Produto não encontrado")
        }
        res.status(200).send("Produto excluido.")
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

app.put("/products/:id", (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id;
        const idExist = products.find((identification) => identification.id === idToEdit);

        if (!idExist) {
            throw new Error ("Produto não encontrado")
        } else {
            const newId = req.body.id as string | undefined;
            const newName = req.body.name as string | undefined;
            const newPrice = req.body.price as number | undefined;
            const newDescription = req.body.description as string | undefined;
            const newImageUrl = req.body.imageUrl as string | undefined;

            const product = products.find((product) => product.id === idToEdit);

            if (product) {
                product.id = newId || product.id;
                product.name = newName || product.name;
                product.description = newDescription || product.description;
                product.imageUrl = newImageUrl || product.imageUrl;

                product.price = isNaN(Number(newPrice))
                    ? product.price
                    : (newPrice as number);
            }
            res.status(200).send("Atualização realizada com sucesso");
        }
    } catch (error: any) {
        res.status(500).send("Ocorreu um erro na edição do produto");
    }
});








console.log("foi transpilado e executado com sucesso")
createNewUser("u003", "Astrodev", "astrodev@email.com", "astrodev99")
createNewProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "google.com")
getAllUsers()
getAllProducts()
searchProductsByName("gamer")
