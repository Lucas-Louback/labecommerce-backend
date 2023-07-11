import { users, products, createNewUser, getAllUsers, createNewProduct, getAllProducts, searchProductsByName } from "./database";
import express, { Request, Response} from 'express';
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


console.log("foi transpilado e executado com sucesso")
createNewUser("u003", "Astrodev", "astrodev@email.com", "astrodev99")
createNewProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.","google.com")
getAllUsers()
getAllProducts()
searchProductsByName("gamer")
