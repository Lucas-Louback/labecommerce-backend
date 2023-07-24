import express, { Request, Response } from 'express';
import { TUser, TProducts, TProducts2 } from "./types";
import cors from 'cors';
import { db } from "./database/knex";
import { type } from "os";
import { getSystemErrorMap } from "util";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post("/create-table-users", async (req: Request, res: Response) => {
    try {
        await db.raw(`
      CREATE TABLE
      users (
          id TEXT PRIMARY KEY UNIQUE NOT NULL,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT null,
          password TEXT NOT NULL,
          created_at TEXT NOT NULL
      );
      `);
        res.status(200).send("Tabela users criada com sucesso!");
    }
    catch (error: any) {
        res.status(400).send("Erro inesperado")
    }
});

app.post("/users", async (req: Request, res: Response) => { //refatorado e funcionando
    try {
        const id = req.body.id
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        if (!id || !name || !email || !password) {
            res.status(400)
            throw new Error("Dados inválidos")
        }
        const newUser = {
            id: id,
            name: name,
            email: email,
            password: password,
            created_at: new Date().toISOString()
        }
        await db("users").insert(newUser)
        res.status(200).send({ message: "Cadastro realizado com sucesso!" })
    }
    catch (error: any) {
        res.status(400).send(error.message)
    }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        if (idToDelete[0] !== "u") {
            res.status(400)
            throw new Error("O id deve cmeçar com 'u'")
        }
        const [userIdToDelete] = await db("users").where({ id: idToDelete })
        if (!userIdToDelete) {
            res.status(400)
            throw new Error("Id nao existente")
        }
        await db("users").del().where({ id: idToDelete })
        res.status(200).send("usuário excluido com sucesso")

    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
})


app.get("/users", async (req: Request, res: Response) => { //refatorado e funcionando
    try {
        const result: Array<TUser> = await db("users")
        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
});


app.post("/create-table-products", async (req: Request, res: Response) => {
    try {
        await db.raw(`
      CREATE TABLE
      products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT null,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
      );
      `);
        res.status(200).send("Tabela Products criada com sucesso!");
    }
    catch (error: any) {
        res.status(400).send("Erro inesperado")
    }
});

app.post("/products", async (req: Request, res: Response) => { //refatorado e funcionando
    try {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const description = req.body.description
        const image_url = req.body.image_url
        if (!id || !name || isNaN(price) || !description || !image_url) {
            res.status(400)
            throw new Error("Dados inválidos")
        }
        const newProduct = {
            id: id,
            name: name,
            price: price,
            description: description,
            image_url: image_url
        }
        await db("products").insert(newProduct)
        res.status(200).send({ message: "Cadastro de produto realizado com sucesso!" })
    }
    catch (error: any) {
        res.status(400).send(error.message)
    }
});

app.put("/products/:id", async (req: Request, res: Response) => { //não achei necessário refatorar
    try {
        const idToEdit = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newDescription = req.body.description
        const newImage_url = req.body.image_url

        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }
            if (newId.length < 4) {
                res.status(400)
                throw new Error("'id' deve ter pelo menos 4 caracteres")
            }
        }
        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string")
            }
            if (newName.length < 2) {
                res.status(400)
                throw new Error("'name' deve ter pelo menos dois caracteres")
            }
        }
        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(400)
                throw new Error("'price' deve ser number")
            }
        }
        if (newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                res.status(400)
                throw new Error("'description' deve ser string")
            }
            if (newDescription.length < 2) {
                res.status(400)
                throw new Error("'description' deve ter mais de dois caracteres")
            }
        }
        if (newImage_url !== undefined) {
            if (typeof newImage_url !== "string") {
                res.status(400)
                throw new Error("'image_url' deve ser string")
            }
            if (newImage_url.length < 2) {
                res.status(400)
                throw new Error("'image_url' deve ter mais de dois caracteres")
            }
        }
        const [productToEdit]: TProducts2[] | undefined[] = await db("products").where({ id: idToEdit })
        if (!productToEdit) {
            res.status(400)
            throw new Error("'id' não encontrado")
        }
        await db.update({
            id: newId || productToEdit.id,
            name: newName || productToEdit.name,
            price: newPrice || productToEdit.price,
            description: newDescription || productToEdit.description,
            image_url: newImage_url || productToEdit.image_url

        }).from("products").where({ id: idToEdit })

        res.status(200).send("Produto atualizado com sucesso")
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

