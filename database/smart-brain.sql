-- Active: 1690040192604@@127.0.0.1@5432@smart brain

CREATE DATABASE "smart brain";

-- move to smart brain DATABAse
CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR(100),
    email text UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0,
    joined TIMESTAMP NOT NULL
);


CREATE TABLE login (
    id serial PRIMARY KEY,
    hash text NOT NULL,
    email text UNIQUE NOT NULL,
    FOREIGN KEY(email) REFERENCES users(email) 
);

INSERT INTO users (name, email, entries, joined) 
VALUES('elisa', 'elisa@gmail.com',0, NOW());

INSERT INTO users (name, email, entries, joined) 
VALUES('sally', 'sally@gmail.com',0, NOW());

INSERT INTO login (hash, email) 
VALUES( '$2a$10$9PS8MmOLLFeD1n6osgire.oIKTkWvWHlM4PmvWrXVNkUsVNdXR.iy','elisa@gmail.com');

INSERT INTO login (email, hash)
VALUES ('sally@gmail.com','$2a$10$vaqgmK/xB3VpTK2B23Cnnef/3IUR4b3wIvnem58vYERz69srT2r7m');

UPDATE users 
SET entries = entries +  1
WHERE id=1;  

SELECT users.id, login.email, hash, entries, joined from login
RIGHT JOIN users ON login.email = users.email
WHERE login.email = 'sally@gmail.com';

SELECT entries
FROM login
RIGHT JOIN users ON login.email = users.email
WHERE users.email = 'elisa@gmail.com';

