-- Active: 1689253955562@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT null,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

SELECT * FROM users;

SELECT name, email FROM users;

PRAGMA table_info('users');

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
        '13/07/2023'
    ), (
        'u002',
        'labenu',
        'labenu@email.com',
        'labenu123',
        '13/07/2023'
    ), (
        'u003',
        'Astrodev',
        'astr@email.com',
        'astrodev1234',
        '13/07/2023'
    );

UPDATE users SET email = 'astro_dev@email.com' WHERE id = 'u001';

DELETE FROM users WHERE id = 'u001';

DROP TABLE users;

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT null,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

SELECT * FROM products;

SELECT name, price FROM products;

PRAGMA table_info('products');

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
        'mouse',
        400,
        'mouse bolado',
        'google'
    ), (
        'prod002',
        'teclado',
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

UPDATE products SET name = 'mouse gamer' WHERE id = 'prod001';

DELETE FROM products WHERE id = 'prod001';

DROP TABLE products;

SELECT * FROM products UNION SELECT * FROM users;