app.delete("/products/:id", async (req: Request, res: Response) => { //refatorado e funcionando
    try {
        const idToDelete = req.params.id
        if (idToDelete[0] !== "p") {
            res.status(400)
            throw new Error("O id deve cmeçar com 'prod'")
        }
        const [productIdToDelete]: TProducts2[] | undefined[] = await db("products").where({ id: idToDelete })
        if (!productIdToDelete) {
            res.status(400)
            throw new Error("Id nao existente")
        }
        await db("products").del().where({ id: idToDelete })
        res.status(200).send("Produto excluído")

    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

app.get("/products", async (req: Request, res: Response) => {
    try {
        const nameToFind = req.query.name as string

        if (typeof nameToFind === "string" && nameToFind.length > 0) {
            const result: TProducts[] = await db.raw(
                `SELECT * FROM products WHERE name LIKE '%${nameToFind}%';`
            );
            if (result.length === 0) {
                throw new Error("Nenhum produto com esse nome.")
            }
            res.status(200).send(result)
        } else {
            const result: Array<TProducts> = await db("products")
            res.status(200).send(result)
        }
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
});

app.post("/create-table-purchases", async (req: Request, res: Response) => {
    try {
        await db.raw(`
      CREATE TABLE
      purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (buyer) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
      );
      `);
        res.status(200).send("Tabela pruchases criada com sucesso!");
    }
    catch (error: any) {
        res.status(400).send("Erro inesperado")
    }
});

app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const buyer = req.body.buyer
        const total_price = req.body.total_price
        if (!id || !buyer || isNaN(total_price)) {
            res.status(400)
            throw new Error("Dados inválidos")
        }
        await db.raw(`
	        INSERT INTO purchases (id, buyer, total_price, created_at)
	        VALUES ("${id}", "${buyer}", "${total_price}", "${new Date().toISOString()}");
        `)
        res.status(200).send({ message: "Cadastro de purchase realizado com sucesso!" })
    }
    catch (error: any) {
        res.status(400).send(error.message)
    }
});

app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        if (idToDelete[0] !== "p") {
            res.status(400)
            throw new Error("O id deve cmeçar com 'prod'")
        }
        const [purchaseIdToDelete] = await db("purchases").where({ id: idToDelete })
        if (!purchaseIdToDelete) {
            res.status(400)
            throw new Error("Id nao existente")
        }
        await db("purchases").del().where({ id: idToDelete })
        res.status(200).send("Pedido cancelado com sucesso")

    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

app.get("/purchases", async (req: Request, res: Response) => {
    try {
        const idToFind = req.query.id as string

        if (typeof idToFind === "string" && idToFind.length > 0) {
            const [result]: TProducts[] = await db.raw(
                `SELECT purchases.id AS purchasesId,
                purchases.buyer AS buyerID,
                users.name AS buyerName,
                users.email AS buyerEmail,
                purchases.total_price AS totalPrice,
                purchases.created_at AS createdAt

                FROM purchases INNER JOIN users ON users.id = purchases.buyer
                
                WHERE purchases.id LIKE '%${idToFind}%';
                `

            );
            if (!result) {
                throw new Error("Nenhum purchase com esse id.")
            }

            const products = await db.raw(
                `SELECT * FROM products

                 INNER JOIN purchases_products ON purchases_products.product_id = product.id
                 WHERE purchases_products.purchase_id = "${idToFind}"
                 ;
                 
                `
            )

            const purchase = { ...result, products }

            console.log(products)
            res.status(200).send(purchase)
        } else {
            const result = await db("purchases")
            res.status(200).send(result)
        }
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
});

app.post("/create-table-purchases_products", async (req: Request, res: Response) => {
    try {
        await db.raw(`
      CREATE TABLE
      purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
      );
      `);
        res.status(200).send("Tabela pruchases_products criada com sucesso!");
    }
    catch (error: any) {
        res.status(400).send("Erro inesperado")
    }
});

app.post("/purchases_products", async (req: Request, res: Response) => {
    try {
        const purchase_id = req.body.purchase_id
        const product_id = req.body.product_id
        const quantity = req.body.quantity
        if (!purchase_id || !product_id || isNaN(quantity)) {
            res.status(400)
            throw new Error("Dados inválidos")
        }
        await db.raw(`
	        INSERT INTO purchases_products (purchase_id, product_id, quantity)
	        VALUES ("${purchase_id}", "${product_id}", "${quantity}");
        `)
        res.status(200).send({ message: "Cadastro de produto realizado com sucesso!" })
    }
    catch (error: any) {
        res.status(400).send(error.message)
    }
});

app.get("/purchases_products", async (req: Request, res: Response) => {
    try {
        const result = await db("purchases_products")
        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
});