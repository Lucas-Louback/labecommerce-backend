-- Active: 1689253955562@@127.0.0.1@3306

-- Usuários -- -- Usuários -- -- Usuários -- -- Usuários -- -- Usuários -- -- Usuários ---- Usuários ---- Usuários --

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT null,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

-- inserir dados na tabela users

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u001',
        'Astrodev',
        'astrodev@email.com',
        'astrodev123',
        datetime('now')
    ), (
        'u002',
        'labenu',
        'labenu@email.com',
        'labenu123',
        datetime('now')
    ), (
        'u003',
        'Astrodev',
        'astr@email.com',
        'astrodev1234',
        datetime('now')
    );

--Get all Users

SELECT * FROM users;

PRAGMA table_info('users');

-- alterar informações a partir da ID

UPDATE users SET email = 'astro_dev@email.com' WHERE id = 'u001';

-- deletar usuário a partir da id

DELETE FROM users WHERE id = 'u001';

-- deletar tabela de usuarios

DROP TABLE users;

-- adicionar usuario

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u005',
        'Lucas',
        'lucas2@email',
        'lucas123',
        datetime('now')
    );

-- Produtos -- -- Produtos -- -- Produtos -- -- Produtos -- -- Produtos -- -- Produtos -- -- Produtos -- -- Produtos --

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT null,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

-- Inserir dados na tabela products

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'prod001',
        'mouse gamer',
        400,
        'mouse bolado',
        'google'
    ), (
        'prod002',
        'teclado gamer',
        600,
        'teclado bolado',
        'google'
    ), (
        'prod003',
        'monitor',
        1000,
        'monitor bolado',
        'google'
    ), (
        'prod004',
        'CPU',
        1500,
        'CPU bolada',
        'google'
    ), (
        'prod005',
        'Placa de vídeo',
        2000,
        'Placa de vídeo bolada',
        'google'
    );

-- Get all Products

SELECT * FROM products;

-- exibir nome e preço da tabela de produtos

SELECT name, price FROM products;

-- especificações da tabela de produtos

PRAGMA table_info('products');

-- alterar informações a partir da ID

UPDATE products
SET
    name = 'mouse gamer pro',
    price = 500,
    description = "mouse sinistro",
    image_url = "google.com"
WHERE id = 'prod001';

-- deletar produto a partir da id

DELETE FROM products WHERE id = 'prod001';

-- deletar tabela de produtos

DROP TABLE products;

--Get products that includes "gamer"

SELECT * FROM products where name like '%gamer%';

-- adicionar produto

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'prod006',
        'fone gamer',
        400,
        'mouse bolado',
        'google'
    );

--exibir as duas tabelas

SELECT * FROM products UNION SELECT * FROM users;

-- pruchases -- -- pruchases -- -- pruchases -- -- pruchases -- -- pruchases -- -- pruchases -- -- pruchases -- -- pruchases -- --

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (buyer) REFERENCES users(id)
    );

-- inserir dados na tabela purchases

INSERT INTO
    purchases (
        id,
        buyer,
        total_price,
        created_at
    )
VALUES (
        'purch001',
        'u001',
        1000,
        datetime('now')
    ), (
        'purch002',
        'u002',
        1500,
        datetime('now')
    );

-- get all purchases

SELECT * FROM purchases;

-- alterar purchases

UPDATE purchases
SET
    id = 'purch001',
    buyer = 'u001',
    total_price = 900,
    created_at = datetime('now')
WHERE id = 'purch001';

SELECT
    purchases.id,
    purchases.buyer,
    users.name,
    users.email,
    purchases.total_price,
    purchases.created_at
FROM purchases
    INNER JOIN users ON purchases.buyer = users.id;
